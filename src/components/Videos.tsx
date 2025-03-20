
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
