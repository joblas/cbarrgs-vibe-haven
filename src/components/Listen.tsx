
import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Listen: React.FC = () => {
  const [containerRef, isVisible] = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
    triggerOnce: true
  });

  return (
    <section 
      id="listen-section" 
      className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto scroll-mt-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl mb-12 font-extralight tracking-wider text-center">Listen</h2>
        
        <div 
          ref={containerRef as React.RefObject<HTMLDivElement>}
          className="w-full max-w-3xl mx-auto bg-neutral-900/50 p-4 rounded-md backdrop-blur-sm border border-white/10 shadow-lg"
        >
          {/* Only load the iframe when it's near the viewport */}
          {isVisible ? (
            <iframe 
              style={{borderRadius:"12px"}} 
              src="https://open.spotify.com/embed/artist/4qRI7BqjuKH3ulYQrEYnLa?utm_source=generator" 
              width="100%" 
              height="352" 
              frameBorder="0" 
              allowFullScreen 
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
              loading="lazy"
              title="Cbarrgs Spotify Profile"
              aria-label="Cbarrgs music on Spotify"
            />
          ) : (
            <div className="w-full h-[352px] flex items-center justify-center bg-neutral-900/80 rounded-md">
              <div className="animate-pulse flex flex-col items-center">
                <svg className="w-12 h-12 text-green-500 mb-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
                </svg>
                <p className="text-white/70">Loading Spotify...</p>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default Listen;
