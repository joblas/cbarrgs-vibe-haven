
import React, { useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { useRef } from 'react';
import { ARTIST_BIO } from '@/utils/constants';
import { scaleIn, slideUp } from '@/utils/transitions';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  const paragraphs = ARTIST_BIO.trim().split('\n\n');

  return (
    <section id="about" className="relative py-24 md:py-32 bg-black">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <motion.div
            ref={ref}
            initial="initial"
            animate={controls}
            variants={scaleIn()}
            className="relative aspect-square overflow-hidden rounded-sm"
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-black/60 via-black/30 to-transparent z-10"></div>
            <img 
              src="https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=2070" 
              alt="CBARRGS" 
              className="absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition-transform duration-2000"
            />
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                className="glass-panel p-4 md:p-6 rounded-sm inline-block"
              >
                <h3 className="text-lg font-display font-medium mb-1">CBARRGS</h3>
                <p className="text-sm text-white/70">Artist • Musician • Creator</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial="initial"
            animate={controls}
            variants={slideUp(0.3)}
            className="space-y-6"
          >
            <span className="inline-block text-sm font-medium text-white/60 uppercase tracking-wider">About the Artist</span>
            <h2 className="section-title">The Story<br />Behind the Music</h2>
            
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.4 + index * 0.2, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
                  className="text-white/80 leading-relaxed"
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
              className="pt-4"
            >
              <a href="#music" className="btn-secondary">
                Explore Music
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
