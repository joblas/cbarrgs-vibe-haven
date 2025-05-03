
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Music } from 'lucide-react';

interface AnnouncementBannerProps {
  onDismiss?: () => void;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onDismiss }) => {
  const [isDismissed, setIsDismissed] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Ticket URL
  const ticketUrl = "https://dice.fm/event/pyqaqk-lucys-cbarrgs-boodahki-coyote-aguilar-3rd-may-location-tba-boyle-heights-los-angeles-los-angeles-tickets";
  
  // If dismissed, don't render the component
  if (isDismissed) return null;
  
  // Preload the concert flyer image
  useEffect(() => {
    const img = new Image();
    img.src = "/lovable-uploads/lucys-show-flyer.jpg.png";
    img.onload = () => setImageLoaded(true);
    
    return () => {
      img.onload = null;
    };
  }, []);
  
  // Handle ticket button click with device detection
  const handleTicketClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      if (typeof navigator !== 'undefined' && /Mobi|Android/i.test(navigator.userAgent)) {
        // Direct navigation for mobile
        window.location.href = ticketUrl;
      } else {
        // Open in new tab for desktop
        window.open(ticketUrl, '_blank', 'noopener,noreferrer');
      }
    } catch (error) {
      // Fallback method
      window.open(ticketUrl, '_blank', 'noopener,noreferrer');
    }
  };
  
  // Handle banner dismissal
  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="relative w-full max-w-[280px] md:max-w-xs mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative bg-gradient-to-r from-purple-900/90 via-pink-800/90 to-purple-900/90 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden"
      >
        {/* Dismiss button - positioned over everything */}
        <button 
          onClick={handleDismiss}
          className="absolute top-1 right-1 z-50 text-white/70 hover:text-white transition-colors duration-200 p-1 bg-black/30 rounded-full"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>
        
        <div className="flex flex-row items-center">
          {/* Image section - smaller */}
          <div className="w-[80px] h-[80px] relative bg-gray-800">
            <div className={`absolute inset-0 bg-gray-800/90 ${imageLoaded ? 'opacity-0' : 'opacity-80'} transition-all duration-500 ease-in-out`}></div>
            <img 
              src="/lovable-uploads/lucys-show-flyer.jpg.png" 
              alt="Lucys, Cbarrgs, Coyote Aguilar show flyer" 
              className={`w-full h-full object-cover transition-opacity duration-500 ${imageLoaded ? 'opacity-100' : 'opacity-30'}`}
              width={80}
              height={80}
              loading="eager"
              decoding="async"
              fetchPriority="high"
            />
          </div>
          
          {/* Show details */}
          <div className="p-2 pr-1 text-white/90 w-full">
            <div className="flex flex-col">
              <h3 className="text-sm font-medium text-white font-serif mb-0 leading-tight">
                <Music className="inline-block mr-1 h-3 w-3 relative -top-[1px]" />
                Live Show
              </h3>
              
              <p className="text-xs font-medium text-white mb-1 truncate">
                Lucys, Cbarrgs, Boodahki...
              </p>
              
              <div className="flex items-center gap-1 mb-1">
                <div className="flex items-center text-xs text-white/80">
                  <MapPin className="h-2.5 w-2.5 mr-0.5 inline-block" />
                  <span className="text-[10px]">MakeOutMusic</span>
                </div>
                
                <div className="flex items-center text-xs text-white/80">
                  <span className="text-[10px]">• May 3 • 7PM</span>
                </div>
              </div>
              
              {/* Get Tickets button */}
              <a
                href={ticketUrl}
                onClick={handleTicketClick}
                className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-1 px-2 rounded-md text-center text-xs font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Tickets
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;
