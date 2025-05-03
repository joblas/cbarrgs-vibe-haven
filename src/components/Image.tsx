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
    rootMargin: '200px' // Start loading when image is 200px from viewport
  });
  
  // Convert placeholder color to URL-safe format
  const safeColor = placeholderColor.replace('#', '%23');
  
  // Default placeholder for when image fails to load or is loading
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 300 300'%3E%3Crect fill='${safeColor}' width='300' height='300'/%3E%3Ctext fill='%23ffffff' font-family='Arial, sans-serif' font-size='25' text-anchor='middle' x='150' y='150'%3E${alt.replace(/\s/g, '%20')}%3C/text%3E%3C/svg%3E`;

  // Should load the image if either:
  // 1. It's marked as priority
  // 2. It's visible in the viewport (or about to be)
  const shouldLoad = priority || isVisible;

  return (
    <div 
      ref={containerRef as React.RefObject<HTMLDivElement>}
      className={`relative overflow-hidden ${className}`}
      style={{ width, height }}
    >
      {/* Placeholder that shows while image is loading */}
      {!isLoaded && (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${placeholder})`,
            filter: 'blur(10px)',
            transform: 'scale(1.1)', // Slightly larger to avoid blur edges
          }}
          aria-hidden="true"
        />
      )}

      {/* Main image - only load src when visible or priority */}
      <img
        src={shouldLoad ? (hasError ? placeholder : src) : placeholder}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ 
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'opacity' // Hint to browser to optimize
        }}
        width={width}
        height={height}
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
