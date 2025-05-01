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
            className="inline-block mb-8 px-4 py-2 border border-white/20 rounded-sm text-sm font-light backdrop-blur-sm bg-black/10" 
            {...fadeIn(0.2)}
          >
            Artist • Musician • Creator
          </motion.div>
          
          <motion.div 
            className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-6 pt-6" 
            {...fadeIn(0.4)}
          >
            <a href="#about" className="btn-secondary">
              Discover
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
                className="w-12 h-12 rounded-sm bg-white/10 hover:bg-white/20 transition-colors duration-500 flex items-center justify-center text-white/80 hover:text-white" 
                whileHover={{ y: -3 }} 
                whileTap={{ scale: 0.95 }} 
                title={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="mt-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                delay: 1.2,
                duration: 0.8,
                ease: [0.45, 0, 0.55, 1]
              }
            }}
          >
            <motion.div 
              animate={{ y: [0, 8, 0] }} 
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }} 
              className="flex flex-col items-center justify-center cursor-pointer hover:text-white transition-colors duration-300" 
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              <span className="text-sm font-light mb-2 text-white/70 hover:text-white/100 transition-colors duration-300">Scroll</span>
              <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <ArrowDown className="text-white" size={20} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default Hero;
