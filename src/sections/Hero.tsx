import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faYoutube, faApple, faSpotify, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import Section from '@/components/Section';
import OptimizedImage from '@/components/ui/OptimizedImage';
import { SPOTIFY_URL, YOUTUBE_CHANNEL, INSTAGRAM_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';

interface HeroProps {
  onSectionVisible?: (id: string, visible: boolean) => void;
}

/**
 * Hero section with:
 * - GPU-accelerated animations
 * - Optimized background image loading
 * - Smooth scroll indicator
 * - Accessible social media links
 */
const Hero: React.FC<HeroProps> = ({ onSectionVisible }) => {
  const controls = useAnimation();

  // Social media links with icons
  const socialLinks = [
    {
      name: 'Instagram',
      url: INSTAGRAM_URL,
      icon: <FontAwesomeIcon icon={faInstagram} />
    },
    {
      name: 'YouTube',
      url: YOUTUBE_CHANNEL,
      icon: <FontAwesomeIcon icon={faYoutube} />
    },
    {
      name: 'Apple Music',
      url: APPLE_MUSIC_URL,
      icon: <FontAwesomeIcon icon={faApple} />
    },
    {
      name: 'Spotify',
      url: SPOTIFY_URL,
      icon: <FontAwesomeIcon icon={faSpotify} />
    },
    {
      name: 'SoundCloud',
      url: SOUNDCLOUD_URL,
      icon: <FontAwesomeIcon icon={faSoundcloud} />
    },
    {
      name: 'Linktree',
      url: LINKTREE_URL,
      icon: <FontAwesomeIcon icon={faLink} />
    }
  ];

  // Animation sequence
  useEffect(() => {
    const sequence = async () => {
      await controls.start('visible');
    };
    sequence();
  }, [controls]);

  // Animation variants for hero content
  const contentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
        duration: 0.8
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <Section
      id="hero"
      fullScreen
      backgroundImage="/lovable-uploads/9743b13a-5af9-480b-ba25-91a45011e839.jpg"
      backgroundOverlay="bg-black/50"
      className="flex items-center justify-center"
      onSectionVisible={onSectionVisible}
    >
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-screen-xl mx-auto">
        <motion.div
          className="space-y-6"
          variants={contentVariants}
          initial="hidden"
          animate={controls}
        >
          <motion.h1 
            className="text-6xl md:text-7xl font-display font-bold -mx-2" 
            variants={itemVariants}
          >
            CBARRGS
          </motion.h1>
          
          <motion.div 
            className="inline-block mb-4 px-3 py-1 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm bg-black/30" 
            variants={itemVariants}
          >
            Artist • Musician • Creator
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80" 
            variants={itemVariants}
          >
            Crafting musical experiences that push boundaries and resonate with souls
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4 pt-6" 
            variants={itemVariants}
          >
            <a 
              href="#music" 
              className="btn-primary transform will-change-transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Listen Now
            </a>
            <a 
              href="#about" 
              className="btn-secondary transform will-change-transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Discover More
            </a>
          </motion.div>
          
          {/* Social Media Icons */}
          <motion.div 
            className="flex justify-center space-x-3 pt-3" 
            variants={itemVariants}
          >
            {socialLinks.map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-300 flex items-center justify-center text-white"
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                whileTap={{ scale: 0.95 }}
                aria-label={social.name}
              >
                {social.icon}
              </motion.a>
            ))}
          </motion.div>
          
          {/* Scroll Indicator */}
          <motion.div 
            className="mt-12"
            variants={itemVariants}
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
              className="flex flex-col items-center justify-center cursor-pointer group" 
              onClick={() => {
                document.getElementById('about')?.scrollIntoView({
                  behavior: 'smooth'
                });
              }}
            >
              <span className="text-sm font-medium mb-2 text-white/70 group-hover:text-white/100 transition-colors duration-300">
                Scroll Down
              </span>
              <div className="p-2 rounded-full bg-white/10 group-hover:bg-white/20 transition-all duration-300 will-change-transform">
                <ArrowDown className="text-white" size={20} />
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default Hero;
