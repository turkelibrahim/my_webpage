import { useState, useEffect, useRef, useCallback } from 'react';
import { HandLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

// ─── Feature flag ─────────────────────────────────────────────────────────────
const DEBUG_GESTURE = false;

export default function useHandTracking() {
  const [isReady, setIsReady]               = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [handState, setHandState]           = useState({
    isPresent:      false,
    isOpen:         false,
    isPinching:     false,
    pinchDistance:  0,
    handCenter:     { x: 0, y: 0 },
    currentGesture: 'NONE',
    rawLandmarks:   null,
  });

  const videoRef          = useRef(null);
  const canvasRef         = useRef(null);
  const streamRef         = useRef(null);
  const landmarkerRef     = useRef(null);
  const animationRef      = useRef(null);
  const processVideoRef   = useRef(null);
  const lastVideoTimeRef  = useRef(-1);

  // ── Initialize MediaPipe HandLandmarker ──────────────────────────────────
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const vision = await FilesetResolver.forVisionTasks(
          'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
        );
        const landmarker = await HandLandmarker.createFromOptions(vision, {
          baseOptions: {
            modelAssetPath:
              'https://storage.googleapis.com/mediapipe-models/hand_landmarker/hand_landmarker/float16/1/hand_landmarker.task',
            delegate: 'GPU',
          },
          runningMode: 'VIDEO',
          numHands: 1,
        });
        if (mounted) {
          landmarkerRef.current = landmarker;
          setIsReady(true);
        }
      } catch (err) {
        if (DEBUG_GESTURE) console.error('[HandTracking] Init failed:', err);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ── Minimal skeleton draw ────────────────────────────────────────────────
  const drawSkeleton = (ctx, landmarks, w, h) => {
    ctx.clearRect(0, 0, w, h);
    if (!landmarks) return;

    const connections = [
      [0,1],[1,2],[2,3],[3,4],
      [0,5],[5,6],[6,7],[7,8],
      [9,10],[10,11],[11,12],
      [13,14],[14,15],[15,16],
      [0,17],[17,18],[18,19],[19,20],
      [5,9],[9,13],[13,17],
    ];

    // Sade, yarı saydam çizgi
    ctx.strokeStyle = 'rgba(0,242,254,0.55)';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    for (const [a, b] of connections) {
      ctx.moveTo((1 - landmarks[a].x) * w, landmarks[a].y * h);
      ctx.lineTo((1 - landmarks[b].x) * w, landmarks[b].y * h);
    }
    ctx.stroke();

    // Küçük, sade noktalar
    ctx.fillStyle = 'rgba(16,185,129,0.75)';
    for (const lm of landmarks) {
      ctx.beginPath();
      ctx.arc((1 - lm.x) * w, lm.y * h, 2.5, 0, Math.PI * 2);
      ctx.fill();
    }
  };

  // ── Gesture detection — sadece veri üretir, UI aksiyonu tetiklemez ────────
  const detectGesture = (landmarks) => {
    const up   = (tip, pip) => landmarks[tip].y < landmarks[pip].y;
    const down = (tip, pip) => landmarks[tip].y > landmarks[pip].y;

    if (up(8,6) && up(12,10) && down(16,14) && down(20,18)) return 'PEACE';
    if (landmarks[4].y < landmarks[3].y && down(8,6) && down(12,10) && down(16,14) && down(20,18))
      return 'THUMBS_UP';

    const pinchDx = landmarks[4].x - landmarks[8].x;
    const pinchDy = landmarks[4].y - landmarks[8].y;
    if (Math.sqrt(pinchDx**2 + pinchDy**2) < 0.05) return 'PINCH';

    const spreadDx = landmarks[12].x - landmarks[0].x;
    const spreadDy = landmarks[12].y - landmarks[0].y;
    if (Math.sqrt(spreadDx**2 + spreadDy**2) > 0.3) return 'OPEN_HAND';

    return 'TRACKING';
  };

  // ── Main video loop ──────────────────────────────────────────────────────
  const processVideo = useCallback(() => {
    if (!videoRef.current || !landmarkerRef.current || !isCameraActive) return;

    const video  = videoRef.current;
    const canvas = canvasRef.current;

    if (canvas && video.videoWidth && canvas.width !== video.videoWidth) {
      canvas.width  = video.videoWidth;
      canvas.height = video.videoHeight;
    }

    if (video.currentTime !== lastVideoTimeRef.current && video.readyState >= 2) {
      lastVideoTimeRef.current = video.currentTime;

      const results = landmarkerRef.current.detectForVideo(video, performance.now());

      if (results.landmarks?.length > 0) {
        const landmarks = results.landmarks[0];

        if (canvas) {
          drawSkeleton(canvas.getContext('2d'), landmarks, canvas.width, canvas.height);
        }

        const wrist    = landmarks[0];
        const thumbTip = landmarks[4];
        const idxTip   = landmarks[8];
        const midTip   = landmarks[12];

        const pdx = thumbTip.x - idxTip.x;
        const pdy = thumbTip.y - idxTip.y;
        const pinchDistance = Math.sqrt(pdx**2 + pdy**2);

        const odx = midTip.x - wrist.x;
        const ody = midTip.y - wrist.y;
        const isOpen = Math.sqrt(odx**2 + ody**2) > 0.3;

        const gesture = detectGesture(landmarks);

        if (DEBUG_GESTURE) {
          console.debug(`[HandTracking] gesture=${gesture} pinch=${pinchDistance.toFixed(3)}`);
        }

        // ── Sadece state güncelle — hiçbir UI aksiyonu tetiklenmiyor ────────
        setHandState({
          isPresent:      true,
          isOpen,
          isPinching:     pinchDistance < 0.05,
          pinchDistance,
          handCenter: {
            x: (wrist.x - 0.5) * -2,
            y: (wrist.y - 0.5) * -2,
          },
          currentGesture: gesture,
          rawLandmarks:   landmarks,
        });
      } else {
        if (canvas) {
          canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
        }
        setHandState(prev =>
          prev.isPresent
            ? { ...prev, isPresent: false, currentGesture: 'NONE' }
            : prev
        );
      }
    }

    if (processVideoRef.current) {
      animationRef.current = requestAnimationFrame(processVideoRef.current);
    }
  }, [isCameraActive]);

  useEffect(() => {
    processVideoRef.current = processVideo;
  }, [processVideo]);

  useEffect(() => {
    if (isCameraActive) {
      animationRef.current = requestAnimationFrame(processVideo);
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      if (canvasRef.current) {
        canvasRef.current.getContext('2d')
          .clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      }
    }
    return () => { if (animationRef.current) cancelAnimationFrame(animationRef.current); };
  }, [isCameraActive, processVideo]);

  // ── Camera controls ───────────────────────────────────────────────────────
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
      }
    } catch (err) {
      if (DEBUG_GESTURE) console.error('[HandTracking] Camera error:', err);
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    streamRef.current?.getTracks().forEach(t => t.stop());
    streamRef.current = null;
    if (videoRef.current) videoRef.current.srcObject = null;
    setHandState(prev => ({ ...prev, isPresent: false, currentGesture: 'NONE' }));
  };

  return { isReady, isCameraActive, videoRef, canvasRef, handState, startCamera, stopCamera };
}
