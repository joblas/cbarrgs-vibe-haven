import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import { SPOTIFY_URL, YOUTUBE_CHANNEL, INSTAGRAM_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faApple, faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import AnnouncementBanner from './AnnouncementBanner';

const Hero: React.FC = () => {
  
  const [showBanner, setShowBanner] = useState(true);
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  const {
    scrollYProgress
  } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.05]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 50]);
  
  useEffect(() => {
    const sequence = async () => {
      await controls.start({
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.8,
          ease: [0.45, 0, 0.55, 1]
        }
      });
    };
    sequence();
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
      <div className="grain-overlay" aria-hidden="true"></div>
      
      {/* Background Image with Parallax - Preload this critical image */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url('/lovable-uploads/9743b13a-5af9-480b-ba25-91a45011e839.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          opacity: 0.8,
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'transform' // Hint for browser optimization
        }} 
        role="img"
        aria-label="Cbarrgs artistic background image"
      />
      
      {/* Dark Overlay with Vignette */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)',
          transform: 'translateZ(0)' // Force GPU acceleration
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
            willChange: 'transform, opacity' // Hint for browser optimization
          }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wider mb-6"
            {...fadeIn(0.1)}
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
                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              Discover
            </a>
            <a 
              href="#shop-coming-soon" 
              className="btn-secondary"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('shop-coming-soon')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                whileHover={{ y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                title={social.name}
                aria-label={`Visit Cbarrgs on ${social.name}`}
                style={{
                  transform: 'translateZ(0)', // Force GPU acceleration
                  willChange: 'transform' // Hint for browser optimization
                }}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Announcement Banner - placed at the bottom of hero section */}
        {showBanner && (
          <motion.div 
            className="absolute bottom-4 left-0 right-0 mx-auto flex justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
          >
            <AnnouncementBanner onDismiss={() => setShowBanner(false)} />
          </motion.div>
        )}
      </div>
    </motion.section>
  );
};

export default Hero;
