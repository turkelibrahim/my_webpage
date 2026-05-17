import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function ParticleField() {
  const ref = useRef();

  const { positions, colors } = useMemo(() => {
    const count = 6000;
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
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
      const r = 2.2 * Math.cbrt(random(pointIndex * 4 + 3));

      pos[i]   = r * Math.sin(phi) * Math.cos(theta);
      pos[i+1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i+2] = r * Math.cos(phi);

      // Random tint: cyan, green, or purple
      const rng = random(pointIndex * 4 + 4);
      if (rng < 0.5) {
        // Cyan
        col[i] = 0; col[i+1] = 0.95; col[i+2] = 1.0;
      } else if (rng < 0.8) {
        // Matrix green
        col[i] = 0.06; col[i+1] = 0.72; col[i+2] = 0.51;
      } else {
        // Purple
        col[i] = 0.55; col[i+1] = 0.36; col[i+2] = 0.96;
      }
    }
    return { positions: pos, colors: col };
  }, []);

  useFrame((_, delta) => {
    ref.current.rotation.x -= delta / 12;
    ref.current.rotation.y -= delta / 18;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4.5]}>
      <Points ref={ref} positions={positions} colors={colors} stride={3} frustumCulled={false}>
        <PointMaterial
          vertexColors
          transparent
          size={0.0045}
          sizeAttenuation
          depthWrite={false}
          opacity={0.75}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
        <ParticleField />
      </Canvas>
    </div>
  );
}
