import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { SHOPIFY_STORE, SPOTIFY_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { socialLinks } from '@/data/socialLinks';
import {
  floatingVariants,
  staggerContainerVariants,
  staggerItemVariants,
  socialIconHover,
  buttonHover,
  glowPulseVariants,
  prefersReducedMotion
} from '@/utils/animations';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = prefersReducedMotion();

  const handleScrollToSection = (e: React.MouseEvent, sectionId: string) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image - pure CSS for smooth scrolling */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/cbarrgs-insta-bw.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          willChange: 'transform',
        }}
        role="img"
        aria-label="Cbarrgs artistic background image"
      />

      {/* Dark Overlay with Vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"
        style={{ boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.9)' }}
        aria-hidden="true"
      />

      {/* Ambient Glow behind title - pre-blurred gradient, no runtime filter */}
      <motion.div
        className="absolute z-15 w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 30%, transparent 60%)',
        }}
        variants={reducedMotion ? {} : glowPulseVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      />

      {/* Content */}
      <div
        className="relative z-20 text-center px-4 sm:px-6 max-w-screen-xl mx-auto"
      >
        <motion.div
          className="space-y-6 md:space-y-8"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Floating Logo */}
          <motion.div
            variants={reducedMotion ? {} : floatingVariants}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={staggerItemVariants}
              className="flex justify-center"
            >
              <img
                src="/images/cbarrgs-logo.png"
                alt="Cbarrgs"
                className="h-24 sm:h-32 md:h-40 lg:h-48 xl:h-52 w-auto"
                style={{
                  filter: 'invert(1) drop-shadow(0 0 20px rgba(255, 255, 255, 0.5)) drop-shadow(0 0 40px rgba(255, 255, 255, 0.3)) drop-shadow(0 4px 15px rgba(0, 0, 0, 0.8))',
                }}
              />
              <h1 className="sr-only">Cbarrgs</h1>
            </motion.div>
          </motion.div>

          {/* Landing page headline */}
          <motion.div
            className="space-y-2"
            variants={staggerItemVariants}
          >
            <p className="text-white/90 text-sm sm:text-base font-light tracking-wider">
              Free live show · All ages · April 11th
            </p>
            <p className="text-white/70 text-xs sm:text-sm font-light tracking-wide">
              "Pieces For You" EP · Out April 25th
            </p>
            <p className="text-white/60 text-xs sm:text-sm font-light tracking-wide">
              New tees and pins available now
            </p>
          </motion.div>

          {/* CTA Buttons - three actions */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 pt-2"
            variants={staggerItemVariants}
          >
            <motion.a
              href="#live-show"
              onClick={(e) => handleScrollToSection(e, 'live-show')}
              className="w-full sm:w-auto min-w-[140px] px-8 py-3 border-2 border-white/60 bg-white/5 text-white font-light tracking-wider rounded-sm hover:bg-white/15 hover:border-white transition-all duration-300"
              {...buttonHover}
            >
              Show Details
            </motion.a>
            <motion.a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[140px] px-8 py-3 border-2 border-white/60 bg-white/5 text-white font-light tracking-wider rounded-sm hover:bg-white/15 hover:border-white transition-all duration-300"
              {...buttonHover}
            >
              Listen
            </motion.a>
            <motion.a
              href={SHOPIFY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[140px] px-8 py-3 border-2 border-white/60 bg-white/5 text-white font-light tracking-wider rounded-sm hover:bg-white/15 hover:border-white transition-all duration-300"
              {...buttonHover}
            >
              Shop Merch
            </motion.a>
          </motion.div>

          {/* Social Media Icons */}
          <motion.div
            className="flex flex-wrap justify-center gap-1 sm:gap-2 pt-2"
            variants={staggerItemVariants}
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white/80 hover:text-white transition-colors duration-300 text-xl sm:text-2xl touch-manipulation"
                {...socialIconHover}
                custom={i}
                title={social.name}
                aria-label={`Visit Cbarrgs on ${social.name}`}
              >
                <FontAwesomeIcon icon={social.icon} />
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
          animate={reducedMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-1 h-2 bg-white/50 rounded-full mt-2"
            animate={reducedMotion ? {} : { y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
