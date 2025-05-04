import React, { useState, useRef, useEffect } from 'react';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
  placeholderColor?: string;
  priority?: boolean; // Images marked as priority will load immediately
}

const Image: React.FC<ImageProps> = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  placeholderColor = '#222222',
  priority = false
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [containerRef, isVisible] = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
    rootMargin: '300px' // Increased for earlier loading
  });
  
  // Convert placeholder color to URL-safe format
  const safeColor = placeholderColor.replace(/#/g, '%23');
  
  // Simpler, smaller placeholder SVG for better performance
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3Crect fill='${safeColor}' width='1' height='1'/%3E%3C/svg%3E`;

  // Should load the image if either:
  // 1. It's marked as priority
  // 2. It's visible in the viewport (or about to be)
  const shouldLoad = priority || isVisible;
  
  // Preload the image if it's priority
  useEffect(() => {
    if (priority && src) {
      const preloadLink = document.createElement('link');
      preloadLink.rel = 'preload';
      preloadLink.as = 'image';
      preloadLink.href = src;
      document.head.appendChild(preloadLink);
      
      return () => {
        document.head.removeChild(preloadLink);
      };
    }
  }, [priority, src]);

  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height, backgroundColor: placeholderColor }}
    >
      {/* Placeholder that shows while image is loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${placeholder})`,
            filter: 'blur(8px)',
            transform: 'scale(1.05)', // Slightly reduced scale for performance
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image - only load src when visible or priority */}
      <img
        src={shouldLoad ? (hasError ? placeholder : src) : placeholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-300 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: isLoaded ? 'auto' : 'opacity' // Only use willChange during transition
        }}
        width={width}
        height={height}
        decoding="async" // Use async decoding for performance
        fetchPriority={priority ? "high" : "auto"} // Prioritize fetch for important images
        onLoad={() => setIsLoaded(true)}
        onError={() => {
          setHasError(true);
          setIsLoaded(true); // Consider loaded so we remove the blur
        }}
        loading={priority ? 'eager' : 'lazy'} // Use browser's native lazy loading as backup
      />
    </div>
  );
};

export default Image;
