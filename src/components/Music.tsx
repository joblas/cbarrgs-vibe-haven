
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Music as MusicIcon, ExternalLink } from 'lucide-react';
import { SPOTIFY_URL } from '@/utils/constants';
import { fadeIn, slideUp, staggerContainer, staggerItems } from '@/utils/transitions';

const Music: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  const music = [
    { title: "I'll Be There", year: "2022", type: "Single", link: `${SPOTIFY_URL}/track/6yXsHqcFYn4oXSL8ZlrKBl` },
    { title: "Bit", year: "2022", type: "Single", link: `${SPOTIFY_URL}/track/1Mj7TvOQGT3FDpGj2q2KPR` },
    { title: "Fight", year: "2020", type: "Single", link: `${SPOTIFY_URL}/track/5ZtKUFkEnyURlxP9FSAQNZ` },
    { title: "I'll Stay", year: "2019", type: "Single", link: `${SPOTIFY_URL}/track/1FxoM9gT9bz91GRDZmIGV3` },
    { title: "Fall", year: "2019", type: "Single", link: `${SPOTIFY_URL}/track/3DXRqPY3rPhb9JfzdtDmJt` },
    { title: "You Look Beautiful", year: "2018", type: "Single", link: `${SPOTIFY_URL}/track/1zZHT7WTNkqMHNMhTgPCW5` },
  ];

  return (
    <section id="music" className="relative py-24 md:py-32 bg-gradient-to-b from-black to-zinc-900">
      <div className="section-container">
        <motion.div 
          ref={ref}
          initial="initial"
          animate={controls}
          variants={fadeIn()}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <span className="inline-block text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Discography</span>
          <h2 className="section-title">Listen to the Music</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore CBARRGS's discography — a journey through sound, emotion, and artistic expression. 
            Available on all major streaming platforms.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <motion.div
            initial="initial"
            animate={controls}
            variants={slideUp(0.2)}
            className="col-span-full lg:col-span-2 aspect-[16/9] rounded-sm overflow-hidden relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 transition-opacity duration-500"></div>
            <img
              src="/lovable-uploads/e4194e9c-a20d-4d43-8fe6-8fcccf5f3185.png"
              alt="CBARRGS Album Cover"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <span className="text-sm font-medium text-white/70 block mb-2">Latest Release</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">I'll Be There</h3>
              <p className="text-white/80 mb-4 max-w-md">The latest single from CBARRGS, exploring emotional depth with powerful vocals and captivating instrumentals.</p>
              <a 
                href={SPOTIFY_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center"
              >
                <MusicIcon size={18} className="mr-2" />
                Stream Now on Spotify
              </a>
            </div>
          </motion.div>

          <motion.div
            initial="initial"
            animate={controls}
            variants={staggerContainer}
            className="col-span-full lg:col-span-1 glass-panel rounded-sm p-6 md:p-8"
          >
            <h3 className="text-xl font-display font-bold mb-6">Catalog</h3>
            <div className="space-y-4">
              {music.map((item, i) => (
                <motion.div
                  key={i}
                  variants={staggerItems}
                  custom={i}
                  className="flex items-center justify-between py-3 border-b border-white/10 group hover-grow"
                >
                  <div>
                    <h4 className="font-medium">{item.title}</h4>
                    <div className="flex items-center text-sm text-white/60">
                      <span>{item.year}</span>
                      <span className="mx-2">•</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                  <a 
                    href={item.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <ExternalLink size={18} />
                  </a>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <a 
                href={SPOTIFY_URL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300"
              >
                View Full Discography
                <ExternalLink size={16} className="ml-2" />
              </a>
            </div>
          </motion.div>
        </div>

        <motion.div 
          initial="initial"
          animate={controls}
          variants={fadeIn(0.6)}
          className="mt-20 aspect-[21/9] w-full rounded-sm overflow-hidden"
        >
          <iframe
            src={`https://open.spotify.com/embed/artist/4qRI7BqjuKH3ulYQrEYnLa?utm_source=generator&theme=0`}
            width="100%"
            height="100%"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Player"
            className="bg-transparent"
          ></iframe>
        </motion.div>
      </div>
    </section>
  );
};

export default Music;
