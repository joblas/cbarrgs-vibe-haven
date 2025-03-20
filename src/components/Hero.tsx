
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, Instagram, Youtube, Music, Link2, Apple, AudioLines } from 'lucide-react';
import { fadeIn, slideUp } from '@/utils/transitions';
import { INSTAGRAM_URL, YOUTUBE_CHANNEL, SPOTIFY_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';

const Hero: React.FC = () => {
  const controls = useAnimation();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  useEffect(() => {
    const sequence = async () => {
      await controls.start({ opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.45, 0, 0.55, 1] } });
    };
    
    sequence();
  }, [controls]);

  const socialLinks = [
    { name: 'Instagram', icon: <Instagram size={20} />, url: INSTAGRAM_URL },
    { name: 'YouTube', icon: <Youtube size={20} />, url: YOUTUBE_CHANNEL },
    { name: 'Spotify', icon: <Music size={20} />, url: SPOTIFY_URL },
    { name: 'Apple Music', icon: <Apple size={20} />, url: APPLE_MUSIC_URL },
    { name: 'SoundCloud', icon: <AudioLines size={20} />, url: SOUNDCLOUD_URL },
    { name: 'Linktree', icon: <Link2 size={20} />, url: LINKTREE_URL },
  ];

  return (
    <motion.section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 bg-black bg-opacity-40"
        style={{ 
          backgroundImage: `url('/lovable-uploads/fc2b859b-5207-4b51-94e1-a70230cc8871.png')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          scale
        }}
      />
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-screen-xl mx-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={controls}
        >
          <motion.div
            className="inline-block mb-4 px-3 py-1 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm bg-black/30"
            {...fadeIn(0.2)}
          >
            Artist • Musician • Creator
          </motion.div>
          
          <motion.div 
            {...fadeIn(0.4)}
            className="flex justify-center items-center"
          >
            <img 
              src="/lovable-uploads/cd8acf90-a91b-4be7-9cb7-6da83aa5731c.png" 
              alt="CBARRGS Logo" 
              className="w-auto max-w-full h-24 md:h-32 lg:h-40 object-contain"
            />
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80"
            {...fadeIn(0.6)}
          >
            Crafting musical experiences that push boundaries and resonate with souls
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4 pt-6"
            {...fadeIn(0.8)}
          >
            <a href="#music" className="btn-primary">
              Listen Now
            </a>
            <a href="#about" className="btn-secondary">
              Discover More
            </a>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="flex justify-center space-x-4 mt-6"
            {...fadeIn(1.0)}
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-300 flex items-center justify-center text-white/90"
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
      
      {/* Scroll Indicator - Adjusted position */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
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
          animate={{
            y: [0, 8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          }}
          className="flex flex-col items-center cursor-pointer"
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-sm font-medium mb-2 text-white/70">Scroll Down</span>
          <ArrowDown className="animate-pulse-subtle" size={20} />
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
