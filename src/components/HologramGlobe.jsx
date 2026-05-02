import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, Html } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

export default function HologramGlobe({ handState, globeMode, matrixMode }) {
  const groupRef = useRef(null);
  const skillsRef = useRef(null);

  // Load textures
  const [dayTexture, nightTexture] = useLoader(THREE.TextureLoader, [
    'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
    'https://unpkg.com/three-globe/example/img/earth-night.jpg'
  ]);

  const skills = [
    { name: 'Python', desc: 'Veri Analizi & AI', color: '#facc15' },
    { name: 'React', desc: 'Frontend & 3D UI', color: '#61dafb' },
    { name: 'OpenCV', desc: 'Bilgisayarlı Görü', color: '#ef4444' },
    { name: 'Three.js', desc: 'WebGL Rendering', color: '#ffffff' },
    { name: 'Node.js', desc: 'Backend Sistemler', color: '#10b981' }
  ];

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    let targetScale = 1.8;
    
    if (handState.isPresent && handState.isOpen) {
      targetScale = 2.2;
      
      if (!handState.isPinching) {
        const mappedScale = 0.5 + (handState.pinchDistance * 10);
        targetScale = Math.min(Math.max(mappedScale, 1.5), 3.5);
      } else {
        targetScale = 1.0;
      }
    }

    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), delta * 5);

    if (handState.isPresent) {
      const targetRotY = handState.handCenter.x * Math.PI * 1.5;
      const targetRotX = handState.handCenter.y * Math.PI;
      groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * delta * 5;
      groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * delta * 5;
    } else {
      // Yavaşça kendi etrafında dön
      groupRef.current.rotation.y += 0.05 * delta; 
    }
    
    groupRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

    // Yeteneklerin yörüngede dönmesi
    if (skillsRef.current) {
      const speed = handState.isPinching ? 1.5 : 0.2; // Sıkıştırıldığında hızlansın
      skillsRef.current.rotation.y -= speed * delta; // Küreyle ters yönde veya aynı yönde
      skillsRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.5) * 0.1; // Hafif yalpalama
    }
  });

  const pointsColor = matrixMode ? "#10b981" : "#00f2fe";
  const wireframeColor = matrixMode ? "#059669" : "#8b5cf6";

  return (
    <>
      <group ref={groupRef} scale={1.8}>
        
        {globeMode === 'cyberpunk' && (
          <>
            <points>
              <sphereGeometry args={[1, 64, 64]} />
              <pointsMaterial 
                color={pointsColor} 
                size={0.015} 
                sizeAttenuation={true}
                transparent={true}
                opacity={0.9}
                blending={THREE.AdditiveBlending}
              />
            </points>
            <Sphere args={[0.98, 32, 32]}>
              <meshBasicMaterial 
                color={wireframeColor} 
                wireframe={true} 
                transparent={true}
                opacity={0.3}
                blending={THREE.AdditiveBlending}
              />
            </Sphere>
          </>
        )}

        {/* Yörüngedeki Yetenekler (Orbiting Skills) */}
        {globeMode === 'cyberpunk' && (
          <group ref={skillsRef}>
            {skills.map((skill, index) => {
              const angle = (index / skills.length) * Math.PI * 2;
              const radius = 1.35; // Kürenin hemen dışında
              const x = Math.cos(angle) * radius;
              const z = Math.sin(angle) * radius;
              const y = Math.sin(angle * 3) * 0.2; // Yörüngede dalgalanma

              return (
                <group key={skill.name} position={[x, y, z]}>
                  {/* Nokta / Uydu çekirdeği */}
                  <mesh>
                    <sphereGeometry args={[0.02, 16, 16]} />
                    <meshBasicMaterial color={skill.color} />
                  </mesh>
                  
                  {/* Etkileşimli HTML Etiketi */}
                  <Html distanceFactor={4} position={[0, 0.08, 0]} transform center>
                    <div 
                      style={{
                        background: 'rgba(5, 10, 20, 0.8)',
                        border: `1px solid ${skill.color}80`,
                        padding: '0.4rem 0.8rem',
                        borderRadius: '4px',
                        color: '#fff',
                        fontFamily: 'Outfit, sans-serif',
                        fontSize: '0.6rem',
                        whiteSpace: 'nowrap',
                        backdropFilter: 'blur(4px)',
                        boxShadow: `0 0 10px ${skill.color}40`,
                        pointerEvents: 'auto', // Fare hover için açıldı
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onPointerOver={(e) => {
                        e.currentTarget.style.background = `${skill.color}30`;
                        e.currentTarget.style.transform = 'scale(1.1)';
                        e.currentTarget.style.border = `1px solid ${skill.color}`;
                        const desc = e.currentTarget.querySelector('.skill-desc');
                        if (desc) desc.style.display = 'block';
                      }}
                      onPointerOut={(e) => {
                        e.currentTarget.style.background = 'rgba(5, 10, 20, 0.8)';
                        e.currentTarget.style.transform = 'scale(1)';
                        e.currentTarget.style.border = `1px solid ${skill.color}80`;
                        const desc = e.currentTarget.querySelector('.skill-desc');
                        if (desc) desc.style.display = 'none';
                      }}
                    >
                      <strong style={{ color: skill.color }}>{skill.name}</strong>
                      <div className="skill-desc" style={{ display: 'none', marginTop: '0.2rem', fontSize: '0.5rem', opacity: 0.8, transition: 'all 0.3s' }}>
                        {skill.desc}
                      </div>
                    </div>
                  </Html>
                </group>
              );
            })}
          </group>
        )}

      </group>

      {/* Bloom Efekti (Matrix modunda yoğunlaşır) */}
      <EffectComposer>
        <Bloom 
          luminanceThreshold={0.1} 
          luminanceSmoothing={0.9} 
          height={300} 
          intensity={matrixMode ? 3.0 : 2.0} 
          mipmapBlur 
        />
      </EffectComposer>
    </>
  );
}
