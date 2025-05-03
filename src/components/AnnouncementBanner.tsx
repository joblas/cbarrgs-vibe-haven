import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Calendar, MapPin, Clock, Music } from 'lucide-react';

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
    <div className="relative w-full max-w-sm mx-auto mt-6 mb-0">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative bg-gradient-to-r from-purple-900/80 via-pink-800/80 to-purple-900/80 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden"
      >
        {/* Dismiss button - positioned over everything */}
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 z-50 text-white/70 hover:text-white transition-colors duration-200 p-1 bg-black/30 rounded-full"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
        
        <div className="flex flex-col md:flex-row items-center">
          {/* Image section - smaller for desktop */}
          <div className="w-full md:w-1/3 aspect-square md:aspect-auto relative">
            <div className={`absolute inset-0 bg-gray-800/90 ${imageLoaded ? 'opacity-0' : 'opacity-80'} transition-all duration-1000 ease-in-out`}></div>
            <img 
              src="/lovable-uploads/lucys-show-flyer.jpg.png" 
              alt="Lucys, Cbarrgs, Coyote Aguilar show flyer" 
              className={`w-full h-full object-cover transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-30'}`}
              onLoad={() => setTimeout(() => setImageLoaded(true), 300)}
            />
          </div>
          
          {/* Show details */}
          <div className="p-3 text-white/90 space-y-1 w-full md:w-2/3">
            <h3 className="text-base font-medium text-white font-serif tracking-wide">
              <Music className="inline-block mr-2 h-3 w-3 mb-1" />
              Tomorrow Night!
            </h3>
            
            <p className="text-sm font-medium text-white">
              Lucys, Cbarrgs, Boodahki, Coyote Aguilar
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs text-white/80 mb-2">
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-1 inline-block" />
                <span>MakeOutMusic, LA</span>
              </div>
              
              <div className="flex items-center">
                <Calendar className="h-3 w-3 mr-1 inline-block" />
                <span>Sat, May 3</span>
              </div>
              
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1 inline-block" />
                <span>7:00 PM</span>
              </div>
            </div>
            
            {/* Get Tickets button */}
            <a
              href={ticketUrl}
              onClick={handleTicketClick}
              className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-2 px-3 rounded-md text-center text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get Tickets
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;
