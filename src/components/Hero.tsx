import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { fadeIn, slideUp } from '@/utils/transitions';
import { SPOTIFY_URL, YOUTUBE_CHANNEL, INSTAGRAM_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';

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
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
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
    icon: <i className="fab fa-instagram"></i>
  }, {
    name: 'YouTube',
    url: YOUTUBE_CHANNEL,
    icon: <i className="fab fa-youtube"></i>
  }, {
    name: 'Apple Music',
    url: APPLE_MUSIC_URL,
    icon: <i className="fab fa-apple"></i>
  }, {
    name: 'Spotify',
    url: SPOTIFY_URL,
    icon: <i className="fab fa-spotify"></i>
  }, {
    name: 'SoundCloud',
    url: SOUNDCLOUD_URL,
    icon: <i className="fab fa-soundcloud"></i>
  }, {
    name: 'Linktree',
    url: LINKTREE_URL,
    icon: <i className="fas fa-link"></i>
  }];
  return <motion.section id="hero" ref={containerRef} className="relative h-screen flex items-center justify-center overflow-hidden" style={{
    opacity
  }}>
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0 z-0 bg-black bg-opacity-40" style={{
      backgroundImage: `url('/lovable-uploads/9743b13a-5af9-480b-ba25-91a45011e839.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      scale
    }} />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-screen-xl mx-auto">
        <motion.div className="space-y-6" initial={{
        opacity: 0,
        y: 20
      }} animate={controls}>
          <motion.div className="inline-block mb-4 px-3 py-1 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm bg-black/30" {...fadeIn(0.2)}>
            Artist • Musician • Creator
          </motion.div>
          
          <motion.div {...fadeIn(0.4)} className="flex justify-center items-center">
            <img alt="CBARRGS Logo" className="w-auto max-w-full h-24 md:h-32 lg:h-40 object-contain" src="/lovable-uploads/c2c36249-43cd-4c2a-8813-24814c373b2b.jpg" />
          </motion.div>
          
          <motion.p className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80" {...fadeIn(0.6)}>
            Crafting musical experiences that push boundaries and resonate with souls
          </motion.p>
          
          <motion.div className="flex justify-center space-x-4 pt-6" {...fadeIn(0.8)}>
            <a href="#music" className="btn-primary">
              Listen Now
            </a>
            <a href="#about" className="btn-secondary">
              Discover More
            </a>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div className="social-icons" {...fadeIn(1.0)}>
            {socialLinks.map((social, i) => <motion.a key={i} href={social.url} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center text-white" whileHover={{ y: -3 }} whileTap={{ scale: 0.95 }} title={social.name}>
                {social.icon}
              </motion.a>)}
          </motion.div>
          
          {/* Scroll Indicator - Now positioned directly below social icons */}
          <motion.div 
            className="mt-12"
            initial={{
              opacity: 0,
              y: -20
            }}
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
              animate={{
                y: [0, 8, 0]
              }} 
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
              <span className="text-sm font-medium mb-2 text-white/70 hover:text-white/100 transition-colors duration-300">Scroll Down</span>
              <div className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all duration-300">
                <ArrowDown className="text-white" size={20} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>;
};
export default Hero;