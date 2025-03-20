import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { ShaderMaterial } from 'three';

interface PageTransitionProps {
  isActive: boolean;
  onComplete?: () => void;
  duration?: number;
}

// Custom shader for the transition effect
const transitionVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const transitionFragmentShader = `
  uniform float uProgress;
  uniform vec3 uColor;
  varying vec2 vUv;
  
  void main() {
    // Create a radial gradient from the center
    float dist = distance(vUv, vec2(0.5));
    
    // Smooth step for a cleaner transition edge
    float circle = smoothstep(uProgress, uProgress + 0.01, dist);
    
    // Apply color with alpha based on the circle
    gl_FragColor = vec4(uColor, 1.0 - circle);
  }
`;

const TransitionEffect: React.FC<PageTransitionProps> = ({ 
  isActive, 
  onComplete,
  duration = 1.5
}) => {
  const { viewport } = useThree();
  const materialRef = useRef<ShaderMaterial>(null);
  const [progress, setProgress] = useState(0);
  
  // Update progress over time
  useEffect(() => {
    let animationFrame: number;
    let startTime: number | null = null;
    
    const animate = (time: number) => {
      if (!startTime) startTime = time;
      const elapsed = time - startTime;
      const durationMs = duration * 1000;
      
      // Calculate progress based on elapsed time
      const newProgress = isActive 
        ? Math.min(elapsed / durationMs, 0.8) 
        : Math.max(0.8 - (elapsed / durationMs), 0);
      
      setProgress(newProgress);
      
      // Continue animation if not complete
      if ((isActive && newProgress < 0.8) || (!isActive && newProgress > 0)) {
        animationFrame = requestAnimationFrame(animate);
      } else if (!isActive && newProgress <= 0 && onComplete) {
        onComplete();
      }
    };
    
    // Start animation
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [isActive, duration, onComplete]);
  
  // Update shader uniforms
  useFrame(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = progress;
    }
  });
  
  return (
    <mesh scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={transitionVertexShader}
        fragmentShader={transitionFragmentShader}
        transparent={true}
        uniforms={{
          uProgress: { value: 0 },
          uColor: { value: [0.0, 0.0, 0.0] } // Black color
        }}
      />
    </mesh>
  );
};

const PageTransition: React.FC<PageTransitionProps> = (props) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      <Canvas>
        <TransitionEffect {...props} />
      </Canvas>
    </div>
  );
};

export default PageTransition;
