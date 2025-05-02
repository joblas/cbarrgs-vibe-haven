import React from 'react';
import { motion } from 'framer-motion';

const Listen: React.FC = () => {
  return (
    <section id="listen" className="py-24 px-4 md:px-8 lg:px-16 max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="flex flex-col items-center"
      >
        <h2 className="text-3xl md:text-4xl mb-12 font-extralight tracking-wider text-center">Listen</h2>
        
        <div className="w-full max-w-3xl mx-auto bg-neutral-900/50 p-4 rounded-md backdrop-blur-sm border border-white/10 shadow-lg">
          {/* Spotify Embed - Artist Profile */}
          <iframe 
            style={{borderRadius:"12px"}} 
            src="https://open.spotify.com/embed/artist/4qRI7BqjuKH3ulYQrEYnLa?utm_source=generator" 
            width="100%" 
            height="352" 
            frameBorder="0" 
            allowFullScreen 
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" 
            loading="lazy"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Listen;
