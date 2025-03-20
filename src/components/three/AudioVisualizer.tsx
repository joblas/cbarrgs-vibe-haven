import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useSpring, a } from '@react-spring/three';
import { Mesh, BufferGeometry, Material, Group } from 'three';

interface AudioVisualizerProps {
  audioUrl?: string;
  isPlaying?: boolean;
  color?: string;
}

const VisualizerBars: React.FC<AudioVisualizerProps> = ({ 
  audioUrl, 
  isPlaying = false,
  color = '#ff3e00' 
}) => {
  const barsGroup = useRef<Group>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const [initialized, setInitialized] = useState(false);
  
  // Number of bars in the visualizer
  const barCount = 64;
  
  // Create refs for all bars
  const bars = useRef<Array<React.RefObject<Mesh<BufferGeometry, Material | Material[]>>>>(
    Array.from({ length: barCount }, () => React.createRef<Mesh<BufferGeometry, Material | Material[]>>())
  );

  // Initialize audio context and analyzer
  useEffect(() => {
    if (!audioUrl || initialized) return;
    
    const audio = new Audio(audioUrl);
    audioRef.current = audio;
    
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const audioContext = new AudioContext();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;
    
    const source = audioContext.createMediaElementSource(audio);
    source.connect(analyser);
    analyser.connect(audioContext.destination);
    
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    
    analyserRef.current = analyser;
    dataArrayRef.current = dataArray;
    
    audio.volume = 0.5;
    audio.loop = true;
    
    setInitialized(true);
    
    return () => {
      audio.pause();
      audioContext.close();
    };
  }, [audioUrl, initialized]);
  
  // Handle play/pause
  useEffect(() => {
    if (!audioRef.current || !initialized) return;
    
    if (isPlaying) {
      audioRef.current.play().catch(e => console.error("Audio play error:", e));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, initialized]);
  
  // Animation frame
  useFrame(() => {
    if (!analyserRef.current || !dataArrayRef.current || !barsGroup.current) return;
    
    // Get frequency data
    analyserRef.current.getByteFrequencyData(dataArrayRef.current);
    
    // Update bar heights based on frequency data
    for (let i = 0; i < barCount; i++) {
      const bar = bars.current[i].current;
      if (bar) {
        // Use a subset of the frequency data (skip very low frequencies)
        const dataIndex = Math.floor(i * (dataArrayRef.current.length / barCount));
        const value = dataArrayRef.current[dataIndex] / 255.0;
        
        // Apply height based on frequency value (with a minimum height)
        const height = Math.max(0.1, value * 3);
        bar.scale.y = height;
        
        // Optional: add some movement even when there's no audio
        if (!isPlaying) {
          const time = Date.now() * 0.001;
          const index = i / barCount;
          bar.scale.y = Math.max(0.05, Math.sin(time * 2 + index * 10) * 0.2 + 0.1);
        }
      }
    }
    
    // Rotate the entire group slowly
    barsGroup.current.rotation.y += 0.002;
  });
  
  return (
    <group ref={barsGroup}>
      {Array.from({ length: barCount }).map((_, i) => {
        const angle = (i / barCount) * Math.PI * 2;
        const radius = 2;
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        return (
          <mesh
            key={i}
            ref={bars.current[i]}
            position={[x, 0, z]}
            rotation={[0, -angle, 0]}
          >
            <boxGeometry args={[0.1, 1, 0.1]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={0.5} 
              toneMapped={false} 
            />
          </mesh>
        );
      })}
    </group>
  );
};

const AudioVisualizer: React.FC<AudioVisualizerProps> = (props) => {
  return (
    <div className="h-[300px] w-full">
      <Canvas camera={{ position: [0, 2, 5], fov: 75 }}>
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.8} />
        <VisualizerBars {...props} />
      </Canvas>
    </div>
  );
};

export default AudioVisualizer;
