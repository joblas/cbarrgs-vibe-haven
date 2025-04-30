import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/intersection/useIntersectionObserver';
import OptimizedImage from './OptimizedImage';

interface LazyVideoProps {
  src: string;
  poster?: string;
  width?: number;
  height?: number;
  loop?: boolean;
  autoPlay?: boolean;
  muted?: boolean;
  controls?: boolean;
  playOnHover?: boolean;
  className?: string;
  title: string;
}

/**
 * Optimized video component with:
 * - Lazy loading via Intersection Observer
 * - Play-on-hover functionality
 * - Thumbnail/poster image until interaction
 * - Reduced initial load by delaying video loading
 */
const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  width,
  height,
  loop = false,
  autoPlay = false,
  muted = true,
  controls = false,
  playOnHover = false,
  className = '',
  title,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isHovering, setIsHovering] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Use intersection observer to trigger loading when near viewport
  const { isIntersecting } = useIntersectionObserver(containerRef, {
    threshold: 0.1,
    rootMargin: '100px 0px',
    triggerOnce: true,
  });

  // Handle hover states for play-on-hover functionality
  const handleMouseEnter = () => {
    setIsHovering(true);
    if (playOnHover && videoRef.current && !isPlaying) {
      videoRef.current.play().catch(err => console.error('Video play failed:', err));
      setIsPlaying(true);
    }
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    if (playOnHover && videoRef.current && isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  // Handle play/pause toggle
  const togglePlay = () => {
    if (!videoRef.current) return;
    
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(err => console.error('Video play failed:', err));
      setIsPlaying(true);
    }
  };

  // Load video when in viewport
  useEffect(() => {
    if (isIntersecting && videoRef.current && !isLoaded) {
      videoRef.current.load();
      setIsLoaded(true);
      
      if (autoPlay) {
        videoRef.current.play().catch(err => console.error('Video play failed:', err));
        setIsPlaying(true);
      }
    }
  }, [isIntersecting, isLoaded, autoPlay]);

  return (
    <motion.div
      ref={containerRef}
      className={`relative overflow-hidden rounded-md ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      style={{ 
        aspectRatio: width && height ? `${width}/${height}` : undefined
      }}
    >
      {/* Display poster image until video is loaded */}
      {poster && !isLoaded && (
        <OptimizedImage 
          src={poster} 
          alt={`Thumbnail for ${title} video`}
          width={width}
          height={height}
          className="absolute inset-0 z-10"
          objectFit="cover"
        />
      )}
      
      {/* Only render video when in viewport */}
      {isIntersecting && (
        <video
          ref={videoRef}
          width={width}
          height={height}
          loop={loop}
          muted={muted}
          playsInline
          controls={controls}
          poster={poster}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={!playOnHover ? togglePlay : undefined}
          aria-label={title}
        >
          <source src={src} type={`video/${src.split('.').pop()}`} />
          Your browser does not support the video tag.
        </video>
      )}
      
      {/* Play/pause overlay */}
      {!controls && (
        <div 
          className={`absolute inset-0 flex items-center justify-center bg-black/30 transition-opacity duration-300 ${
            isPlaying && !isHovering ? 'opacity-0' : 'opacity-100'
          }`}
          onClick={!playOnHover ? togglePlay : undefined}
        >
          {!isPlaying && (
            <motion.div 
              className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 5V19L19 12L8 5Z" fill="white" />
              </svg>
            </motion.div>
          )}
        </div>
      )}
    </motion.div>
  );
};

export default LazyVideo;
