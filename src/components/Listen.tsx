import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { prefersReducedMotion } from '@/utils/animations';
import BlurFade from '@/components/ui/blur-fade';
import TextReveal from '@/components/ui/text-reveal';

const Listen: React.FC = () => {
  const reducedMotion = prefersReducedMotion();

  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '200px',
    triggerOnce: true
  });

  return (
    <section
      id="listen-section"
      className="relative py-16 sm:py-20 md:py-32 bg-black overflow-hidden scroll-mt-20"
    >
      {/* Ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[600px] h-[400px] sm:h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse, rgba(30, 215, 96, 0.04) 0%, rgba(30, 215, 96, 0.01) 30%, transparent 55%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="flex flex-col items-center">
          <BlurFade delay={0.1}>
            <TextReveal
              as="h2"
              className="font-serif text-2xl sm:text-3xl md:text-4xl mb-6 sm:mb-10 font-light tracking-wider text-center"
            >
              Listen
            </TextReveal>
          </BlurFade>

          {/* Spotify Embed Container */}
          <BlurFade delay={0.2} className="w-full">
            <div
              ref={containerRef as React.RefObject<HTMLDivElement>}
              className="w-full p-3 sm:p-4 rounded-lg bg-white/[0.03] border border-white/10"
              style={{
                boxShadow: '0 0 40px rgba(30, 215, 96, 0.05), 0 10px 40px rgba(0, 0, 0, 0.3)',
              }}
            >
              {isVisible ? (
                <motion.div
                  initial={reducedMotion ? {} : { opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <iframe
                    style={{ borderRadius: '8px' }}
                    src="https://open.spotify.com/embed/artist/4qRI7BqjuKH3ulYQrEYnLa?utm_source=generator&theme=0"
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title="Cbarrgs Spotify Profile - Listen to tracks and albums"
                    aria-label="Embedded Spotify player showing Cbarrgs music catalog"
                  >
                    <p>
                      <a href="https://open.spotify.com/artist/4qRI7BqjuKH3ulYQrEYnLa" target="_blank" rel="noopener noreferrer">
                        Listen to Cbarrgs on Spotify
                      </a>
                    </p>
                  </iframe>
                </motion.div>
              ) : (
                <div className="w-full h-[352px] flex items-center justify-center bg-neutral-900/50 rounded-lg">
                  <motion.div
                    className="flex flex-col items-center"
                    animate={reducedMotion ? {} : { opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-10 h-10 sm:w-12 sm:h-12 text-[#1DB954] mb-4" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                    </svg>
                    <p className="text-white/50 text-sm font-extralight">Loading Spotify...</p>
                  </motion.div>
                </div>
              )}
            </div>
          </BlurFade>
        </div>
      </div>
    </section>
  );
};

export default Listen;
