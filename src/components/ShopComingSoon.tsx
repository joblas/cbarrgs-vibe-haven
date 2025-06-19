
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

  const products = [
    {
      title: "Pins & Badges",
      description: "Collectible enamel pins",
      image: "/images/merch/Pin.jpeg",
      alt: "Cbarrgs collectible enamel pin"
    },
    {
      title: "Stickers",
      description: "Vinyl art stickers",
      image: "/images/merch/stickers.jpeg",
      alt: "Cbarrgs vinyl sticker designs"
    },
    {
      title: "Apparel",
      description: "Premium streetwear",
      image: "/images/merch/tshirt.jpeg",
      alt: "Cbarrgs branded t-shirt"
    }
  ];

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
          className="max-w-6xl mx-auto text-center"
        >
          <motion.h2 
            className="font-serif text-3xl md:text-4xl mb-6 font-light"
            {...fadeIn(0.1)}
          >
            Shop
          </motion.h2>
          
          <motion.p 
            className="text-white/70 mb-12 font-light max-w-md mx-auto"
            {...fadeIn(0.2)}
          >
            Exclusive merchandise designed for the Cbarrgs community.
          </motion.p>
          
          {/* Product Grid */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
            {...fadeIn(0.3)}
          >
            {products.map((product, index) => (
              <motion.div
                key={index}
                className="group cursor-pointer"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3, ease: cubicBezier(0.22, 1, 0.36, 1) }}
              >
                <div className="bedroom-pop-card p-6 h-full">
                  <div className="aspect-square mb-4 overflow-hidden rounded-sm bg-white/5">
                    <img
                      src={product.image}
                      alt={product.alt}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-serif text-xl mb-2 font-light">{product.title}</h3>
                  <p className="text-white/60 text-sm font-light">{product.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Main CTA Button */}
          <motion.a
            href={SHOPIFY_STORE} 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto border border-white/30 bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-sm font-light transition-colors duration-300"
            style={{
              minHeight: '48px',
              minWidth: '120px',
              touchAction: 'manipulation',
              WebkitTapHighlightColor: 'rgba(255,255,255,0.05)',
              WebkitTouchCallout: 'none',
              WebkitUserSelect: 'none',
              userSelect: 'none',
              cursor: 'pointer',
              display: 'block',
              textAlign: 'center'
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            {...fadeIn(0.5)}
          >
            Visit Store
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopComingSoon;
