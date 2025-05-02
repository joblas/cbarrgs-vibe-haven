import React from 'react';
import { motion } from 'framer-motion';
import { X } from 'lucide-react';

const ShowBanner: React.FC = () => {
  const [isVisible, setIsVisible] = React.useState(true);

  // Hide the banner when clicked
  const hideBanner = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-purple-900/90 via-black/90 to-purple-900/90 backdrop-blur-md py-3 px-4 text-white border-b border-white/10 shadow-lg"
    >
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-2 flex-grow">
          <span className="inline-block py-1 px-2 bg-purple-500/30 text-xs uppercase tracking-wider rounded-sm border border-purple-500/50">
            Live Tomorrow
          </span>
          <p className="text-sm md:text-base">
            <span className="mr-2 hidden sm:inline-block">🔥</span>
            CBARRGS performing at Lucy's w/ Boodahki, Coyote & Aguilar - May 3rd
            <span className="ml-2 hidden sm:inline-block">🔥</span>
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <a
            href="https://dice.fm/event/pyqaqk-lucys-cbarrgs-boodahki-coyote-aguilar-3rd-may-location-tba-boyle-heights-los-angeles-los-angeles-tickets"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs md:text-sm px-3 py-1 bg-white text-black rounded-sm hover:bg-purple-200 transition-colors duration-200 whitespace-nowrap font-medium"
          >
            Get Tickets
          </a>
          <button
            onClick={hideBanner}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ShowBanner;
