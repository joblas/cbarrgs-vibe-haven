import React, { useState, useEffect, useRef } from 'react';
import { useIntersectionObserver } from '@/hooks/intersection/useIntersectionObserver';
import { initSpotifyEmbed } from '@/utils/performance/lazyLoad';

interface SpotifyEmbedProps {
  spotifyId: string;
  type?: 'album' | 'track' | 'playlist' | 'artist';
  width?: string | number;
  height?: string | number;
  className?: string;
}

/**
 * Optimized Spotify embed component with:
 * - Lazy loading with Intersection Observer
 * - Reduced layout shift with placeholder
 * - Only loads Spotify API when needed
 */
const SpotifyEmbed: React.FC<SpotifyEmbedProps> = ({
  spotifyId,
  type = 'track',
  width = '100%',
  height = 352,
  className = '',
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const { isIntersecting } = useIntersectionObserver(containerRef, {
    threshold: 0.1,
    rootMargin: '100px 0px',
    triggerOnce: true,
  });

  useEffect(() => {
    // Only load when component is in view
    if (isIntersecting && !isLoaded) {
      const loadEmbed = async () => {
        try {
          // Load Spotify embed API
          await initSpotifyEmbed();
          setIsLoaded(true);
        } catch (error) {
          console.error('Failed to load Spotify embed:', error);
        }
      };
      
      loadEmbed();
    }
  }, [isIntersecting, isLoaded]);

  return (
    <div 
      ref={containerRef} 
      className={`relative ${className}`}
      style={{ minHeight: typeof height === 'number' ? `${height}px` : height }}
    >
      {/* Show loading placeholder until loaded */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 flex items-center justify-center bg-zinc-900 rounded-md overflow-hidden animate-pulse"
          aria-label="Loading Spotify player"
        >
          <div className="w-12 h-12 rounded-full border-2 border-white/30 border-t-white/80 animate-spin" />
        </div>
      )}
      
      {/* Render iframe only when in view and API loaded */}
      {isIntersecting && (
        <iframe
          ref={iframeRef}
          title={`Spotify ${type} embed`}
          src={`https://open.spotify.com/embed/${type}/${spotifyId}?utm_source=generator`}
          width={width}
          height={height}
          style={{ opacity: isLoaded ? 1 : 0, transition: 'opacity 0.5s ease' }}
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          className={`rounded-md ${isLoaded ? 'opacity-100' : 'opacity-0'} transition-opacity duration-500`}
          onLoad={() => setIsLoaded(true)}
        />
      )}
    </div>
  );
};

export default SpotifyEmbed;
