import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SHOPIFY_STORE, SPOTIFY_URL } from '@/utils/constants';
import {
  floatingVariants,
  staggerContainerVariants,
  staggerItemVariants,
  glowPulseVariants,
  prefersReducedMotion
} from '@/utils/animations';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const reducedMotion = prefersReducedMotion();
  const [dropOpen, setDropOpen] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    if (dropOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropOpen]);

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
      {/* Background Image - fixed position img for smooth scrolling without repaints */}
      <img
        src="/lovable-uploads/cbarrgs-insta-bw.webp"
        alt="Cbarrgs artistic background image"
        fetchPriority="high"
        decoding="async"
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
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

      {/* Floating Logo - top left */}
      <motion.div
        className="absolute top-6 left-6 sm:top-8 sm:left-8 z-20"
        variants={reducedMotion ? {} : floatingVariants}
        initial="initial"
        animate="animate"
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <img
            src="/images/cbarrgs-logo.png"
            alt="Cbarrgs"
            className="h-16 sm:h-20 md:h-24 lg:h-28 w-auto"
            style={{
              filter: 'invert(1) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))',
            }}
          />
          <h1 className="sr-only">Cbarrgs</h1>
        </motion.div>
      </motion.div>

      {/* Shopping Cart - top right */}
      <motion.a
        href={SHOPIFY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20 group"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        aria-label="Shop Cbarrgs merch"
      >
        <motion.img
          src="/images/cbarrgs-cart.svg"
          alt="Shop"
          className="h-12 sm:h-14 md:h-16 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          whileHover={reducedMotion ? {} : { x: 4 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        />
      </motion.a>

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
          {/* Spacer to offset content below the logo */}
          <div className="h-16 sm:h-20 md:h-24" aria-hidden="true" />

          {/* Primary CTA - Promo Page Pill Button */}
          <motion.div variants={staggerItemVariants}>
            <Link to="/new">
              <motion.div
                className="inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-white/30 bg-white/[0.06] hover:bg-white/[0.12] hover:border-white/50 transition-all duration-300 cursor-pointer group"
                whileHover={reducedMotion ? {} : { scale: 1.03 }}
                whileTap={reducedMotion ? {} : { scale: 0.98 }}
              >
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/60 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-white/90" />
                </span>
                <span className="text-white font-light tracking-wider text-sm sm:text-base">
                  New EP Coming Soon &middot; Show &middot; New Merch
                </span>
              </motion.div>
            </Link>
          </motion.div>

          {/* Landing page headline */}
          <motion.div
            className="space-y-2"
            variants={staggerItemVariants}
          >
            <p className="text-white/80 text-sm sm:text-base font-light tracking-wider">
              "Pieces For You" EP &middot; Coming April 25th
            </p>
            <p className="text-white/60 text-xs sm:text-sm font-light tracking-wide">
              Free live show &middot; April 11th &middot; All ages
            </p>
            <p className="text-white/50 text-xs sm:text-sm font-light tracking-wide">
              New tees &amp; pins just arrived &middot; In the shop soon
            </p>
          </motion.div>

          {/* Navigation links - minimal text style */}
          <motion.nav
            className="flex flex-row justify-center items-center gap-6 sm:gap-8 pt-2"
            variants={staggerItemVariants}
            aria-label="Quick links"
          >
            <a
              href="#live-show"
              onClick={(e) => handleScrollToSection(e, 'live-show')}
              className="text-white/60 hover:text-white text-xs sm:text-sm font-light tracking-wider transition-colors duration-300 underline-offset-4 hover:underline"
            >
              show
            </a>
            <a
              href={SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white text-xs sm:text-sm font-light tracking-wider transition-colors duration-300 underline-offset-4 hover:underline"
            >
              listen
            </a>
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((prev) => !prev)}
                className="text-white/60 hover:text-white text-xs sm:text-sm font-light tracking-wider transition-colors duration-300 underline-offset-4 hover:underline flex items-center gap-1"
                aria-expanded={dropOpen}
                aria-haspopup="true"
              >
                drop
                <motion.span
                  className="inline-block text-[10px]"
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  &#9662;
                </motion.span>
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-2 flex flex-col items-center gap-2 py-3 px-5 rounded-lg bg-black/80 border border-white/10"
                    initial={{ opacity: 0, y: -8, scaleY: 0.8 }}
                    animate={{ opacity: 1, y: 0, scaleY: 1 }}
                    exit={{ opacity: 0, y: -8, scaleY: 0.8 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    style={{ transformOrigin: 'top center' }}
                  >
                    <a
                      href={SHOPIFY_STORE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/70 hover:text-white text-xs sm:text-sm font-light tracking-wider transition-colors duration-200 whitespace-nowrap"
                    >
                      new
                    </a>
                    <div className="w-8 h-px bg-white/10" />
                    <a
                      href={SHOPIFY_STORE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/50 hover:text-white text-xs sm:text-sm font-light tracking-wider transition-colors duration-200 whitespace-nowrap"
                    >
                      archive
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

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
