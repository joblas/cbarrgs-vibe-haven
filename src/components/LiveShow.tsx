import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  buttonHover,
} from '@/utils/animations';

const LiveShow: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const venueUrl = "https://maps.google.com/?q=317+E+Grand+Ave+Escondido+CA+92025";

  return (
    <section id="live-show" className="relative py-20 md:py-28 bg-black overflow-hidden scroll-mt-20">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 30%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <motion.h2
          className="font-serif text-3xl sm:text-4xl mb-3 font-light tracking-wider"
          variants={fadeInUpVariants}
        >
          Free Live Show
        </motion.h2>

        <motion.p
          className="text-white/70 text-sm sm:text-base mb-8 sm:mb-10 font-light"
          variants={fadeInUpVariants}
        >
          All ages welcome
        </motion.p>

        <motion.div
          className="space-y-4 mb-8 sm:mb-10"
          variants={staggerContainerVariants}
        >
          <motion.div
            className="inline-block p-6 sm:p-8 rounded-sm bg-white/[0.03] border border-white/10"
            variants={staggerItemVariants}
          >
            <h3 className="font-serif text-xl sm:text-2xl font-light mb-4">
              Distinction Gallery
            </h3>

            <div className="space-y-3 text-white/70 font-light text-sm sm:text-base">
              <div className="flex items-center justify-center gap-2">
                <Calendar className="w-4 h-4 text-white/50" />
                <span>April 11th, 2025</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-4 h-4 text-white/50" />
                <span>6pm - 8pm</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <MapPin className="w-4 h-4 text-white/50" />
                <span>317 E Grand Ave</span>
              </div>
              <p className="text-white/50 text-xs sm:text-sm">
                Escondido, CA 92025
              </p>
            </div>
          </motion.div>
        </motion.div>

        <motion.a
          href={venueUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full sm:w-auto min-w-[160px] border-2 border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60 text-white px-8 py-4 rounded-sm font-light tracking-wider transition-all duration-300 touch-manipulation"
          variants={fadeInUpVariants}
          {...buttonHover}
        >
          Get Directions
        </motion.a>
      </motion.div>
    </section>
  );
};

export default LiveShow;
