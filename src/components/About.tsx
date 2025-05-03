import React, { useEffect } from 'react';
import { motion, useAnimation, useInView, cubicBezier } from 'framer-motion';
import { useRef } from 'react';
import { ARTIST_BIO } from '@/utils/constants';
import { scaleIn, slideUp } from '@/utils/transitions';
import Image from '@/components/Image';

const About: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { 
    once: false, 
    amount: 0.2 // Trigger earlier for smoother animations
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  const paragraphs = ARTIST_BIO.trim().split('\n\n');

  return (
    <section id="about" className="relative py-24 md:py-32 bg-black">
      {/* Grain background for texture */}
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
          transform: 'translateZ(0)', // Force GPU acceleration
          willChange: 'transform' // Hint for browser optimization
        }}
        aria-hidden="true"
      />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            ref={ref}
            initial="initial"
            animate={controls}
            variants={scaleIn()}
            className="relative aspect-square overflow-hidden rounded-sm bedroom-pop-card"
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translateZ(0)', // Force GPU acceleration
              perspective: '1000px', // Add depth for 3D transforms
              backfaceVisibility: 'hidden' // Improve GPU rendering
            }}
          >
            {/* Image vignette with premium gradient */}
            <div 
              className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/60 to-transparent z-10"
              style={{
                mixBlendMode: 'multiply', // Rich color blending
                transform: 'translateZ(0)', // Force GPU acceleration
                backdropFilter: 'contrast(1.1)' // Subtle richness boost
              }}
            ></div>
            
            <motion.div 
              className="absolute inset-0 overflow-hidden"
              whileHover={{ 
                scale: 1.05,
                transition: { 
                  duration: 1.2, 
                  type: 'spring', 
                  stiffness: 280, 
                  damping: 25
                } 
              }}
              transition={{ 
                duration: 0.8, 
                type: 'spring', 
                stiffness: 300, 
                damping: 30 
              }}
              style={{ 
                willChange: 'transform',
                backfaceVisibility: 'hidden',
                transformStyle: 'preserve-3d'
              }}
            >
              <Image 
                src="/lovable-uploads/c9d748bd-f6ea-4f2d-9dab-4b37fb0b3826.png" 
                alt="Cbarrgs with dog" 
                className="absolute inset-0 w-full h-full object-cover"
                priority={false} // Lazy load but with higher priority
                placeholderColor="#111111"
              />
            </motion.div>
            
            <div className="absolute bottom-6 left-6 right-6 z-20">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ 
                  delay: 0.3, 
                  duration: 0.8, 
                  ease: cubicBezier(0.25, 0.1, 0.25, 1.0) // Premium cubic bezier curve
                }}
                className="glass-panel p-4 md:p-6 rounded-sm inline-block"
                style={{ 
                  willChange: 'transform, opacity',
                  backfaceVisibility: 'hidden', // Improve GPU rendering
                  backdropFilter: 'blur(12px) saturate(120%)', // Richer glass effect
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)', // Premium shadow
                  transform: 'translateZ(0)' // Force GPU acceleration
                }}
              >
                <h3 className="text-lg font-serif font-light mb-1" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Cbarrgs</h3>
                <p className="text-sm text-white/70 font-light">Artist • Musician • Creator</p>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            ref={ref}
            initial="initial"
            animate={controls}
            variants={slideUp(0.3)}
            className="space-y-8"
            style={{ 
              willChange: 'transform, opacity',
              transform: 'translateZ(0)', // Force GPU acceleration
              perspective: '1000px' // Add depth perception
            }}
          >
            <h2 
              className="section-title font-light"
              style={{ 
                textShadow: '0 2px 4px rgba(0,0,0,0.3)', // Premium text shadow
                letterSpacing: '0.025em', // Slightly enhanced tracking for headings
                textRendering: 'optimizeLegibility' // Improve text rendering quality
              }}
            >
              bedroom transmissions:<br />between waves & signals
            </h2>
            
            <div className="space-y-6">
              {paragraphs.map((paragraph, index) => (
                <motion.p 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ 
                    delay: 0.4 + index * 0.08, // Slightly faster staggered effect
                    duration: 0.6, 
                    ease: cubicBezier(0.25, 0.1, 0.25, 1.0) // Premium cubic bezier curve
                  }}
                  className="text-white/80 leading-relaxed font-light"
                  style={{ 
                    willChange: 'transform, opacity',
                    backfaceVisibility: 'hidden', // Prevent text rendering issues
                    textRendering: 'optimizeSpeed', // Better text performance
                    transform: 'translateZ(0)'
                  }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
