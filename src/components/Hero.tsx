
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
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
    >
      {/* Grain Overlay */}
      <div className="grain-overlay"></div>
      
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0" 
        style={{
          backgroundImage: `url('/lovable-uploads/9743b13a-5af9-480b-ba25-91a45011e839.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale,
          opacity: 0.8
        }} 
      />
      
      {/* Dark Overlay with Vignette */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/40 z-10"
        style={{
          boxShadow: 'inset 0 0 100px rgba(0, 0, 0, 0.8)'
        }}
      ></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-screen-xl mx-auto">
        <motion.div 
          className="space-y-8" 
          initial={{ opacity: 0, y: 20 }} 
          animate={controls}
        >
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-serif font-light tracking-wider mb-6"
            {...fadeIn(0.1)}
          >
            CBARRGS
          </motion.h1>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 pt-6" 
            {...fadeIn(0.4)}
          >
            <a href="#about" className="btn-secondary">
              Discover
            </a>
            <a href="#shop-coming-soon" className="btn-secondary">
              Store Coming Soon
            </a>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div className="social-icons mt-8" {...fadeIn(0.6)}>
            {socialLinks.map((social, i) => (
              <motion.a 
                key={i} 
                href={social.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-14 h-14 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-300 text-2xl" 
                whileHover={{ y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                title={social.name}
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
