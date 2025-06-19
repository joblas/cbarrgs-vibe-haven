
import React from 'react';
import { motion, useAnimation, useInView, cubicBezier } from 'framer-motion';
import { useRef, useEffect } from 'react';
import { SHOPIFY_STORE } from '@/utils/constants';
import { fadeIn } from '@/utils/transitions';

const ShopComingSoon: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  return (
    <section id="shop-coming-soon" className="relative py-24 md:py-32 bg-black">
      <div 
        className="absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      <div className="section-container relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: cubicBezier(0.45, 0, 0.55, 1) }}
          className="max-w-md mx-auto text-center"
        >
          <motion.h2 
            className="font-serif text-3xl md:text-4xl mb-6 font-light"
            {...fadeIn(0.1)}
          >
            Shop Now
          </motion.h2>
          
          <motion.p 
            className="text-white/70 mb-8 font-light"
            {...fadeIn(0.2)}
          >
            Exclusive merchandise available on Shopify now.
          </motion.p>
          
          {/* Enhanced mobile-friendly button - using motion.a directly instead of nested elements */}
          <motion.a
            href={SHOPIFY_STORE} 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-secondary block w-full sm:inline-block sm:w-auto border border-white/30 backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-300 text-white px-8 py-4 md:py-3 rounded-sm font-light"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            {...fadeIn(0.3)}
            style={{
              touchAction: 'manipulation', // Optimize for touch
              WebkitTapHighlightColor: 'transparent', // Remove highlight on iOS
              userSelect: 'none', // Prevent text selection
              cursor: 'pointer', // Show pointer cursor
              transform: 'translateZ(0)', // Force GPU acceleration
              willChange: 'transform', // Optimize animations
              display: 'block', // Ensure full width is clickable
              minHeight: '44px', // Minimum touch target height
              textAlign: 'center', // Center text
              lineHeight: '1.25', // Ensure consistent line height
            }}
          >
            Visit Store
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopComingSoon;
