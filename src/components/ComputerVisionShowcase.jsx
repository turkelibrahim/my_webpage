import React, { useState, Suspense } from 'react';
import { motion as Motion, AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { Cpu, Hand, Download } from 'lucide-react';
import useHandTracking from '../hooks/useHandTracking';
import HologramGlobe from './HologramGlobe';

// ─── Feature flag — sadece geliştirici modunda true yap ──────────────────────
const DEBUG_GESTURE = false;

export default function ComputerVisionShowcase() {
  const {
    isReady,
    isCameraActive,
    videoRef,
    canvasRef,
    handState,
    startCamera,
    stopCamera,
  } = useHandTracking();

  const [isArchOpen, setIsArchOpen] = useState(false);

  return (
    <section
      id="vision-showcase"
      style={{
        position: 'relative',
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        backgroundColor: '#050b14',
        backgroundImage:
          'linear-gradient(rgba(0,242,254,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,242,254,0.03) 1px, transparent 1px), radial-gradient(circle at 50% 50%, rgba(139,92,246,0.08) 0%, transparent 60%)',
        backgroundSize: '30px 30px, 30px 30px, 100% 100%',
      }}
    >
      {/* ── 3D Globe background ────────────────────────────────────────────── */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
        <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
          <ambientLight intensity={0.2} />
          <directionalLight position={[10, 10, 5]} intensity={0.8} />
          <Environment preset="city" />
          <Suspense fallback={null}>
            <HologramGlobe handState={handState} />
          </Suspense>
          <OrbitControls enableZoom={false} enablePan={false} />
        </Canvas>
      </div>

      {/* ── Hand detected status badge (top-left) ────────────────────────── */}
      <AnimatePresence>
        {isCameraActive && (
          <Motion.div
            key="tracking-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
              zIndex: 20,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: 'rgba(5,10,20,0.7)',
              backdropFilter: 'blur(10px)',
              border: handState.isPresent
                ? '1px solid rgba(16,185,129,0.4)'
                : '1px solid rgba(255,255,255,0.08)',
              borderRadius: '8px',
              padding: '0.5rem 1rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.72rem',
              color: handState.isPresent ? '#10b981' : '#8ba2b2',
              transition: 'border-color 0.4s, color 0.4s',
            }}
          >
            <Hand size={13} />
            {handState.isPresent ? 'HAND DETECTED' : 'TRACKING ACTIVE'}

            {/* Debug: gesture name — sadece DEBUG_GESTURE=true iken görünür */}
            {DEBUG_GESTURE && handState.isPresent && (
              <span style={{ marginLeft: '0.5rem', color: '#00f2fe', opacity: 0.7 }}>
                [{handState.currentGesture}]
              </span>
            )}
          </Motion.div>
        )}
      </AnimatePresence>

      {/* ── Camera feed (bottom-right) ────────────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          right: '2rem',
          width: '220px',
          height: '165px',
          borderRadius: '10px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
          zIndex: 20,
          backgroundColor: 'rgba(5,10,20,0.8)',
          display: 'flex',
          flexDirection: 'column',
          backdropFilter: 'blur(8px)',
        }}
      >
        <div
          style={{
            height: '22px',
            background: 'rgba(0,0,0,0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.6rem',
            color: isCameraActive ? '#10b981' : '#8ba2b2',
            fontFamily: 'JetBrains Mono, monospace',
            letterSpacing: '1.5px',
            gap: '0.4rem',
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: isCameraActive ? '#10b981' : '#8ba2b2',
              display: 'inline-block',
            }}
          />
          {isCameraActive ? 'CAM FEED — LIVE' : 'CAM OFFLINE'}
        </div>
        <div style={{ position: 'relative', flex: 1 }}>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transform: 'scaleX(-1)',
              display: isCameraActive ? 'block' : 'none',
            }}
          />
          {!isCameraActive && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'rgba(255,255,255,0.2)',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.65rem',
              }}
            >
              OFFLINE
            </div>
          )}
          <canvas
            ref={canvasRef}
            style={{
              position: 'absolute',
              top: 0, left: 0,
              width: '100%', height: '100%',
              pointerEvents: 'none',
            }}
          />
        </div>
      </div>

      {/* ── Debug log panel — sadece DEBUG_GESTURE=true iken görünür ─────── */}
      {DEBUG_GESTURE && isCameraActive && (
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '2rem',
            zIndex: 20,
            width: '280px',
            background: 'rgba(5,10,20,0.7)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(0,242,254,0.2)',
            borderRadius: '8px',
            padding: '0.75rem 1rem',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '0.65rem',
            color: '#00f2fe',
          }}
        >
          <div style={{ opacity: 0.5, marginBottom: '0.5rem' }}>// DEBUG LOG</div>
          <div>gesture: {handState.currentGesture}</div>
          <div>hand: {handState.isPresent ? 'YES' : 'NO'}</div>
          <div>
            pos: x={handState.handCenter.x.toFixed(2)}{' '}
            y={handState.handCenter.y.toFixed(2)}
          </div>
          <div>pinch: {handState.pinchDistance.toFixed(3)}</div>
        </div>
      )}

      {/* ── Main control panel (bottom-center) ────────────────────────────── */}
      <div
        style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            background:
              'linear-gradient(180deg, rgba(30,20,50,0.35) 0%, rgba(10,25,40,0.75) 100%)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderTop: '1px solid rgba(0,242,254,0.3)',
            borderRadius: '16px',
            padding: '1.25rem 2.5rem',
            textAlign: 'center',
            minWidth: '380px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.6), inset 0 2px 10px rgba(0,242,254,0.05)',
          }}
        >
          <h1
            style={{
              fontSize: '1.2rem',
              margin: '0 0 0.3rem',
              fontFamily: 'Outfit, sans-serif',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#ffffff',
            }}
          >
            VIRTUAL REALITY SHOWCASE
          </h1>
          <p
            style={{
              color: '#8ba2b2',
              fontSize: '0.75rem',
              margin: 0,
              fontFamily: 'Outfit, sans-serif',
            }}
          >
            Hand tracking · Real-time 3D · MediaPipe
          </p>

          <div
            style={{
              marginTop: '1.25rem',
              display: 'flex',
              gap: '0.75rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            {/* Camera toggle */}
            {!isCameraActive ? (
              <button
                onClick={startCamera}
                disabled={!isReady}
                style={{
                  background: isReady ? 'rgba(0,242,254,0.1)' : 'rgba(255,255,255,0.03)',
                  border: isReady
                    ? '1px solid rgba(0,242,254,0.35)'
                    : '1px solid rgba(255,255,255,0.08)',
                  color: isReady ? '#00f2fe' : '#8ba2b2',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  cursor: isReady ? 'pointer' : 'default',
                  letterSpacing: '0.5px',
                  transition: 'all 0.25s',
                }}
              >
                {isReady ? 'KAMERAY I AÇ' : 'YÜKLENİYOR...'}
              </button>
            ) : (
              <button
                onClick={stopCamera}
                style={{
                  background: 'rgba(239,68,68,0.08)',
                  border: '1px solid rgba(239,68,68,0.3)',
                  color: '#ef4444',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  padding: '0.5rem 1.25rem',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  letterSpacing: '0.5px',
                  transition: 'all 0.25s',
                }}
              >
                KAMERAYI KAPAT
              </button>
            )}

            {/* Architecture modal — sadece tıklamayla açılır */}
            <button
              onClick={() => setIsArchOpen(true)}
              style={{
                background: 'transparent',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.75rem',
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                cursor: 'pointer',
                letterSpacing: '0.5px',
                transition: 'all 0.25s',
              }}
            >
              <Cpu size={13} />
              MİMARİ
            </button>

            {/* CV download — sadece bu butonla çalışır */}
            <a
              href="/Ibrahim_Turkel_tr_CV.pdf"
              download
              style={{
                background: 'rgba(16,185,129,0.08)',
                border: '1px solid rgba(16,185,129,0.3)',
                color: '#10b981',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: 'Outfit, sans-serif',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.5rem 1.25rem',
                borderRadius: '6px',
                letterSpacing: '0.5px',
                textDecoration: 'none',
                transition: 'all 0.25s',
              }}
            >
              <Download size={13} />
              CV İNDİR
            </a>
          </div>
        </Motion.div>
      </div>

      {/* ── Architecture modal — sadece kullanıcı tıklamasıyla ────────────── */}
      <AnimatePresence>
        {isArchOpen && (
          <Motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'absolute',
              inset: 0,
              zIndex: 50,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(6px)',
            }}
            onClick={() => setIsArchOpen(false)}
          >
            <Motion.div
              initial={{ y: 40, opacity: 0, scale: 0.96 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{
                background: 'rgba(10,15,28,0.95)',
                border: '1px solid rgba(0,242,254,0.2)',
                borderRadius: '16px',
                padding: '2.5rem',
                maxWidth: '560px',
                width: '90%',
                boxShadow: '0 24px 60px rgba(0,0,0,0.6)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  marginBottom: '2rem',
                }}
              >
                <div
                  style={{
                    padding: '0.6rem',
                    background: 'rgba(0,242,254,0.1)',
                    borderRadius: '10px',
                    color: '#00f2fe',
                  }}
                >
                  <Cpu size={20} />
                </div>
                <div>
                  <h2
                    style={{
                      margin: 0,
                      fontFamily: 'Outfit, sans-serif',
                      fontSize: '1.2rem',
                      fontWeight: 700,
                      color: '#fff',
                    }}
                  >
                    Sistem Mimarisi
                  </h2>
                  <p
                    style={{
                      margin: 0,
                      fontSize: '0.8rem',
                      color: '#8ba2b2',
                    }}
                  >
                    Hand Tracking Pipeline
                  </p>
                </div>
              </div>

              {[
                {
                  label: '1. WebRTC & Canvas',
                  desc: 'Kullanıcının kamerasından ham video verisi alınır.',
                },
                {
                  label: '2. Google MediaPipe Tasks Vision',
                  desc: 'Video kareler WebAssembly (WASM) ile işlenerek 21 adet 3D el landmarkı çıkarılır.',
                },
                {
                  label: '3. React State Engine',
                  desc: 'Gesture\'lar (pinch, open hand) vektör matematiğiyle hesaplanır, saniyede 60 kez güncellenir.',
                },
                {
                  label: '4. Three.js / React Three Fiber',
                  desc: 'El koordinatları 3D uzaya çevrilerek WebGL Hologram Globe ile etkileşime girer.',
                },
              ].map((step, i) => (
                <div key={i}>
                  <div
                    style={{
                      background: 'rgba(0,0,0,0.35)',
                      padding: '1rem 1.25rem',
                      borderRadius: '8px',
                      borderLeft: '3px solid rgba(0,242,254,0.35)',
                      marginBottom: i < 3 ? '0.75rem' : 0,
                    }}
                  >
                    <strong style={{ color: '#00f2fe', fontSize: '0.88rem' }}>
                      {step.label}
                    </strong>
                    <p
                      style={{
                        margin: '0.3rem 0 0',
                        color: '#8ba2b2',
                        fontSize: '0.82rem',
                        lineHeight: 1.6,
                      }}
                    >
                      {step.desc}
                    </p>
                  </div>
                  {i < 3 && (
                    <div
                      style={{
                        textAlign: 'center',
                        color: 'rgba(0,242,254,0.35)',
                        fontSize: '0.8rem',
                        lineHeight: '1.5rem',
                      }}
                    >
                      ▼
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => setIsArchOpen(false)}
                style={{
                  marginTop: '1.75rem',
                  width: '100%',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#8ba2b2',
                  padding: '0.6rem',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontFamily: 'Outfit, sans-serif',
                  fontSize: '0.85rem',
                  transition: 'all 0.2s',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.color = '#fff';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.color = '#8ba2b2';
                }}
              >
                Kapat
              </button>
            </Motion.div>
          </Motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
