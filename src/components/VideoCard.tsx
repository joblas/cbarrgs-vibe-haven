
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';

interface VideoCardProps {
  title: string;
  thumbnail: string;
  embedUrl: string;
  index: number;
}

const VideoCard: React.FC<VideoCardProps> = ({ title, thumbnail, embedUrl, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLIFrameElement>(null);
  
  const handleMouseEnter = () => {
    setIsHovered(true);
    // Add a small delay to prevent accidental triggering
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.src = `${embedUrl}&autoplay=1&mute=1`;
      }
    }, 300);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.src = embedUrl;
    }
  };

  return (
    <motion.div
      className="relative overflow-hidden rounded-sm"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative w-full h-0 pb-[56.25%]">
        {isHovered ? (
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
              src={thumbnail}
              alt={title}
              className="absolute top-0 left-0 w-full h-full object-cover transition-transform duration-700 hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="white" 
                  className="w-8 h-8"
                  style={{ marginLeft: '2px' }}
                >
                  <path d="M8 5v14l11-7z"/>
                </svg>
              </div>
            </div>
          </>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/70 to-transparent">
        <h3 className="text-lg font-medium">{title}</h3>
      </div>
    </motion.div>
  );
};

export default VideoCard;
