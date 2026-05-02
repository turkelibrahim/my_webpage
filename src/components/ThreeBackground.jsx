import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';

function ParticleSwarm(props) {
  const ref = useRef();
  
  // Create random points in a sphere natively
  const positions = useMemo(() => {
    const count = 5000;
    const array = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.8 * Math.cbrt(Math.random());
      
      array[i] = r * Math.sin(phi) * Math.cos(theta);
      array[i+1] = r * Math.sin(phi) * Math.sin(theta);
      array[i+2] = r * Math.cos(phi);
    }
    return array;
  }, []);

  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f2fe"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function ThreeBackground() {
  return (
    <div id="canvas-container">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <ParticleSwarm />
      </Canvas>
    </div>
  );
}
