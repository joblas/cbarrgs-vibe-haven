import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const SimpleHero: React.FC = () => {
  return (
    <section 
      id="hero" 
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Simplified Background - just a gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-900/20 to-black"></div>
      
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>
      
      {/* Content */}
      <div className="relative z-20 text-center px-6 max-w-screen-xl mx-auto">
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        >
          <motion.div
            className="inline-block mb-4 px-3 py-1 border border-white/20 rounded-full text-sm font-medium backdrop-blur-sm bg-black/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.2 } }}
          >
            Artist • Musician • Creator
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.4 } }}
            className="flex justify-center items-center"
          >
            <img 
              src="/lovable-uploads/cd8acf90-a91b-4be7-9cb7-6da83aa5731c.png" 
              alt="CBARRGS Logo" 
              className="w-auto max-w-full h-32 md:h-40 lg:h-48 object-contain"
            />
          </motion.div>
          
          <motion.p 
            className="text-xl md:text-2xl max-w-2xl mx-auto text-white/80"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6 } }}
          >
            Crafting musical experiences that push boundaries and resonate with souls
          </motion.p>
          
          <motion.div 
            className="flex justify-center space-x-4 pt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.8 } }}
          >
            <a href="#music" className="btn-primary">
              Listen Now
            </a>
            <a href="#about" className="btn-secondary">
              Discover More
            </a>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -20 }}
        animate={{ 
          opacity: 1, 
          y: 0,
          transition: { 
            delay: 1.2,
            duration: 0.8
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
    </section>
  );
};

export default SimpleHero;
