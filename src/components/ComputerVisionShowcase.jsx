import React, { useState, useEffect, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Hand, ZoomIn, RotateCcw, User, Terminal, Cpu, Download } from 'lucide-react';
import useHandTracking from '../hooks/useHandTracking';
import HologramGlobe from './HologramGlobe';

export default function ComputerVisionShowcase() {
  const { isReady, isCameraActive, videoRef, canvasRef, handState, startCamera } = useHandTracking();
  
  const [globeMode, setGlobeMode] = useState('cyberpunk'); 
  const [theme, setTheme] = useState('night'); 
  
  // Easter Eggs & New States
  const [logs, setLogs] = useState([]);
  const [isArchOpen, setIsArchOpen] = useState(false);
  const [showCV, setShowCV] = useState(false);
  const [isMatrixColor, setIsMatrixColor] = useState(false);

  // Easter Egg & Logging Logic
  useEffect(() => {
    if (!isCameraActive || !handState.isPresent) return;

    // Terminal Logging
    const newLog = `> GESTURE: ${handState.currentGesture} | COORD: {x: ${handState.handCenter.x.toFixed(2)}, y: ${handState.handCenter.y.toFixed(2)}}`;
    setLogs(prev => {
      // Don't add if it's the exact same as the last one to avoid spam
      if (prev.length > 0 && prev[prev.length - 1] === newLog) return prev;
      const updated = [...prev, newLog];
      if (updated.length > 6) updated.shift();
      return updated;
    });

    // PEACE -> Matrix Green Color Shift
    if (handState.currentGesture === 'PEACE') {
      setIsMatrixColor(true);
    } else if (handState.currentGesture !== 'NONE') {
      // Keep it green for a while or revert if other gestures?
      // Let's make it so you have to hold peace to keep it green, or maybe toggle it.
      // A toggle is cooler:
      // Wait, let's just make it stay green while PEACE is held.
    }
    if (handState.currentGesture !== 'PEACE') {
        setIsMatrixColor(false);
    }

    // THUMBS_UP -> Show CV
    if (handState.currentGesture === 'THUMBS_UP') {
      setShowCV(true);
    }
  }, [handState.currentGesture, handState.handCenter, isCameraActive, handState.isPresent]);


  const ts = {
    bg: '#050b14',
    grid: isMatrixColor ? 'rgba(16, 185, 129, 0.05)' : 'rgba(0, 242, 254, 0.03)',
    gradient: isMatrixColor ? 'rgba(16, 185, 129, 0.1)' : 'rgba(139, 92, 246, 0.1)',
    text: isMatrixColor ? '#10b981' : '#8ba2b2',
    accent: isMatrixColor ? '#10b981' : '#00f2fe'
  };

  return (
    <section id="vision-showcase" style={{ 
      position: 'relative', height: '100vh', width: '100vw', overflow: 'hidden', 
      backgroundColor: ts.bg,
      backgroundImage: `linear-gradient(${ts.grid} 1px, transparent 1px), linear-gradient(90deg, ${ts.grid} 1px, transparent 1px), radial-gradient(circle at 50% 50%, ${ts.gradient} 0%, transparent 60%)`,
      backgroundSize: '30px 30px, 30px 30px, 100% 100%',
      transition: 'all 0.5s ease'
    }}>

      {/* Scrolling Code Background */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', overflow: 'hidden', zIndex: 0, 
        opacity: 0.1, color: ts.accent, fontFamily: 'monospace', fontSize: '0.75rem', whiteSpace: 'pre', pointerEvents: 'none',
        transition: 'color 0.5s ease'
      }}>
        <motion.div initial={{ y: 0 }} animate={{ y: '-50%' }} transition={{ repeat: Infinity, ease: 'linear', duration: 60 }}>
          {Array.from({ length: 150 }).map((_, i) => (
            <div key={i} style={{ paddingLeft: `${Math.random() * 80}%`, marginBottom: '15px' }}>
              {Math.random() > 0.5 ? "DATA_STREAM_OK" : "SYS_OP_CODE"} 0x{Math.floor(Math.random()*16777215).toString(16).toUpperCase()}
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* 3D Background Globe */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <HologramGlobe handState={handState} globeMode={globeMode} matrixMode={isMatrixColor} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* Floating Data Tags (HUD) */}
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 5, color: ts.text, fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', letterSpacing: '1px' }}>
        
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '20%', left: '15%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          GESTURE: <span style={{ color: ts.accent, fontWeight: '500', textShadow: `0 0 8px ${ts.accent}60` }}>{handState.currentGesture !== 'NONE' ? handState.currentGesture : 'KONTROL'}</span> <Hand size={14} color={ts.accent} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '20%', right: '15%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <RotateCcw size={14} color={ts.text} /> ROTATION: <span style={{ color: ts.accent, fontWeight: '500', textShadow: `0 0 8px ${ts.accent}60` }}>ACTIVE</span>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '50%', left: '12%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          ZOOM: %{isCameraActive ? Math.max(100, Math.round((0.5 + handState.pinchDistance * 10) * 100)) : 150} <ZoomIn size={14} color={ts.accent} />
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ position: 'absolute', top: '65%', right: '12%', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <User size={14} color={ts.accent} /> MEMBER: <span style={{ color: ts.accent, fontWeight: '500', textShadow: `0 0 8px ${ts.accent}60` }}>KXIEF</span>
        </motion.div>
      </div>

      {/* Real-time Data Terminal (Matrix Effect) */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '2rem', zIndex: 10, width: '320px', pointerEvents: 'none' }}>
        <div style={{ 
          background: 'rgba(5, 10, 20, 0.7)', backdropFilter: 'blur(10px)', border: `1px solid ${ts.accent}40`, 
          borderTop: `2px solid ${ts.accent}`, borderRadius: '8px', padding: '1rem', fontFamily: 'monospace', fontSize: '0.7rem', color: ts.accent 
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem', opacity: 0.7 }}>
            <Terminal size={14} /> <span>SYSTEM_LOGS // REALTIME</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            {!isCameraActive ? (
              <div style={{ opacity: 0.5 }}>WAITING_FOR_CAMERA_INIT...</div>
            ) : !handState.isPresent ? (
              <div style={{ opacity: 0.5 }}>NO_GESTURE_DATA... HAND NOT DETECTED.</div>
            ) : (
              logs.map((log, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
                  {log}
                </motion.div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Visible Camera Feed for User Feedback */}
      <div style={{
        position: 'absolute', bottom: '2rem', right: '2rem', width: '240px', height: '180px', borderRadius: '8px', overflow: 'hidden',
        border: `1px solid ${ts.accent}40`, boxShadow: `0 10px 30px rgba(0,0,0,0.5), 0 0 15px ${ts.accent}20`, zIndex: 10,
        backgroundColor: 'rgba(5, 10, 20, 0.7)', display: 'flex', flexDirection: 'column', backdropFilter: 'blur(5px)'
      }}>
        <div style={{ height: '24px', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.65rem', color: ts.accent, letterSpacing: '1px' }}>
          CAM_FEED // AI_VISION
        </div>
        <div style={{ position: 'relative', width: '100%', flex: 1 }}>
          <video ref={videoRef} autoPlay playsInline muted style={{ width: '100%', height: '100%', objectFit: 'cover', transform: 'scaleX(-1)', display: isCameraActive ? 'block' : 'none' }} />
          {!isCameraActive && <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', fontSize: '0.7rem' }}>OFFLINE</div>}
          <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }} />
        </div>
      </div>

      {/* CV Modal triggered by THUMBS_UP */}
      <AnimatePresence>
        {showCV && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.8, y: 50 }}
            style={{ position: 'absolute', top: '20%', left: '50%', transform: 'translateX(-50%)', zIndex: 50, background: 'rgba(10, 15, 30, 0.9)', backdropFilter: 'blur(15px)', border: `1px solid ${ts.accent}`, borderRadius: '16px', padding: '2rem', textAlign: 'center', boxShadow: `0 20px 50px rgba(0,0,0,0.5), 0 0 20px ${ts.accent}50` }}
          >
            <h2 style={{ color: '#fff', margin: '0 0 1rem 0', fontFamily: 'Outfit, sans-serif' }}>👍 THUMBS UP DETECTED!</h2>
            <p style={{ color: ts.accent, marginBottom: '2rem' }}>You unlocked my CV.</p>
            <a href="/İbrahim TÜRKEL CV tr.pdf" download="Ibrahim_Turkel_CV.pdf" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: ts.accent, color: '#000', padding: '0.8rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: 'bold' }}>
              <Download size={18} /> DOWNLOAD CV
            </a>
            <button onClick={() => setShowCV(false)} style={{ display: 'block', margin: '1rem auto 0', background: 'transparent', border: 'none', color: '#8ba2b2', cursor: 'pointer', textDecoration: 'underline' }}>Close</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Architecture Panel Modal */}
      <AnimatePresence>
        {isArchOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }} animate={{ opacity: 1, backdropFilter: 'blur(8px)' }} exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            style={{ position: 'absolute', inset: 0, zIndex: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.6)' }}
            onClick={() => setIsArchOpen(false)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              style={{ background: 'rgba(15, 20, 35, 0.85)', border: `1px solid ${ts.accent}`, borderRadius: '16px', padding: '2rem', maxWidth: '600px', width: '90%' }}
              onClick={e => e.stopPropagation()}
            >
              <h2 style={{ color: '#fff', marginTop: 0, fontFamily: 'Outfit, sans-serif', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Cpu color={ts.accent} /> SYSTEM ARCHITECTURE</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginTop: '2rem' }}>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', borderLeft: `3px solid ${ts.accent}` }}>
                  <strong style={{ color: ts.accent }}>1. WebRTC & Canvas (Client)</strong><br/><span style={{ color: '#8ba2b2', fontSize: '0.85rem' }}>Captures raw video feed from the user's webcam.</span>
                </div>
                <div style={{ textAlign: 'center', color: ts.accent }}>▼</div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', borderLeft: `3px solid ${ts.accent}` }}>
                  <strong style={{ color: ts.accent }}>2. Google MediaPipe Tasks Vision</strong><br/><span style={{ color: '#8ba2b2', fontSize: '0.85rem' }}>Processes video frames via WebAssembly (WASM) to extract 21 3D hand landmarks in real-time.</span>
                </div>
                <div style={{ textAlign: 'center', color: ts.accent }}>▼</div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', borderLeft: `3px solid ${ts.accent}` }}>
                  <strong style={{ color: ts.accent }}>3. React State Engine & Hooks</strong><br/><span style={{ color: '#8ba2b2', fontSize: '0.85rem' }}>Calculates gestures (Peace, Thumbs Up, Pinch) using vector math and updates UI state 60 times a second.</span>
                </div>
                <div style={{ textAlign: 'center', color: ts.accent }}>▼</div>
                <div style={{ background: 'rgba(0,0,0,0.4)', padding: '1rem', borderRadius: '8px', borderLeft: `3px solid ${ts.accent}` }}>
                  <strong style={{ color: ts.accent }}>4. Three.js / React Three Fiber</strong><br/><span style={{ color: '#8ba2b2', fontSize: '0.85rem' }}>Translates hand coordinates to 3D space, interacting with shaders and the WebGL Hologram Globe.</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main UI Control Panel */}
      <div style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)', width: '100%', display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
          style={{ 
            background: 'linear-gradient(180deg, rgba(30, 20, 50, 0.4) 0%, rgba(10, 25, 40, 0.8) 100%)',
            backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255, 255, 255, 0.05)', borderTop: `1px solid ${ts.accent}80`,
            borderRadius: '16px', padding: '1.5rem 3rem', textAlign: 'center', minWidth: '450px',
            boxShadow: `0 20px 40px rgba(0, 0, 0, 0.6), inset 0 2px 15px ${ts.accent}20`
          }}
        >
          <h1 style={{ fontSize: '1.4rem', margin: '0 0 0.5rem 0', fontFamily: 'Outfit, sans-serif', fontWeight: '700', letterSpacing: '1px', color: '#ffffff', textShadow: '0 2px 10px rgba(255,255,255,0.3)' }}>
            VIRTUAL REALITY SHOWCASE
          </h1>
          <p style={{ color: '#8ba2b2', fontSize: '0.8rem', margin: '0', fontFamily: 'Outfit, sans-serif' }}>
            *Experience the Human-Computer Interaction
          </p>

          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {!isCameraActive && (
              <button onClick={startCamera} disabled={!isReady} style={{ 
                background: `${ts.accent}20`, border: `1px solid ${ts.accent}80`, color: ts.accent,
                fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
              }}>
                {isReady ? 'ACTIVATE SYSTEM' : 'INITIALIZING...'}
              </button>
            )}
            <button onClick={() => setIsArchOpen(true)} style={{ 
              background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.4rem',
              fontFamily: 'Outfit, sans-serif', fontSize: '0.75rem', padding: '0.5rem 1.5rem', borderRadius: '4px', cursor: 'pointer', transition: 'all 0.3s'
            }}>
              <Cpu size={14} /> MİMARİYİ İNCELE
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
