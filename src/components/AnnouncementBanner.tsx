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
    <div className="relative w-full max-w-md mx-auto mt-8 mb-4 overflow-visible">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative bg-gradient-to-r from-purple-900/80 via-pink-800/80 to-purple-900/80 backdrop-blur-sm rounded-lg border border-white/20 shadow-xl overflow-hidden"
      >
        {/* Decorative elements */}
        <div className="absolute -top-6 -left-6 w-12 h-12 bg-pink-500/20 rounded-full blur-xl"></div>
        <div className="absolute -bottom-6 -right-6 w-12 h-12 bg-purple-500/20 rounded-full blur-xl"></div>
        
        {/* Dismiss button - positioned over everything */}
        <button 
          onClick={handleDismiss}
          className="absolute top-2 right-2 z-50 text-white/70 hover:text-white transition-colors duration-200 p-1 bg-black/30 rounded-full"
          aria-label="Dismiss announcement"
        >
          <X size={16} />
        </button>
        
        {/* Image section */}
        <div className="w-full aspect-[4/3] relative">
          <div className={`absolute inset-0 bg-gray-900 animate-pulse ${imageLoaded ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}></div>
          <img 
            src="/lovable-uploads/lucys-show-flyer.jpg" 
            alt="Lucys, Cbarrgs, Coyote Aguilar show flyer" 
            className="w-full h-full object-cover" 
            onLoad={() => setImageLoaded(true)}
          />
          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90"></div>
          
          {/* Title overlaid on image */}
          <div className="absolute bottom-0 left-0 right-0 p-4 text-center">
            <h3 className="text-xl font-medium text-white font-serif tracking-wide">
              <Music className="inline-block mr-2 h-4 w-4 mb-1" />
              Tomorrow Night!
            </h3>
          </div>
        </div>
        
        {/* Show details */}
        <div className="p-4 text-white/90 space-y-2">          
          <p className="font-medium text-center text-white">
            Lucys, Cbarrgs, Boodahki, Coyote Aguilar
          </p>
          
          <div className="flex flex-wrap justify-center gap-3 text-xs text-white/80 mb-3">
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
            className="block w-full bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 text-white py-3 px-4 rounded-md text-center font-medium transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] touch-manipulation"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get Tickets
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;
