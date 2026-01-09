import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SHOPIFY_STORE } from '@/utils/constants';
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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Parallax effects - reduced on mobile for performance
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  const handleScrollToAbout = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('about');
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="hero"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url('/lovable-uploads/cbarrgs-insta-bw.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          y: reducedMotion ? 0 : backgroundY,
          scale: reducedMotion ? 1 : backgroundScale,
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

      {/* Ambient Glow behind title - dreamy bedroom pop effect */}
      <motion.div
        className="absolute z-15 w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
          filter: 'blur(40px)',
        }}
        variants={reducedMotion ? {} : glowPulseVariants}
        initial="initial"
        animate="animate"
        aria-hidden="true"
      />

      {/* Content */}
      <motion.div
        className="relative z-20 text-center px-4 sm:px-6 max-w-screen-xl mx-auto"
        style={{ opacity: contentOpacity }}
      >
        <motion.div
          className="space-y-6 md:space-y-8"
          variants={staggerContainerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Floating Title */}
          <motion.div
            variants={reducedMotion ? {} : floatingVariants}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-serif font-light tracking-wider"
              variants={staggerItemVariants}
              style={{
                textShadow: '0 4px 20px rgba(0, 0, 0, 0.5), 0 0 60px rgba(255, 255, 255, 0.1)',
              }}
            >
              Cbarrgs
            </motion.h1>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4"
            variants={staggerItemVariants}
          >
            <motion.a
              href="#about"
              onClick={handleScrollToAbout}
              className="w-full sm:w-auto min-w-[140px] px-8 py-3 border-2 border-white/60 bg-white/5 backdrop-blur-sm text-white font-light tracking-wider rounded-sm hover:bg-white/15 hover:border-white transition-all duration-300"
              {...buttonHover}
            >
              Discover
            </motion.a>
            <motion.a
              href={SHOPIFY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto min-w-[140px] px-8 py-3 border-2 border-white/60 bg-white/5 backdrop-blur-sm text-white font-light tracking-wider rounded-sm hover:bg-white/15 hover:border-white transition-all duration-300"
              {...buttonHover}
            >
              Shop Now
            </motion.a>
          </motion.div>

          {/* Social Media Icons - Staggered entrance */}
          <motion.div
            className="flex flex-wrap justify-center gap-1 sm:gap-2 pt-4"
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
      </motion.div>

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
    </motion.section>
  );
};

export default Hero;
