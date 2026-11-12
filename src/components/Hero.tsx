import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SHOPIFY_STORE } from '@/utils/constants';
import { LATEST_RELEASE, LATEST_RELEASE_SPOTIFY_URL } from '@/data/latestRelease';
import {
  floatingVariants,
  staggerContainerVariants,
  staggerItemVariants,
  glowPulseVariants,
  prefersReducedMotion
} from '@/utils/animations';
import Magnetic from '@/components/ui/magnetic';
import { useMarketingNews } from '@/hooks/useMarketingNews';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropRef = useRef<HTMLDivElement>(null);
  const reducedMotion = prefersReducedMotion();
  const [dropOpen, setDropOpen] = useState(false);
  const [bgImageLoaded, setBgImageLoaded] = useState(false);
  const { news } = useMarketingNews();

  // The marketing bot's copy wins; otherwise the newest release speaks.
  // Without a bot headline the release title is the display line and its
  // type/status move to the ruled label above it.
  const showReleaseLabel = !news?.headline;
  const headline = news?.headline || LATEST_RELEASE.title;
  const subheadline =
    news?.subheadline || `Stream the new ${LATEST_RELEASE.type.toLowerCase()} · Shop official merch`;
  const ctaText = news?.ctaText || `Listen to ${LATEST_RELEASE.title} · Shop Merch`;
  const longHeadline = headline.length > 28;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setDropOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDropOpen(false);
    };
    if (dropOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
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
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
       {/* Background Image */}
       <img
         src="/lovable-uploads/cbarrgs-insta-bw.webp"
         alt=""
         fetchPriority="high"
         decoding="async"
         className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none transition-opacity duration-1000 ease-in-out"
         style={{ opacity: bgImageLoaded ? 1 : 0 }}
         onLoad={() => setBgImageLoaded(true)}
       />

      {/* Dark Overlay with Vignette */}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"
        style={{ boxShadow: 'inset 0 0 150px rgba(0, 0, 0, 0.9)' }}
        aria-hidden="true"
      />

      {/* Ambient Glow */}
      <motion.div
        className="absolute z-[15] w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] md:w-[600px] md:h-[600px] rounded-full pointer-events-none"
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
        className="absolute top-[env(safe-area-inset-top,0px)] left-0 pt-5 pl-5 sm:pt-8 sm:pl-8 z-20"
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
            className="h-12 sm:h-16 md:h-20 lg:h-28 w-auto"
            style={{
              filter: 'invert(1) drop-shadow(0 2px 10px rgba(0, 0, 0, 0.8))',
            }}
          />
          <h1 className="sr-only">Cbarrgs</h1>
        </motion.div>
      </motion.div>

      {/* Shopping Cart - top right */}
      <Magnetic strength={0.2} radius={120}>
        <motion.a
          href={SHOPIFY_STORE}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute top-[env(safe-area-inset-top,0px)] right-0 pt-5 pr-5 sm:pt-8 sm:pr-8 z-20 group"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          aria-label="Shop Cbarrgs merch"
        >
          <motion.img
            src="/images/cbarrgs-cart.svg"
            alt="Shop"
            className="h-10 sm:h-12 md:h-14 w-auto opacity-70 group-hover:opacity-100 transition-opacity duration-300"
            whileHover={reducedMotion ? {} : { x: 4 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          />
        </motion.a>
      </Magnetic>

      {/* Content */}
      <div className="relative z-20 text-center px-5 sm:px-6 max-w-screen-xl mx-auto w-full">
        {/* Scrim: a soft black pool behind the copy so it reads over the
            illustration without blur or filters. */}
        <div
          className="absolute -inset-x-40 -inset-y-32 md:-inset-x-24 md:-inset-y-36 -z-10 pointer-events-none"
          style={{
            background:
              'radial-gradient(closest-side, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.76) 35%, rgba(0,0,0,0.6) 55%, rgba(0,0,0,0.38) 72%, rgba(0,0,0,0.16) 87%, rgba(0,0,0,0) 100%)',
          }}
          aria-hidden="true"
        />

        <motion.div
          className="flex flex-col items-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Spacer for logo */}
          <div className="h-12 sm:h-16 md:h-20" aria-hidden="true" />

          {/* Release: ruled label strip + display title. The strip is as wide
              as the title, like the label on a record sleeve. */}
          <motion.div
            className="inline-flex flex-col items-stretch max-w-full"
            variants={staggerItemVariants}
          >
            {showReleaseLabel && (
              <p className="flex items-center justify-between gap-6 border-y border-white/20 py-2.5 mb-5 sm:mb-7 text-[10px] sm:text-[11px] font-light uppercase tracking-[0.28em] text-white/75">
                <span>New {LATEST_RELEASE.type.toLowerCase()}</span>
                <span>Out now <span aria-hidden="true">/</span> Ya disponible</span>
              </p>
            )}
            <h2
              className={`font-serif italic font-normal text-white text-balance [text-shadow:0_2px_28px_rgba(0,0,0,0.55)] ${
                longHeadline
                  ? 'text-[clamp(2rem,5.5vw,4rem)] leading-[1.08]'
                  : 'text-[clamp(3rem,9vw,6.5rem)] leading-[0.98]'
              }`}
            >
              {headline}
            </h2>
          </motion.div>

          <motion.p
            className="mt-5 sm:mt-8 max-w-md text-sm sm:text-base font-light tracking-wider text-white/70"
            variants={staggerItemVariants}
          >
            {subheadline}
          </motion.p>

          {/* Actions */}
          <motion.nav
            className="mt-8 sm:mt-10 grid grid-cols-2 gap-3 w-full max-w-[22rem] sm:flex sm:w-auto sm:max-w-none sm:justify-center"
            variants={staggerItemVariants}
            aria-label="Quick links"
          >
            <a
              href={LATEST_RELEASE_SPOTIFY_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="sm:min-w-[11.5rem] inline-flex h-12 items-center justify-center gap-2.5 px-6 bg-white text-black text-xs font-normal uppercase tracking-[0.25em] transition-colors duration-300 hover:bg-white/80"
            >
              listen
              <svg className="h-3.5 w-3.5 shrink-0" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
                <path d="M7 17L17 7M9 7h8v8" />
              </svg>
            </a>
            <div ref={dropRef} className="relative">
              <button
                onClick={() => setDropOpen((prev) => !prev)}
                className="w-full sm:min-w-[11.5rem] inline-flex h-12 items-center justify-center gap-2 px-6 border border-white/40 text-white text-xs font-light uppercase tracking-[0.25em] transition-colors duration-300 hover:border-white hover:bg-white/[0.06]"
                aria-expanded={dropOpen}
                aria-haspopup="true"
              >
                drop<motion.span
                  className="inline-block text-[10px] align-middle"
                  animate={{ rotate: dropOpen ? 180 : 0 }}
                  transition={{ duration: 0.2 }}
                >&#9662;</motion.span>
              </button>
              <AnimatePresence>
                {dropOpen && (
                  <motion.div
                    className="absolute top-full inset-x-0 mt-2 z-30 flex flex-col border border-white/15 bg-black"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <a
                      href={SHOPIFY_STORE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 text-white/80 hover:text-white hover:bg-white/[0.06] text-xs font-light uppercase tracking-[0.25em] transition-colors duration-200 whitespace-nowrap"
                    >
                      new
                    </a>
                    <div className="mx-5 h-px bg-white/10" />
                    <a
                      href={SHOPIFY_STORE}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-5 py-3.5 text-white/60 hover:text-white hover:bg-white/[0.06] text-xs font-light uppercase tracking-[0.25em] transition-colors duration-200 whitespace-nowrap"
                    >
                      archive
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.nav>

          {/* Smart-link page (/new): every platform + merch */}
          <motion.div className="mt-6" variants={staggerItemVariants}>
            <Link
              to="/new"
              className="group inline-flex items-baseline gap-2 py-2 text-[13px] font-light tracking-wider text-white/65 transition-colors duration-300 hover:text-white"
            >
              <span className="underline decoration-white/25 underline-offset-[6px] transition-colors duration-300 group-hover:decoration-white/60">
                {ctaText}
              </span>
              <span aria-hidden="true">&rarr;</span>
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
      >
        <motion.div
          className="w-5 h-8 sm:w-6 sm:h-10 border border-white/20 rounded-full flex justify-center"
          animate={reducedMotion ? {} : { opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <motion.div
            className="w-0.5 h-1.5 sm:w-1 sm:h-2 bg-white/40 rounded-full mt-1.5 sm:mt-2"
            animate={reducedMotion ? {} : { y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
