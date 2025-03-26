
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { MERCHANDISE, SHOPIFY_STORE } from '@/utils/constants';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { fadeIn, slideUp, staggerContainer, staggerItems } from '@/utils/transitions';
import Image from './Image';

const Store: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  return (
    <section id="store" className="relative py-24 md:py-32 bg-gradient-to-b from-zinc-900 to-black" aria-labelledby="store-heading">
      <div className="section-container">
        <motion.div 
          ref={ref}
          initial="initial"
          animate={controls}
          variants={fadeIn()}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Merchandise</span>
          <h2 id="store-heading" className="section-title">Official Merch</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Show your support with official CBARRGS merchandise. From apparel to collectibles, find something that resonates with you.
          </p>
        </motion.div>

        <motion.div
          initial="initial"
          animate={controls}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {MERCHANDISE.map((item, i) => (
            <motion.div
              key={item.id}
              variants={staggerItems}
              className="glass-panel rounded-sm overflow-hidden group hover-grow"
            >
              <div className="aspect-square overflow-hidden bg-zinc-900 flex items-center justify-center">
                <Image 
                  src={item.image}
                  alt={`${item.name} merchandise item`}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-medium mb-1">{item.name}</h3>
                <p className="text-white/70 mb-3">${item.price.toFixed(2)}</p>
                <a 
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm w-full flex items-center justify-center"
                  aria-label={`Shop now: ${item.name} - $${item.price.toFixed(2)}`}
                >
                  <ShoppingBag size={16} className="mr-2" aria-hidden="true" />
                  Shop Now
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial="initial"
          animate={controls}
          variants={slideUp(0.6)}
          className="mt-16 text-center"
        >
          <a 
            href={SHOPIFY_STORE} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn-primary inline-flex items-center"
            aria-label="Visit the full merchandise store"
          >
            Visit Full Store
            <ExternalLink size={18} className="ml-2" aria-hidden="true" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Store;
