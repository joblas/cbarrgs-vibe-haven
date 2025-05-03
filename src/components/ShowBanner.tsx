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
      className="bg-gradient-to-r from-purple-900/90 via-black/90 to-purple-900/90 backdrop-blur-md py-3 px-4 rounded-md text-white border border-white/10 shadow-lg mb-8 max-w-lg mx-auto"
    >
      <div className="flex flex-col space-y-3">
        <div className="flex items-center justify-between">
          <span className="inline-block py-1 px-2 bg-purple-500/30 text-xs uppercase tracking-wider rounded-sm border border-purple-500/50">
            Live Tomorrow
          </span>
          <button
            onClick={hideBanner}
            className="text-white/70 hover:text-white transition-colors"
            aria-label="Close announcement"
          >
            <X size={16} />
          </button>
        </div>
        
        <p className="text-sm md:text-base text-center">
          <span className="mr-2 hidden sm:inline-block">🔥</span>
          Performing at MakeOutMusic with Lucys, Cbarrgs, Boodahki, Coyote Aguilar
          <span className="ml-2 hidden sm:inline-block">🔥</span>
        </p>
        
        <a
          href="https://dice.fm/event/pyqaqk-lucys-cbarrgs-boodahki-coyote-aguilar-3rd-may-location-tba-boyle-heights-los-angeles-los-angeles-tickets"
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-xs md:text-sm px-3 py-1 bg-white text-black rounded-sm hover:bg-purple-200 transition-colors duration-200 whitespace-nowrap font-medium mx-auto block"
        >
          Get Tickets
        </a>
      </div>
    </motion.div>
  );
};

export default ShowBanner;
