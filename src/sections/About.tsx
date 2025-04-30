import React from 'react';
import { motion } from 'framer-motion';
import Section from '@/components/Section';
import OptimizedImage from '@/components/ui/OptimizedImage';

interface AboutProps {
  onSectionVisible?: (id: string, visible: boolean) => void;
}

/**
 * About section with:
 * - Optimized image loading
 * - Staggered content animation
 * - Responsive grid layout
 */
const About: React.FC<AboutProps> = ({ onSectionVisible }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <Section
      id="about"
      fullScreen
      className="flex items-center py-20 bg-gradient-to-b from-black to-zinc-950"
      onSectionVisible={onSectionVisible}
    >
      <div className="section-container grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        {/* Image with optimized loading */}
        <motion.div 
          className="order-2 lg:order-1"
          variants={itemVariants}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="glass-panel p-3 rotate-1 transform hover:rotate-0 transition-transform duration-700">
            <OptimizedImage
              src="/lovable-uploads/49cedd91-5ebd-4d2c-a7c3-cff98a00ee90.jpg"
              alt="CBARRGS artist photo"
              width={600}
              height={800}
              className="w-full h-full object-cover rounded-sm"
            />
          </div>
        </motion.div>

        {/* About content */}
        <motion.div 
          className="order-1 lg:order-2 space-y-6 max-w-xl mx-auto lg:mx-0"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.4 }}
        >
          <motion.div variants={itemVariants}>
            <span className="inline-block text-sm font-medium text-white/60 uppercase tracking-wider mb-3">About The Artist</span>
            <h2 className="section-title mb-6">Behind The Music</h2>
          </motion.div>

          <motion.p 
            className="text-lg leading-relaxed text-white/80" 
            variants={itemVariants}
          >
            CBARRGS (pronounced "see-bargs") is a multi-faceted musician and producer whose work transcends traditional genre boundaries. With roots in both classical training and experimental production, his sound has evolved into a unique fusion of electronic, ambient, and alternative elements.
          </motion.p>

          <motion.p 
            className="text-lg leading-relaxed text-white/80" 
            variants={itemVariants}
          >
            Beginning his journey in 2015, CBARRGS has consistently pushed the boundaries of his craft, creating immersive sonic landscapes that invite listeners into carefully constructed emotional spaces.
          </motion.p>

          <motion.p 
            className="text-lg leading-relaxed text-white/80" 
            variants={itemVariants}
          >
            His most recent works explore themes of human connection, digital isolation, and the search for meaning in an increasingly complex world — all delivered through meticulously produced tracks that balance technical precision with raw emotional authenticity.
          </motion.p>

          <motion.div
            className="pt-4"
            variants={itemVariants}
          >
            <a 
              href="#music" 
              className="btn-secondary mr-4 will-change-transform transition-transform hover:scale-[1.02] active:scale-[0.98]"
            >
              Explore Music
            </a>
          </motion.div>
        </motion.div>
      </div>
    </Section>
  );
};

export default About;
