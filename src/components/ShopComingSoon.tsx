import React, { useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SHOPIFY_STORE } from '@/utils/constants';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  buttonHover,
  createTiltStyle,
  resetTiltStyle,
  prefersReducedMotion,
  isTouchDevice
} from '@/utils/animations';

interface TiltState {
  x: number;
  y: number;
}

interface ProductCardProps {
  product: {
    title: string;
    description: string;
    image: string;
    alt: string;
  };
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [tilt, setTilt] = useState<TiltState>({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const reducedMotion = prefersReducedMotion();
  const isTouch = isTouchDevice();
  const enable3D = !reducedMotion && !isTouch;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!enable3D || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setTilt({
      x: y * 12, // Rotate around X axis based on Y position
      y: x * -12, // Rotate around Y axis based on X position
    });
  };

  const handleMouseEnter = () => setIsHovering(true);

  const handleMouseLeave = () => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <motion.div
      ref={cardRef}
      className="group cursor-pointer"
      variants={staggerItemVariants}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={enable3D && isHovering ? createTiltStyle(tilt.x, tilt.y) : resetTiltStyle}
    >
      <div
        className="relative p-5 sm:p-6 h-full bg-white/[0.03] border border-white/10 rounded-sm backdrop-blur-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]"
        style={{
          boxShadow: isHovering
            ? '0 20px 40px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 255, 255, 0.03)'
            : '0 4px 20px rgba(0, 0, 0, 0.2)',
          transition: 'box-shadow 0.3s ease-out',
        }}
      >
        {/* Shine effect on hover */}
        {enable3D && (
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-sm overflow-hidden"
            style={{
              background: `radial-gradient(circle at ${50 + tilt.y * 8}% ${50 - tilt.x * 8}%, rgba(255,255,255,0.08) 0%, transparent 50%)`,
            }}
          />
        )}

        <div className="aspect-square mb-4 overflow-hidden rounded-sm bg-white/5">
          <img
            src={product.image}
            alt={product.alt}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
        </div>
        <h3 className="font-serif text-lg sm:text-xl mb-2 font-light">{product.title}</h3>
        <p className="text-white/50 text-sm font-light">{product.description}</p>
      </div>
    </motion.div>
  );
};

const ShopComingSoon: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
    <section id="shop-coming-soon" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Grain Overlay */}
      <div className="grain-overlay opacity-10" aria-hidden="true" />

      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 60%)',
          filter: 'blur(60px)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          className="max-w-6xl mx-auto text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="font-serif text-3xl sm:text-4xl mb-4 sm:mb-6 font-light"
            variants={fadeInUpVariants}
          >
            Shop
          </motion.h2>

          <motion.p
            className="text-white/60 mb-10 sm:mb-12 font-light max-w-md mx-auto text-sm sm:text-base"
            variants={fadeInUpVariants}
          >
            Exclusive merchandise designed for the Cbarrgs community.
          </motion.p>

          {/* Product Grid - 1 col mobile, 3 col desktop */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-10 sm:mb-12"
            variants={staggerContainerVariants}
          >
            {products.map((product, index) => (
              <ProductCard key={index} product={product} index={index} />
            ))}
          </motion.div>

          {/* Main CTA Button */}
          <motion.a
            href={SHOPIFY_STORE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block w-full sm:w-auto min-w-[160px] border-2 border-white/40 bg-white/5 hover:bg-white/10 hover:border-white/60 text-white px-8 py-4 rounded-sm font-light tracking-wider transition-all duration-300 touch-manipulation"
            variants={fadeInUpVariants}
            {...buttonHover}
          >
            Visit Store
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopComingSoon;
