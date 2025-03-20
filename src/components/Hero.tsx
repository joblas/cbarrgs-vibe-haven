
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useScroll, useTransform } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { fadeIn, slideUp } from '@/utils/transitions';

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

  return (
    <motion.section 
      id="hero" 
      ref={containerRef}
      className="relative h-screen flex items-center justify-center overflow-hidden"
      style={{ opacity, position: 'relative' }}
    >
      {/* Background Image with Parallax */}
      <motion.div
        className="absolute inset-0 z-0 bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/lovable-uploads/b0b9136b-bf41-4d77-bc70-a06cc0c82910.png')`, 
          backgroundSize: 'contain',
          scale,
        }}
      />
      
      {/* Overlay */}
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
          
          <motion.h1 
            className="text-5xl md:text-7xl lg:text-8xl font-display font-bold tracking-tight"
            {...fadeIn(0.4)}
          >
            CBARRGS
          </motion.h1>
          
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
