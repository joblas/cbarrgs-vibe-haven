
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { VIDEOS, YOUTUBE_CHANNEL } from '@/utils/constants';
import VideoCard from './VideoCard';
import { fadeIn, slideUp } from '@/utils/transitions';
import { ExternalLink } from 'lucide-react';

const Videos: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2
  });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  return (
    <section id="videos" className="relative py-24 md:py-32 bg-zinc-900">
      <div className="section-container">
        <motion.div ref={ref} initial="initial" animate={controls} variants={fadeIn()} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Visual Experience</span>
          <h2 className="section-title">Music Videos</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore CBARRGS's visual journey through music videos, live performances, and behind-the-scenes content.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-10 items-center mb-16">
          <motion.div 
            initial="initial" 
            animate={controls} 
            variants={fadeIn(0.3)} 
            className="md:w-1/3"
          >
            <img 
              src="/lovable-uploads/d23ed09a-92fd-4d5e-8583-8f03d75f6ff2.png" 
              alt="CBARRGS Character" 
              className="w-full max-w-[300px] mx-auto md:mx-0"
            />
          </motion.div>
          
          <motion.div 
            initial="initial" 
            animate={controls} 
            variants={slideUp(0.4)} 
            className="md:w-2/3 text-left"
          >
            <h3 className="text-2xl font-medium mb-4">Artist's Vision</h3>
            <p className="text-white/80 mb-6">
              Every visual piece in CBARRGS' work is carefully crafted to complement the musical experience. 
              The visuals aim to create a complete artistic expression that resonates with listeners and viewers alike.
            </p>
            <p className="text-white/80">
              From concept to execution, each video tells a story that extends beyond the music, 
              offering a glimpse into the creative universe that inspires CBARRGS.
            </p>
          </motion.div>
        </div>

        <motion.div initial="initial" animate={controls} variants={slideUp(0.3)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {VIDEOS.map((video, index) => (
            <VideoCard 
              key={video.id} 
              title={video.title} 
              thumbnail={video.thumbnail} 
              embedUrl={video.embedUrl} 
              index={index} 
            />
          ))}
        </motion.div>

        <motion.div initial="initial" animate={controls} variants={fadeIn(0.6)} className="mt-12 text-center">
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-white/80 hover:text-white transition-colors duration-300">
            View More Videos on YouTube
            <ExternalLink size={16} className="ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Videos;
