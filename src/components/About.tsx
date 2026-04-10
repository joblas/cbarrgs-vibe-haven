import React from 'react';
import { motion } from 'framer-motion';
import { ARTIST_BIO } from '@/utils/constants';
import Image from '@/components/Image';
import { hoverScale, prefersReducedMotion } from '@/utils/animations';
import BlurFade from '@/components/ui/blur-fade';
import TextReveal from '@/components/ui/text-reveal';

const About: React.FC = () => {
  const reducedMotion = prefersReducedMotion();
  const paragraphs = ARTIST_BIO.trim().split('\n\n');

  return (
    <section id="about" className="relative py-16 sm:py-20 md:py-32 bg-black overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute top-1/3 -right-40 w-[400px] sm:w-[600px] h-[400px] sm:h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 30%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image Column */}
          <BlurFade delay={0.1} yOffset={20}>
            <div className="relative aspect-square overflow-hidden rounded-lg bg-white/[0.02] border border-white/10">
              {/* Image vignette overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/40 to-transparent z-10 pointer-events-none"
              />

              {/* Hover wrapper for image zoom */}
              <motion.div
                className="absolute inset-0 overflow-hidden"
                {...(reducedMotion ? {} : hoverScale)}
              >
                <Image
                  src="/lovable-uploads/c9d748bd-f6ea-4f2d-9dab-4b37fb0b3826.png"
                  alt="Cbarrgs with dog"
                  className="absolute inset-0 w-full h-full object-cover"
                  priority={false}
                  placeholderColor="#111111"
                />
              </motion.div>

              {/* Glass card overlay */}
              <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5 z-20">
                <div
                  className="inline-block p-3.5 sm:p-5 rounded-md bg-black/60 border border-white/15"
                  style={{
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
                  }}
                >
                  <h3 className="text-sm sm:text-lg font-serif font-light mb-0.5">Cbarrgs</h3>
                  <p className="text-xs sm:text-sm text-white/60 font-extralight">Artist &middot; Musician &middot; Creator</p>
                </div>
              </div>
            </div>
          </BlurFade>

          {/* Text Column */}
          <div className="space-y-5 sm:space-y-8">
            <BlurFade delay={0.2}>
              <TextReveal
                as="h2"
                className="font-serif text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light tracking-wider"
                staggerDelay={0.02}
              >
                bedroom transmissions: between waves and signals
              </TextReveal>
            </BlurFade>

            <div className="space-y-4 sm:space-y-5">
              {paragraphs.map((paragraph, index) => (
                <BlurFade key={index} delay={0.3 + index * 0.1}>
                  <p className="text-white/60 leading-relaxed font-extralight text-sm sm:text-base">
                    {paragraph}
                  </p>
                </BlurFade>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
