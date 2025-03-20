import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { Text, PresentationControls, useTexture } from '@react-three/drei';
import { Mesh, TextureLoader, MeshStandardMaterial } from 'three';

interface Logo3DProps {
  logoUrl: string;
  text?: string;
  onClick?: () => void;
}

const LogoModel: React.FC<Logo3DProps> = ({ logoUrl, text = 'CBARRGS', onClick }) => {
  const meshRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Load texture
  const texture = useTexture(logoUrl);
  
  // Continuous animation
  useFrame((state) => {
    if (meshRef.current) {
      if (!hovered && !active) {
        meshRef.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.5) * 0.3;
        meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      }
      
      // Handle scale animation
      const targetScale = active ? 1.2 : hovered ? 1.1 : 1;
      meshRef.current.scale.x = meshRef.current.scale.x + (targetScale - meshRef.current.scale.x) * 0.1;
      meshRef.current.scale.y = meshRef.current.scale.y + (targetScale - meshRef.current.scale.y) * 0.1;
      meshRef.current.scale.z = meshRef.current.scale.z + (targetScale - meshRef.current.scale.z) * 0.1;
      
      // Handle rotation animation for active state
      if (active) {
        meshRef.current.rotation.y += 0.05;
      } else if (hovered) {
        const targetRotationY = Math.PI / 4;
        meshRef.current.rotation.y += (targetRotationY - meshRef.current.rotation.y) * 0.1;
      }
    }
  });
  
  // Handle click
  const handleClick = () => {
    setActive(!active);
    if (onClick) onClick();
  };
  
  return (
    <group>
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        {/* Front face with logo texture */}
        <planeGeometry args={[3, 1.5]} />
        <meshStandardMaterial 
          map={texture} 
          transparent={true} 
          metalness={0.5} 
          roughness={0.2}
        />
      </mesh>
      
      {/* 3D text below the logo */}
      {text && (
        <Text
          position={[0, -1.2, 0]}
          fontSize={0.3}
          color={hovered ? "#ff3e00" : "white"}
          anchorX="center"
          anchorY="middle"
          font="/fonts/Inter-Bold.woff"
          letterSpacing={0.05}
        >
          {text}
        </Text>
      )}
    </group>
  );
};

const Logo3D: React.FC<Logo3DProps> = (props) => {
  // Ensure the font is loaded
  useEffect(() => {
    const font = new FontFace('Inter', 'url(/fonts/Inter-Bold.woff)');
    font.load().then(loadedFont => {
      document.fonts.add(loadedFont);
    }).catch(error => {
      console.error('Font loading error:', error);
    });
  }, []);
  
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight 
          position={[0, 5, 5]} 
          angle={0.3} 
          penumbra={1} 
          intensity={1} 
          castShadow 
        />
        
        <PresentationControls
          global
          zoom={0.8}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]}
          azimuth={[-Math.PI / 4, Math.PI / 4]}
        >
          <LogoModel {...props} />
        </PresentationControls>
      </Canvas>
    </div>
  );
};

export default Logo3D;
