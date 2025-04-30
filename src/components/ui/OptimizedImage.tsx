import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getImagePlaceholder, createLazyLoadObserver } from '@/utils/performance/lazyLoad';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  objectFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  priority?: boolean; // For critical images above the fold
  onLoad?: () => void;
}

/**
 * Optimized image component with:
 * - Lazy loading via Intersection Observer
 * - Smooth fade-in animation
 * - Placeholder to prevent layout shifts
 * - Priority loading option for LCP images
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  objectFit = 'cover',
  priority = false,
  onLoad,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority); // Priority images load immediately
  const imgRef = useRef<HTMLImageElement>(null);
  
  // Generate aspect ratio for placeholder
  const aspectRatio = height && width ? `${(height / width) * 100}%` : undefined;
  const placeholder = width && height ? getImagePlaceholder(width, height) : undefined;
  
  // Set up intersection observer for lazy loading
  useEffect(() => {
    if (priority || !imgRef.current) return; // Skip for priority images
    
    const observer = createLazyLoadObserver();
    observer.observe(imgRef.current);
    
    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, [priority]);

  // Handle image loading completion
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ paddingBottom: aspectRatio }}
    >
      <motion.img
        ref={imgRef}
        src={priority ? src : (isInView ? src : placeholder || src)}
        data-src={!priority ? src : undefined}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        className={`
          absolute inset-0 w-full h-full transition-opacity duration-500
          ${objectFit === 'cover' ? 'object-cover' : ''}
          ${objectFit === 'contain' ? 'object-contain' : ''}
          ${objectFit === 'fill' ? 'object-fill' : ''}
          ${objectFit === 'none' ? 'object-none' : ''}
          ${objectFit === 'scale-down' ? 'object-scale-down' : ''}
          ${isLoaded ? 'opacity-100' : 'opacity-0'}
        `}
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Placeholder/skeleton while loading */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-zinc-900 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;
