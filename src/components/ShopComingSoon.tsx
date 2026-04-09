import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { SHOPIFY_STORE } from '@/utils/constants';
import {
  staggerContainerVariants,
  fadeInUpVariants,
  buttonHover,
} from '@/utils/animations';

interface Product {
  title: string;
  description: string;
  image: string;
  alt: string;
}

const products: Product[] = [
  {
    title: "New Tees",
    description: "From the EP \"Pieces For You\"",
    image: "/images/merch/tshirt.jpeg",
    alt: "Cbarrgs Pieces For You t-shirt"
  },
  {
    title: "Pins",
    description: "From the EP \"Pieces For You\"",
    image: "/images/merch/Pin.jpeg",
    alt: "Cbarrgs Pieces For You enamel pin"
  },
  {
    title: "Stickers",
    description: "Vinyl art stickers",
    image: "/images/merch/stickers.jpeg",
    alt: "Cbarrgs vinyl sticker designs"
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a
    href={SHOPIFY_STORE}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex-shrink-0 w-[260px] sm:w-[300px] cursor-pointer block"
  >
    <div
      className="relative p-4 sm:p-5 bg-white/[0.03] border border-white/10 rounded-sm transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]"
    >
      <div className="aspect-square mb-3 overflow-hidden rounded-sm bg-white/5">
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
      </div>
      <h3 className="font-serif text-lg mb-1 font-light">{product.title}</h3>
      <p className="text-white/60 text-sm font-light">{product.description}</p>
    </div>
  </a>
);

const ShopComingSoon: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Duplicate products for seamless infinite scroll
  const scrollItems = [...products, ...products, ...products];

  return (
    <section id="shop-coming-soon" className="relative py-20 md:py-32 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 30%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <motion.div
          ref={ref}
          className="text-center"
          variants={staggerContainerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <motion.h2
            className="font-serif text-3xl sm:text-4xl mb-4 sm:mb-6 font-light px-4"
            variants={fadeInUpVariants}
          >
            New Tees and Pins
          </motion.h2>

          <motion.p
            className="text-white/60 mb-10 sm:mb-12 font-light max-w-md mx-auto text-sm sm:text-base px-4"
            variants={fadeInUpVariants}
          >
            From the EP "Pieces For You" — out now.
          </motion.p>

          {/* Horizontal scrolling product carousel */}
          <motion.div
            className="shop-carousel mb-10 sm:mb-12"
            variants={fadeInUpVariants}
          >
            <div className="shop-carousel-track">
              {scrollItems.map((product, index) => (
                <ProductCard key={index} product={product} />
              ))}
            </div>
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

          {/* Thank you message */}
          <motion.p
            className="text-white/50 text-sm sm:text-base font-light mt-12 sm:mt-16"
            variants={fadeInUpVariants}
          >
            Thanks for listening :)
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};

export default ShopComingSoon;
