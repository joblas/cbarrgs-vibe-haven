
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, MapPin, Music } from 'lucide-react';

interface AnnouncementBannerProps {
  onDismiss?: () => void;
}

const AnnouncementBanner: React.FC<AnnouncementBannerProps> = ({ onDismiss }) => {
  const [isDismissed, setIsDismissed] = useState(false);

  // Google Maps link for Distinction Gallery
  const venueUrl = "https://maps.google.com/?q=317+E+Grand+Ave+Escondido+CA+92025";

  if (isDismissed) return null;

  const handleDismiss = () => {
    setIsDismissed(true);
    if (onDismiss) onDismiss();
  };

  return (
    <div className="relative w-full max-w-[300px] md:max-w-sm mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
        className="relative bg-gradient-to-r from-neutral-900/95 via-neutral-800/95 to-neutral-900/95 rounded-lg border border-white/15 shadow-xl overflow-hidden"
      >
        {/* Dismiss button */}
        <button
          onClick={handleDismiss}
          className="absolute top-1 right-1 z-50 text-white/70 hover:text-white transition-colors duration-200 p-1 bg-black/30 rounded-full"
          aria-label="Dismiss announcement"
        >
          <X size={14} />
        </button>

        <div className="p-4 pr-6 text-white/90">
          <div className="flex flex-col gap-2">
            <h3 className="text-sm font-medium text-white font-serif leading-tight">
              <Music className="inline-block mr-1.5 h-3.5 w-3.5 relative -top-[1px]" />
              Free Live Show — All Ages
            </h3>

            <div className="space-y-1">
              <p className="text-xs font-medium text-white/90">
                Distinction Gallery
              </p>
              <p className="text-[11px] text-white/70">
                April 11th, 6pm–8pm
              </p>
              <div className="flex items-start gap-1 text-[11px] text-white/60">
                <MapPin className="h-3 w-3 mt-0.5 shrink-0" />
                <span>317 E Grand Ave, Escondido, CA 92025</span>
              </div>
            </div>

            <a
              href={venueUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-white/10 hover:bg-white/20 text-white py-1.5 px-3 rounded-md text-center text-xs font-medium transition-all duration-300 border border-white/20 hover:border-white/40 touch-manipulation mt-1"
            >
              Get Directions
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnnouncementBanner;
