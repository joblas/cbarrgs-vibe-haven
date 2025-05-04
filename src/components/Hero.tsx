import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform, cubicBezier } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import { SPOTIFY_URL, YOUTUBE_CHANNEL, INSTAGRAM_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faApple, faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

const Hero: React.FC = () => {
  
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.03, 1.05], { 
    clamp: false,
    ease: cubicBezier(0.1, 0.4, 0.6, 0.9) // Using proper cubicBezier function
  });
  const y = useTransform(scrollYProgress, [0, 1], [0, 50], {
    ease: cubicBezier(0.1, 0.3, 0.7, 0.9) // Using proper cubicBezier function
  });
  
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: cubicBezier(0.25, 0.1, 0.25, 1.0), // Using proper cubicBezier function
          staggerChildren: 0.1
        }
      });
    };
    sequence();

    // Optimize render performance with passive event listeners
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => {}, { passive: true });
      window.addEventListener('resize', () => {}, { passive: true });
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('scroll', () => {});
        window.removeEventListener('resize', () => {});
      }
    };
  }, [controls]);
  
  const socialLinks = [{
    name: 'Instagram',
    url: INSTAGRAM_URL,
    icon: <FontAwesomeIcon icon={faInstagram} />
  }, {
    name: 'YouTube',
    url: YOUTUBE_CHANNEL,
    icon: <FontAwesomeIcon icon={faYoutube} />
  }, {
    name: 'Apple Music',
    url: APPLE_MUSIC_URL,
    icon: <FontAwesomeIcon icon={faApple} />
  }, {
    name: 'Spotify',
    url: SPOTIFY_URL,
    icon: <FontAwesomeIcon icon={faSpotify} />
  }, {
    name: 'SoundCloud',
    url: SOUNDCLOUD_URL,
    icon: <FontAwesomeIcon icon={faSoundcloud} />
  }, {
    name: 'Linktree',
    url: LINKTREE_URL,
    icon: <FontAwesomeIcon icon={faLink} />
  }];
  
  return (
    <motion.section 
      id="hero" 
      ref={containerRef} 
      className="relative h-screen flex items-center justify-center overflow-hidden" 
      style={{ opacity }}
      aria-label="Hero section"
    >
      {/* Grain Overlay */}
      <div 
        className="grain-overlay" 
        aria-hidden="true"
        style={{ 
          willChange: 'transform',
          transform: 'translateZ(0)'
        }}
      ></div>
      
      {/* Background Image with Parallax - Using WebP for better performance */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url('/lovable-uploads/cbarrgs-insta-bw.webp')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          opacity: 0.8,
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'transform', // Hint for browser optimization
          backfaceVisibility: 'hidden', // Prevent text rendering issues
        }} 
        role="img"
        aria-label="Cbarrgs artistic background image"
      />
      
      {/* Dark Overlay with Vignette */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)',
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'transform', // Hint for browser optimization
          mixBlendMode: 'multiply' // Improved blending for richer shadows
        }}
        aria-hidden="true"
      ></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-screen-xl mx-auto overflow-visible flex flex-col h-full justify-center">
        <motion.div 
          className="space-y-8" 
          initial={{ opacity: 0, y: 20 }} 
          animate={controls}
          style={{
            transform: 'translateZ(0)', // Force GPU acceleration
            willChange: 'transform, opacity', // Hint for browser optimization
            backfaceVisibility: 'hidden' // Prevent text rendering issues
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wider mb-6"
            {...fadeIn(0.1)}
            style={{ 
              textRendering: 'optimizeLegibility', // Improve text rendering
              fontSmooth: 'always', // Ensure smooth font rendering
              filter: 'drop-shadow(0 4px 3px rgba(0, 0, 0, 0.25))' // Premium text shadow
            }}
          >
            Cbarrgs
          </motion.h1>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 pt-6" 
            {...fadeIn(0.4)}
          >
            <a 
              href="#about" 
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('about');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                transform: 'translateZ(0)', // Force GPU acceleration for buttons
                backfaceVisibility: 'hidden', // Prevent rendering issues
                willChange: 'transform', // Optimize hover animations
                userSelect: 'none' // Prevent text selection for better mobile experience
              }}
            >
              Discover
            </a>
            <a 
              href="#shop-coming-soon" 
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                const element = document.getElementById('shop-coming-soon');
                if (element) {
                  const headerOffset = 80;
                  const elementPosition = element.getBoundingClientRect().top;
                  const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                  
                  window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                  });
                }
              }}
              style={{
                transform: 'translateZ(0)', // Force GPU acceleration
                backfaceVisibility: 'hidden', // Prevent rendering issues
                willChange: 'transform', // Optimize hover animations
                userSelect: 'none' // Prevent text selection
              }}
            >
              Store Coming Soon
            </a>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="social-icons mt-8 flex flex-wrap justify-center gap-2" 
            {...fadeIn(0.6)}
          >
            {socialLinks.map((social, i) => (
              <motion.a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-14 h-14 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-300 text-2xl touch-manipulation" 
                whileHover={{ 
                  y: -3,
                  scale: 1.05,
                  transition: { type: "spring", stiffness: 400, damping: 10 }
                }} 
                whileTap={{ 
                  scale: 0.95,
                  transition: { type: "spring", stiffness: 500, damping: 20 }
                }} 
                title={social.name}
                aria-label={`Visit Cbarrgs on ${social.name}`}
                style={{
                  transform: 'translateZ(0)', // Force GPU acceleration
                  willChange: 'transform', // Hint for browser optimization
                  backfaceVisibility: 'hidden', // Prevent text rendering issues
                  filter: 'drop-shadow(0 2px 2px rgba(0, 0, 0, 0.2))' // Subtle shadow for depth
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;