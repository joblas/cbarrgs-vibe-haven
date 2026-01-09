import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ARTIST_BIO } from '@/utils/constants';
import Image from '@/components/Image';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  scaleInVariants,
  hoverScale,
  prefersReducedMotion
} from '@/utils/animations';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const reducedMotion = prefersReducedMotion();

  const paragraphs = ARTIST_BIO.trim().split('\n\n');

  return (
    <section id="about" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay opacity-15" aria-hidden="true" />

      {/* Ambient glow - positioned on the right for visual interest */}
      <div
        className="absolute top-1/3 -right-40 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.04) 0%, transparent 60%)',
          filter: 'blur(80px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Image Column */}
          <motion.div
            className="relative aspect-square overflow-hidden rounded-sm bg-white/[0.02] border border-white/10"
            variants={scaleInVariants}
          >
            {/* Image vignette overlay */}
            <div
              className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent z-10 pointer-events-none"
            />

            {/* Hover wrapper for image zoom */}
            <motion.div
              className="absolute inset-0 overflow-hidden"
              {...(reducedMotion ? {} : hoverScale)}
            >
              <Image
                src="/lovable-uploads/c9d748bd-f6ea-4f2d-9dab-4b37fb0b3826.png"
                alt="Cbarrgs with dog"
                className="absolute inset-0 w-full h-full object-cover"
                priority={false}
                placeholderColor="#111111"
              />
            </motion.div>

            {/* Glass card overlay */}
            <motion.div
              className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 z-20"
              variants={fadeInUpVariants}
            >
              <div
                className="inline-block p-4 sm:p-5 rounded-sm bg-white/10 backdrop-blur-md border border-white/20"
                style={{
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                }}
              >
                <h3 className="text-base sm:text-lg font-serif font-light mb-1">Cbarrgs</h3>
                <p className="text-xs sm:text-sm text-white/60 font-light">Artist • Musician • Creator</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Text Column */}
          <motion.div
            className="space-y-6 sm:space-y-8"
            variants={staggerContainerVariants}
          >
            <motion.h2
              className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wider"
              variants={fadeInUpVariants}
              style={{
                textShadow: '0 2px 10px rgba(0,0,0,0.3)',
              }}
            >
              bedroom transmissions:<br />
              <span className="text-white/80">between waves & signals</span>
            </motion.h2>

            <div className="space-y-4 sm:space-y-5">
              {paragraphs.map((paragraph, index) => (
                <motion.p
                  key={index}
                  className="text-white/70 leading-relaxed font-light text-sm sm:text-base"
                  variants={staggerItemVariants}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
