import React from 'react';
import { motion } from 'framer-motion';
import { SHOPIFY_STORE } from '@/utils/constants';
import { buttonHover } from '@/utils/animations';
import BlurFade from '@/components/ui/blur-fade';
import TextReveal from '@/components/ui/text-reveal';

interface Product {
  title: string;
  description: string;
  image: string;
  alt: string;
  soldOut?: boolean;
}

const products: Product[] = [
  {
    title: "New Tees",
    description: "From the EP \"Pieces For You\"",
    image: "/images/merch/tshirt.jpeg",
    alt: "Cbarrgs Pieces For You t-shirt",
    soldOut: true
  },
  {
    title: "Pins",
    description: "From the EP \"Pieces For You\"",
    image: "/images/merch/Pin.jpeg",
    alt: "Cbarrgs Pieces For You enamel pin",
    soldOut: false
  },
  {
    title: "Stickers",
    description: "Vinyl art stickers",
    image: "/images/merch/stickers.jpeg",
    alt: "Cbarrgs vinyl sticker designs",
    soldOut: false
  },
];

const ProductCard: React.FC<{ product: Product }> = ({ product }) => (
  <a
    href={SHOPIFY_STORE}
    target="_blank"
    rel="noopener noreferrer"
    className="group flex-shrink-0 w-[240px] sm:w-[280px] md:w-[300px] cursor-pointer block relative"
  >
    <div className="relative p-3.5 sm:p-5 bg-white/[0.03] border border-white/10 rounded-lg transition-all duration-300 group-hover:border-white/20 group-hover:bg-white/[0.06]">
      <div className="aspect-square mb-3 overflow-hidden rounded-md bg-white/5">
        <img
          src={product.image}
          alt={product.alt}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="eager"
        />
        {product.soldOut && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white/80 text-xs font-extralight tracking-wider">
            Sold Out
          </div>
        )}
        {!product.soldOut && product.alt === 'Cbarrgs Pieces For You t-shirt' && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm text-white/80 text-xs font-extralight tracking-wider">
            New Design Coming Soon
          </div>
        )}
      </div>
      <h3 className="font-serif text-base sm:text-lg mb-1 font-light">{product.title}</h3>
      <p className="text-white/50 text-xs sm:text-sm font-extralight">{product.description}</p>
    </div>
  </a>
);

const ShopComingSoon: React.FC = () => {
  const scrollItems = [...products, ...products, ...products];

  return (
    <section id="shop-coming-soon" className="relative py-16 sm:py-20 md:py-32 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.008) 30%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10">
        <div className="text-center">
          <BlurFade delay={0.1}>
            <TextReveal
              as="h2"
              className="font-serif text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 font-light px-5 tracking-wider"
            >
              New Tees and Pins
            </TextReveal>
          </BlurFade>

          <BlurFade delay={0.2}>
            <p className="text-white/50 mb-8 sm:mb-12 font-extralight max-w-md mx-auto text-sm sm:text-base px-5 tracking-wide">
              Just arrived — from the upcoming EP "Pieces For You." In the shop soon.
            </p>
          </BlurFade>

          {/* Horizontal scrolling product carousel */}
          <BlurFade delay={0.3}>
            <div className="shop-carousel mb-8 sm:mb-12">
              <div className="shop-carousel-track">
                {scrollItems.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
              </div>
            </div>
          </BlurFade>

          {/* Main CTA Button */}
          <BlurFade delay={0.4}>
            <motion.a
              href={SHOPIFY_STORE}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-auto min-w-[160px] border border-white/30 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/50 text-white px-8 py-3.5 rounded-lg font-extralight tracking-wider transition-all duration-300 touch-manipulation text-sm sm:text-base mx-5"
              {...buttonHover}
            >
              Visit Store
            </motion.a>
          </BlurFade>

          {/* Thank you message */}
          <BlurFade delay={0.5}>
            <p className="text-white/40 text-sm sm:text-base font-extralight mt-10 sm:mt-16 tracking-wide">
              Thanks for listening :)
            </p>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default ShopComingSoon;
