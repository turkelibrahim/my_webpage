import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export default function useHandTracking() {
  const [isReady, setIsReady] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [handState, setHandState] = useState({
    isPresent: false,
    isOpen: false,
    isPinching: false,
    pinchDistance: 0,
    handCenter: { x: 0.5, y: 0.5 },
    currentGesture: 'NONE', // 'NONE', 'PEACE', 'THUMBS_UP', 'PINCH', 'OPEN'
    rawLandmarks: null
  });

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const landmarkerRef = useRef(null);
  const animationRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  // Initialize MediaPipe HandLandmarker
  useEffect(() => {
    let isMounted = true;
    const initializeLandmarker = async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath: 'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU'
          },
          runningMode: 'VIDEO',
          numHands: 1
        });
        if (isMounted) {
          landmarkerRef.current = landmarker;
          setIsReady(true);
        }
      } catch (error) {
        console.error('Failed to initialize HandLandmarker:', error);
      }
    };
    initializeLandmarker();
    return () => {
      isMounted = false;
    };
  }, []);

  const drawHandSkeleton = (ctx, landmarks, width, height) => {
    ctx.clearRect(0, 0, width, height);
    if (!landmarks) return;

    // MediaPipe Hand Connections
    const connections = [
      [0, 1], [1, 2], [2, 3], [3, 4], // thumb
      [0, 5], [5, 6], [6, 7], [7, 8], // index
      [9, 10], [10, 11], [11, 12], // middle
      [13, 14], [14, 15], [15, 16], // ring
      [0, 17], [17, 18], [18, 19], [19, 20], // pinky
      [5, 9], [9, 13], [13, 17] // palm
    ];

    ctx.strokeStyle = '#00f2fe'; // Neon Cyan
    ctx.lineWidth = 2.5;

    // Draw lines
    ctx.beginPath();
    for (const [startIdx, endIdx] of connections) {
      const start = landmarks[startIdx];
      const end = landmarks[endIdx];
      // Flip X to match mirrored video
      ctx.moveTo((1 - start.x) * width, start.y * height);
      ctx.lineTo((1 - end.x) * width, end.y * height);
    }
    ctx.stroke();

    // Draw joints
    ctx.fillStyle = '#10b981'; // Neon Green
    for (const lm of landmarks) {
      ctx.beginPath();
      ctx.arc((1 - lm.x) * width, lm.y * height, 3.5, 0, 2 * Math.PI);
      ctx.fill();
    }
  };

  const detectGesture = (landmarks, isPinching, isOpen) => {
    // Y ekseninde tip (uç) noktasının pip (boğum) noktasından yukarıda olup olmadığını kontrol eder
    const isUp = (tipIdx, pipIdx) => landmarks[tipIdx].y < landmarks[pipIdx].y;
    const isDown = (tipIdx, pipIdx) => landmarks[tipIdx].y > landmarks[pipIdx].y;

    // Barış İşareti (✌️): İşaret ve Orta parmak havada, diğerleri kapalı
    const peace = isUp(8, 6) && isUp(12, 10) && isDown(16, 14) && isDown(20, 18);
    
    // Başparmak Havaya (👍): Başparmak havada, diğer hepsi kapalı
    // Başparmağın ucu, el bileğine göre daha yukarda olmalı ve diğer parmaklar kapalı olmalı
    const thumbsUp = landmarks[4].y < landmarks[3].y && 
                     isDown(8, 6) && isDown(12, 10) && isDown(16, 14) && isDown(20, 18);

    if (peace) return 'PEACE';
    if (thumbsUp) return 'THUMBS_UP';
    if (isPinching) return 'PINCH_ZOOM';
    if (isOpen) return 'OPEN_HAND';
    return 'TRACKING';
  };

  const processVideo = useCallback(() => {
    if (!videoRef.current || !landmarkerRef.current || !isCameraActive) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    
    // Ensure canvas dimensions match video
    if (canvas && video.videoWidth) {
      if (canvas.width !== video.videoWidth) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
      }
    }

    if (video.currentTime !== lastVideoTimeRef.current && video.readyState >= 2) {
      lastVideoTimeRef.current = video.currentTime;
      
      const results = landmarkerRef.current.detectForVideo(video, performance.now());
      
      if (results.landmarks && results.landmarks.length > 0) {
        const landmarks = results.landmarks[0]; // First hand
        
        // Draw skeleton
        if (canvas) {
          const ctx = canvas.getContext('2d');
          drawHandSkeleton(ctx, landmarks, canvas.width, canvas.height);
        }

        const wrist = landmarks[0];
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];

        // 1. Pinch Detection
        const dx = thumbTip.x - indexTip.x;
        const dy = thumbTip.y - indexTip.y;
        const pinchDist = Math.sqrt(dx * dx + dy * dy);
        const isPinching = pinchDist < 0.05;

        // 2. Open Hand Detection
        const openDx = middleTip.x - wrist.x;
        const openDy = middleTip.y - wrist.y;
        const openDist = Math.sqrt(openDx * openDx + openDy * openDy);
        const isOpen = openDist > 0.3;

        // 3. Hand Center Position
        const handCenter = {
          x: (wrist.x - 0.5) * -2, 
          y: (wrist.y - 0.5) * -2
        };

        // 4. Gesture Detection
        const currentGesture = detectGesture(landmarks, isPinching, isOpen);

        setHandState({
          isPresent: true,
          isOpen,
          isPinching,
          pinchDistance: pinchDist,
          handCenter,
          currentGesture,
          rawLandmarks: landmarks
        });
      } else {
        if (canvas) {
          const ctx = canvas.getContext('2d');
          ctx.clearRect(0, 0, canvas.width, canvas.height);
        }
        setHandState(prev => prev.isPresent ? { ...prev, isPresent: false, currentGesture: 'NONE' } : prev);
      }
    }
    
    animationRef.current = requestAnimationFrame(processVideo);
  }, [isCameraActive]);

  useEffect(() => {
    if (isCameraActive) {
      animationRef.current = requestAnimationFrame(processVideo);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      // Clear canvas on stop
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d');
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isCameraActive, processVideo]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 }
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      console.error('Error accessing webcam:', err);
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
    setHandState(prev => ({ ...prev, isPresent: false, currentGesture: 'NONE' }));
  };

  return {
    isReady,
    isCameraActive,
    videoRef,
    canvasRef,
    handState,
    startCamera,
    stopCamera
  };
}
