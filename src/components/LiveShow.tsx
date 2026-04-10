import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Clock } from 'lucide-react';
import { buttonHover } from '@/utils/animations';
import BlurFade from '@/components/ui/blur-fade';
import TextReveal from '@/components/ui/text-reveal';

const LiveShow: React.FC = () => {
  const venueUrl = "https://maps.google.com/?q=317+E+Grand+Ave+Escondido+CA+92025";

  return (
    <section id="live-show" className="relative py-16 sm:py-20 md:py-28 bg-black overflow-hidden scroll-mt-20">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 30%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 sm:px-6 lg:px-8 max-w-3xl mx-auto text-center">
        <BlurFade delay={0.1}>
          <TextReveal
            as="h2"
            className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 font-light tracking-wider"
          >
            Free Live Show
          </TextReveal>
        </BlurFade>

        <BlurFade delay={0.2}>
          <p className="text-white/60 text-sm sm:text-base mb-8 sm:mb-10 font-extralight tracking-wide">
            All ages welcome
          </p>
        </BlurFade>

        <BlurFade delay={0.3}>
          <div className="space-y-4 mb-8 sm:mb-10">
            <div className="inline-block w-full sm:w-auto p-5 sm:p-8 rounded-lg bg-white/[0.03] border border-white/10 hover:border-white/15 transition-colors duration-500">
              <h3 className="font-serif text-lg sm:text-2xl font-light mb-4 tracking-wide">
                Distinction Gallery
              </h3>

              <div className="flex flex-col sm:flex-row sm:justify-center gap-3 sm:gap-6 text-white/60 font-extralight text-sm sm:text-base">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>April 11th, 2026</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>6pm - 8pm</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-white/40 flex-shrink-0" />
                  <span>317 E Grand Ave</span>
                </div>
              </div>
              <p className="text-white/40 text-xs sm:text-sm mt-3 font-extralight">
                Escondido, CA 92025
              </p>
            </div>
          </div>
        </BlurFade>

        <BlurFade delay={0.4}>
          <motion.a
            href={venueUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto min-w-[160px] border border-white/30 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/50 text-white px-8 py-3.5 rounded-lg font-extralight tracking-wider transition-all duration-300 touch-manipulation text-sm sm:text-base"
            {...buttonHover}
          >
            Get Directions
          </motion.a>
        </BlurFade>
      </div>
    </section>
  );
};

export default LiveShow;
