import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Image, Text, Html } from '@react-three/drei';
import { Group } from 'three';

interface MerchItem {
  id: string;
  name: string;
  price: number;
  image: string;
  url: string;
}

interface MerchViewerProps {
  item: MerchItem;
  onBuy?: (item: MerchItem) => void;
}

const MerchModel: React.FC<MerchViewerProps> = ({ item, onBuy }) => {
  const group = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  // Subtle continuous animation
  useFrame((state) => {
    if (group.current) {
      if (!hovered) {
        group.current.rotation.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
      }
      
      // Handle scale animation
      const targetScale = hovered ? 1.1 : 1;
      group.current.scale.x = group.current.scale.x + (targetScale - group.current.scale.x) * 0.1;
      group.current.scale.y = group.current.scale.y + (targetScale - group.current.scale.y) * 0.1;
      group.current.scale.z = group.current.scale.z + (targetScale - group.current.scale.z) * 0.1;
    }
  });

  const handleClick = () => {
    setShowDetails(!showDetails);
  };

  const handleBuy = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onBuy) onBuy(item);
    else window.open(item.url, '_blank');
  };

  return (
    <group
      ref={group}
      onClick={handleClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Merchandise image */}
      <Image
        url={item.image}
        transparent
        position={[0, 0, 0]}
      >
        <meshBasicMaterial attach="material" transparent opacity={1} />
      </Image>
      
      {/* Product name */}
      <Text
        position={[0, -1.3, 0.1]}
        fontSize={0.2}
        color="white"
        anchorX="center"
        anchorY="middle"
      >
        {item.name}
      </Text>
      
      {/* Price */}
      <Text
        position={[0, -1.6, 0.1]}
        fontSize={0.15}
        color="#ff3e00"
        anchorX="center"
        anchorY="middle"
      >
        ${item.price.toFixed(2)}
      </Text>
      
      {/* Details panel that appears when clicked */}
      {showDetails && (
        <Html position={[0, 0, 1]} transform>
          <div className="bg-black/80 backdrop-blur-md p-4 rounded-lg shadow-xl w-64 text-white border border-white/20">
            <h3 className="text-lg font-bold mb-2">{item.name}</h3>
            <p className="text-sm mb-3">Official merchandise from CBARRGS. High quality and limited edition.</p>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-orange-500">${item.price.toFixed(2)}</span>
              <button 
                onClick={handleBuy}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-md text-white transition-colors"
              >
                Buy Now
              </button>
            </div>
          </div>
        </Html>
      )}
    </group>
  );
};

const MerchViewer: React.FC<MerchViewerProps> = (props) => {
  return (
    <div className="h-[400px] w-full">
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <MerchModel {...props} />
      </Canvas>
    </div>
  );
};

export default MerchViewer;
