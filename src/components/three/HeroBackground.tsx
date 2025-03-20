import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere } from '@react-three/drei';
import { Mesh, Group } from 'three';

// Simplified version without animations that depend on hooks
const SimpleBackground: React.FC = () => {
  const sphereRef = useRef<Mesh>(null);
  
  // Simple animation
  useFrame((state) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
    }
  });
  
  return (
    <group>
      {/* Main sphere */}
      <Sphere ref={sphereRef} args={[1.5, 32, 32]} position={[0, 0, 0]}>
        <meshStandardMaterial 
          color="#ff3e00" 
          emissive="#ff3e00"
          emissiveIntensity={0.5}
          roughness={0.4}
          metalness={0.3}
        />
      </Sphere>
      
      {/* Static particles */}
      {Array.from({ length: 20 }).map((_, i) => (
        <mesh 
          key={i} 
          position={[
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5,
            (Math.random() - 0.5) * 5
          ]}
        >
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshStandardMaterial 
            color={i % 2 === 0 ? '#ffffff' : '#ff3e00'} 
            emissive={i % 2 === 0 ? '#ffffff' : '#ff3e00'}
            emissiveIntensity={0.5}
          />
        </mesh>
      ))}
    </group>
  );
};

const HeroBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <SimpleBackground />
      </Canvas>
    </div>
  );
};

export default HeroBackground;
