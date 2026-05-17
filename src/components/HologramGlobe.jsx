import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// ─── Tuning constants ────────────────────────────────────────────────────────
const DEAD_ZONE   = 0.08;   // ignore tiny jitter around center
const MAX_ROT_Y   = 0.70;   // max left/right tilt  (radians)
const MAX_ROT_X   = 0.38;   // max up/down tilt     (radians)
const SMOOTHING   = 0.055;  // lerp factor per frame (lower = smoother)
const IDLE_SPEED  = 0.28;   // idle breathing speed

export default function HologramGlobe({
  handState,
  globeControl  = 'hand',   // 'hand' | 'auto' | 'off'
  visualEffects = 'medium', // 'low' | 'medium' | 'high'
}) {
  const groupRef = useRef(null);

  // ── Rotation targets — stored as refs, never trigger re-renders ──────────
  const targetX  = useRef(0);
  const targetY  = useRef(0);
  const idleTime = useRef(0);

  // Hand state ref — always current value without closure-stale issue
  const handRef  = useRef(handState);
  useEffect(() => { handRef.current = handState; }, [handState]);

  useFrame((state, delta) => {
    const g = groupRef.current;
    if (!g) return;

    const t   = state.clock.elapsedTime;
    const hs  = handRef.current;

    // ── Mode: off ────────────────────────────────────────────────────────
    if (globeControl === 'off') {
      g.position.y = Math.sin(t * 0.35) * 0.06; // gentle float only
      return;
    }

    // ── Mode: auto ───────────────────────────────────────────────────────
    if (globeControl === 'auto') {
      g.rotation.y += 0.05 * delta;
      g.position.y  = Math.sin(t * 0.35) * 0.08;
      return;
    }

    // ── Mode: hand ───────────────────────────────────────────────────────
    if (hs.isPresent) {
      idleTime.current = 0;

      // handCenter.x: +1 = hand on right, -1 = hand on left
      // handCenter.y: +1 = hand up,       -1 = hand down
      const nx = hs.handCenter.x;
      const ny = hs.handCenter.y;

      // Dead zone — ignore micro-jitter near center
      const fx = Math.abs(nx) > DEAD_ZONE ? nx : 0;
      const fy = Math.abs(ny) > DEAD_ZONE ? ny : 0;

      targetY.current =  fx * MAX_ROT_Y;   // right → positive Y rotation
      targetX.current = -fy * MAX_ROT_X;   // up    → negative X rotation (tilt back)
    } else {
      // No hand → idle breathing
      idleTime.current += delta;
      const breath = Math.sin(idleTime.current * IDLE_SPEED);
      targetX.current = breath * 0.05;
      targetY.current = Math.cos(idleTime.current * IDLE_SPEED * 0.7) * 0.08;
    }

    // ── Smooth lerp (all rotation via lerp, no direct += )────────────────
    g.rotation.x += (targetX.current - g.rotation.x) * SMOOTHING;
    g.rotation.y += (targetY.current - g.rotation.y) * SMOOTHING;
    g.rotation.z *= (1 - SMOOTHING * 0.4); // drift z back to 0

    // Gentle vertical float
    g.position.y = Math.sin(t * 0.38) * 0.08;
  });

  // ── Visual quality settings ───────────────────────────────────────────────
  const cfg = {
    low:    { bloom: 0.7,  ptSize: 0.010, ptOp: 0.60, wfOp: 0.10, ringOp: [0.15, 0.08] },
    medium: { bloom: 1.6,  ptSize: 0.013, ptOp: 0.85, wfOp: 0.18, ringOp: [0.22, 0.12] },
    high:   { bloom: 2.4,  ptSize: 0.015, ptOp: 1.00, wfOp: 0.28, ringOp: [0.32, 0.18] },
  }[visualEffects] ?? { bloom: 1.6, ptSize: 0.013, ptOp: 0.85, wfOp: 0.18, ringOp: [0.22, 0.12] };

  return (
    <>
      <group ref={groupRef} scale={1.8}>

        {/* ── Point cloud ───────────────────────────────────────────────── */}
        <points>
          <sphereGeometry args={[1, 64, 64]} />
          <pointsMaterial
            color="#00f2fe"
            size={cfg.ptSize}
            sizeAttenuation
            transparent
            opacity={cfg.ptOp}
            blending={THREE.AdditiveBlending}
          />
        </points>

        {/* ── Inner wireframe ───────────────────────────────────────────── */}
        <Sphere args={[0.97, 32, 32]}>
          <meshBasicMaterial
            color="#8b5cf6"
            wireframe
            transparent
            opacity={cfg.wfOp}
            blending={THREE.AdditiveBlending}
          />
        </Sphere>

        {/* ── Equatorial ring ───────────────────────────────────────────── */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.26, 0.005, 8, 100]} />
          <meshBasicMaterial
            color="#00f2fe"
            transparent
            opacity={cfg.ringOp[0]}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

        {/* ── Tilted ring ───────────────────────────────────────────────── */}
        <mesh rotation={[Math.PI / 3.2, Math.PI / 5, 0]}>
          <torusGeometry args={[1.36, 0.003, 8, 100]} />
          <meshBasicMaterial
            color="#8b5cf6"
            transparent
            opacity={cfg.ringOp[1]}
            blending={THREE.AdditiveBlending}
          />
        </mesh>

      </group>

      <EffectComposer>
        <Bloom
          luminanceThreshold={0.14}
          luminanceSmoothing={0.85}
          height={300}
          intensity={cfg.bloom}
          mipmapBlur
        />
      </EffectComposer>
    </>
  );
}
