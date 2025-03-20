import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text } from '@react-three/drei';
import { Mesh, Group } from 'three';

interface Album3DProps {
  albumCover: string;
  title: string;
  year?: string;
  onClick?: () => void;
  spotifyLink?: string;
}

const AlbumModel: React.FC<Album3DProps> = ({ albumCover, title, year, onClick, spotifyLink }) => {
  const mesh = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  
  // Simple animation
  useFrame(() => {
    if (mesh.current) {
      // Handle scale animation smoothly
      const targetScale = hovered ? 1.1 : 1;
      mesh.current.scale.x = mesh.current.scale.x + (targetScale - mesh.current.scale.x) * 0.1;
      mesh.current.scale.y = mesh.current.scale.y + (targetScale - mesh.current.scale.y) * 0.1;
      mesh.current.scale.z = mesh.current.scale.z + (targetScale - mesh.current.scale.z) * 0.1;
      
      // Handle rotation animation smoothly
      const targetRotationY = hovered ? Math.PI / 12 : 0;
      mesh.current.rotation.y = mesh.current.rotation.y + (targetRotationY - mesh.current.rotation.y) * 0.1;
    }
  });

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (spotifyLink) {
      window.open(spotifyLink, '_blank');
    }
  };
  
  return (
    <group
      ref={mesh}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Album cover */}
      <mesh>
        <boxGeometry args={[1, 1, 0.05]} />
        <meshStandardMaterial color="#111111" />
      </mesh>
      
      {/* Front cover image */}
      <Image 
        url={albumCover}
        position={[0, 0, 0.03]}
      >
        <meshBasicMaterial attach="material" transparent opacity={1} />
      </Image>
      
      {/* Album title */}
      <Text
        position={[0, -0.65, 0]}
        fontSize={0.1}
        color="white"
        anchorX="center"
        anchorY="middle"
        maxWidth={1.5}
      >
        {title}
      </Text>
      
      {/* Year text - optional */}
      {year && (
        <Text
          position={[0, -0.8, 0]}
          fontSize={0.08}
          color="#888888"
          anchorX="center"
          anchorY="middle"
        >
          {year}
        </Text>
      )}
    </group>
  );
};

const Album3D: React.FC<Album3DProps> = (props) => {
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 0, 2], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <AlbumModel {...props} />
      </Canvas>
    </div>
  );
};

export default Album3D;
