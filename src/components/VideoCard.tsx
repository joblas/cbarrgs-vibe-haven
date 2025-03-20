
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  embedUrl: string;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, embedUrl, index }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [thumbnailSrc, setThumbnailSrc] = useState(thumbnail);
  const [thumbnailLoaded, setThumbnailLoaded] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // Reset state when video changes
    setIsPlaying(false);
    setThumbnailLoaded(false);
    
    // Try to load the high-quality thumbnail first
    const highQualityThumbnail = thumbnail.replace('hqdefault.jpg', 'maxresdefault.jpg');
    const img = new Image();
    img.src = highQualityThumbnail;
    
    img.onload = () => {
      setThumbnailSrc(highQualityThumbnail);
      setThumbnailLoaded(true);
    };
    
    img.onerror = () => {
      // Fallback to the original hqdefault if maxresdefault fails
      setThumbnailSrc(thumbnail);
      setThumbnailLoaded(true);
    };
  }, [thumbnail, embedUrl]);
  
  const handlePlayVideo = () => {
    setIsPlaying(true);
    if (videoRef.current) {
      videoRef.current.src = `${embedUrl}?autoplay=1`;
    }
  };

  const handleThumbnailError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    
    // Try to fallback to hqdefault if maxresdefault fails
    if (target.src.includes('maxresdefault.jpg')) {
      target.src = target.src.replace('maxresdefault.jpg', 'hqdefault.jpg');
      return;
    }
    
    // Try to fallback to mqdefault if hqdefault fails
    if (target.src.includes('hqdefault.jpg')) {
      target.src = target.src.replace('hqdefault.jpg', 'mqdefault.jpg');
      return;
    }
    
    // Final fallback to sddefault if all else fails
    if (target.src.includes('mqdefault.jpg')) {
      target.src = target.src.replace('mqdefault.jpg', 'sddefault.jpg');
    }
  };

  return (
    <motion.div
      className="relative w-full h-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative w-full h-full bg-zinc-800">
        {isPlaying ? (
          <iframe
            ref={videoRef}
            src={embedUrl}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full"
          ></iframe>
        ) : (
          <>
            <img
              src={thumbnailSrc}
              alt={title}
              className={`absolute top-0 left-0 w-full h-full object-cover ${thumbnailLoaded ? 'opacity-100' : 'opacity-0'}`}
              loading="lazy"
              onError={handleThumbnailError}
            />
            <div 
              className="absolute inset-0 bg-black/30 flex items-center justify-center cursor-pointer"
              onClick={handlePlayVideo}
            >
              <div className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-10 h-10"
                  style={{ marginLeft: '2px' }}
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
};

export default VideoCard;
