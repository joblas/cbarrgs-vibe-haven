import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Section from '@/components/Section';
import SpotifyEmbed from '@/components/ui/SpotifyEmbed';
import OptimizedImage from '@/components/ui/OptimizedImage';
import Spotify from '@/components/icons/Spotify';
import { SPOTIFY_URL } from '@/utils/constants';

interface MusicProps {
  onSectionVisible?: (id: string, visible: boolean) => void;
}

/**
 * Music section with:
 * - Optimized Spotify embeds with lazy loading
 * - Staggered animation for cards
 * - Responsive grid layout
 */
const Music: React.FC<MusicProps> = ({ onSectionVisible }) => {
  // Music catalog with Spotify embed IDs
  const music = [
    { 
      title: "I'll Be There", 
      year: "2022", 
      type: "Single", 
      link: `${SPOTIFY_URL}/track/1cXUTrCJkQQ7kGnlGW5WVL`,
      embedId: "1cXUTrCJkQQ7kGnlGW5WVL"
    },
    { 
      title: "Bit", 
      year: "2022", 
      type: "Single", 
      link: `${SPOTIFY_URL}/track/0Wd0ZVtRFSLwOEVkpxYQkp`,
      embedId: "0Wd0ZVtRFSLwOEVkpxYQkp"
    },
    { 
      title: "Fight", 
      year: "2020", 
      type: "Single", 
      link: `${SPOTIFY_URL}/track/3xT7tYjeVOx5SflV1Cm17v`,
      embedId: "3xT7tYjeVOx5SflV1Cm17v"
    },
    { 
      title: "I'll Stay", 
      year: "2019", 
      type: "Single", 
      link: `${SPOTIFY_URL}/track/3eFsLqXQMBieuBPCDQlmrC`,
      embedId: "3eFsLqXQMBieuBPCDQlmrC"
    },
    { 
      title: "Fall", 
      year: "2019", 
      type: "Single", 
      link: `${SPOTIFY_URL}/track/6Gg7qEhbZFTQQEQBhCt7BX`,
      embedId: "6Gg7qEhbZFTQQEQBhCt7BX"
    },
    { 
      title: "You Look Beautiful", 
      year: "2018", 
      type: "Single", 
      link: `${SPOTIFY_URL}/track/5cs2nvgUZdmqNbcobNZvMD`,
      embedId: "5cs2nvgUZdmqNbcobNZvMD"
    },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  return (
    <Section
      id="music"
      fullScreen
      className="flex items-center py-24 md:py-32 bg-gradient-to-b from-black to-zinc-900"
      onSectionVisible={onSectionVisible}
    >
      <div className="section-container">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.3 }}
        >
          <motion.h2 
            className="section-title"
            variants={itemVariants}
          >
            Listen to the Music
          </motion.h2>
          
          <motion.p 
            className="text-white/70 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Explore CBARRGS's discography — a journey through sound, emotion, and artistic expression. 
            Available on all major streaming platforms.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Featured release - takes up more space */}
          <motion.div
            className="col-span-full lg:col-span-2 aspect-[16/9] rounded-sm overflow-hidden relative group"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent z-10 transition-opacity duration-500"></div>
            <OptimizedImage
              src="/lovable-uploads/e4194e9c-a20d-4d43-8fe6-8fcccf5f3185.png"
              alt="CBARRGS Album Cover - I'll Be There"
              width={1200}
              height={675}
              className="absolute inset-0 w-full h-full transition-transform duration-700 group-hover:scale-105"
              objectFit="cover"
            />
            <div className="absolute bottom-0 left-0 p-6 z-20">
              <span className="text-sm font-medium text-white/70 block mb-2">Latest Release</span>
              <h3 className="text-2xl md:text-3xl font-display font-bold mb-2">I'll Be There</h3>
              <p className="text-white/80 mb-4 max-w-md">The latest single from CBARRGS, exploring emotional depth with powerful vocals and captivating instrumentals.</p>
              <a 
                href="https://open.spotify.com/artist/4qRI7BqjuKH3ulYQrEYnLa" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-2 text-white bg-[#1DB954] px-4 py-2 rounded-sm transition-transform hover:scale-[1.02] active:scale-[0.98]"
                aria-label="Listen on Spotify"
              >
                <Spotify className="w-5 h-5" />
                <span>Listen on Spotify</span>
              </a>
            </div>
          </motion.div>

          {/* Main Spotify embed */}
          <motion.div
            className="col-span-full rounded-sm overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          >
            <SpotifyEmbed
              spotifyId="4qRI7BqjuKH3ulYQrEYnLa"
              type="artist"
              height={380}
              className="w-full glass-panel p-4"
            />
          </motion.div>

          {/* Track list grid with lazy-loaded Spotify embeds */}
          <motion.div 
            className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.1 }}
          >
            {music.map((track, index) => (
              <motion.div
                key={track.embedId}
                className="glass-panel p-4 rounded-sm transition-transform hover:scale-[1.02]"
                variants={itemVariants}
                custom={index}
              >
                <h3 className="text-xl font-semibold mb-2">{track.title}</h3>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-white/70">{track.type} • {track.year}</span>
                  <a 
                    href={track.link} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/80 hover:text-white flex items-center space-x-1 text-sm"
                    aria-label={`Listen to ${track.title} on Spotify`}
                  >
                    <span>Listen</span>
                    <ExternalLink size={14} />
                  </a>
                </div>
                
                <SpotifyEmbed
                  spotifyId={track.embedId}
                  type="track"
                  height={80}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </Section>
  );
};

export default Music;
