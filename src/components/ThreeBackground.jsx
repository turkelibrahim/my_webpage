import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function ParticleField() {
  const ref = useRef();
  const nearRef = useRef();

  const { positions, colors, nearPositions, nearColors } = useMemo(() => {
    const count = 280;
    const nearCount = 40;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const nearPos = new Float32Array(nearCount * 3);
    const nearCol = new Float32Array(nearCount * 3);
    const random = value => {
      const x = Math.sin(value * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };

    for (let i = 0; i < count * 3; i += 3) {
      const pointIndex = i / 3;
      const u = random(pointIndex * 4 + 1);
      const v = random(pointIndex * 4 + 2);
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 8.0 * Math.cbrt(random(pointIndex * 4 + 3));

      pos[i]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i+2] = r * Math.cos(phi) - 1.2;

      const rng = random(pointIndex * 4 + 4);
      if (rng < 0.65) {
        col[i] = 0.88; col[i+1] = 0.94; col[i+2] = 1.0;
      } else if (rng < 0.88) {
        col[i] = 0.52; col[i+1] = 0.72; col[i+2] = 0.98;
      } else {
        col[i] = 0.65; col[i+1] = 0.58; col[i+2] = 0.96;
      }
    }

    for (let i = 0; i < nearCount * 3; i += 3) {
      const pointIndex = i / 3;
      nearPos[i] = (random(pointIndex * 5 + 1) - 0.5) * 9;
      nearPos[i + 1] = (random(pointIndex * 5 + 2) - 0.5) * 5.6;
      nearPos[i + 2] = -random(pointIndex * 5 + 3) * 4.8;

      nearCol[i] = 0.92;
      nearCol[i + 1] = 0.96;
      nearCol[i + 2] = 1;
    }

    return { positions: pos, colors: col, nearPositions: nearPos, nearColors: nearCol };
  }, []);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.x -= delta / 18;
      ref.current.rotation.y -= delta / 9;
      ref.current.position.y = Math.sin(t * 0.18) * 0.12;
    }
    if (nearRef.current) {
      nearRef.current.rotation.z += delta / 28;
      nearRef.current.position.x = Math.sin(t * 0.22) * 0.16;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4.5]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          vertexColors
          transparent
          size={0.014}
          sizeAttenuation
          depthWrite={false}
          opacity={0.82}
        />
      </Points>

      <Points ref={nearRef} positions={nearPositions} colors={nearColors} stride={3} frustumCulled={false}>
        <PointMaterial
          vertexColors
          transparent
          size={0.032}
          sizeAttenuation
          depthWrite={false}
          opacity={0.95}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div id="canvas-container">
      <Canvas 
        camera={{ position: [0, 0, 3.2], fov: 75 }} 
        dpr={[1, 1.5]}
        gl={{ powerPreference: "high-performance", antialias: false, alpha: false }}
      >
        <color attach="background" args={['#000000']} />
        <ParticleField />
      </Canvas>
    </div>
  );
}
