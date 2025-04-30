import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { VIDEOS, YOUTUBE_CHANNEL } from '@/utils/constants';
import VideoCard from './VideoCard';
import { fadeIn, slideUp } from '@/utils/transitions';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const Videos: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: false,
    amount: 0.2
  });
  const controls = useAnimation();
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  useEffect(() => {
    if (isInView) {
      controls.start('animate');
    }
  }, [controls, isInView]);

  const nextVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === VIDEOS.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? VIDEOS.length - 1 : prevIndex - 1
    );
  };

  const currentVideo = VIDEOS[currentVideoIndex];

  return (
    <section id="videos" className="relative py-24 md:py-32 bg-zinc-900">
      <div className="section-container">
        <motion.div ref={ref} initial="initial" animate={controls} variants={fadeIn()} className="text-center max-w-3xl mx-auto mb-16">
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
            <p className="text-white/80">
              I try to make videos that add something extra to the music. It's all about telling a story and giving you a glimpse into what the song means to me. Even if it's just a simple video, I want it to help you connect with the music on a deeper level.
            </p>
          </motion.div>
        </div>

        <motion.div 
          initial="initial" 
          animate={controls} 
          variants={slideUp(0.3)} 
          className="relative max-w-4xl mx-auto"
        >
          <div className="aspect-video bg-zinc-950 rounded-md overflow-hidden shadow-lg">
            <VideoCard 
              key={currentVideo.id} 
              title={currentVideo.title} 
              thumbnail={currentVideo.thumbnail} 
              embedUrl={currentVideo.embedUrl} 
              index={0} 
            />
          </div>
          
          <div className="flex justify-between mt-4">
            <div className="flex items-center gap-2">
              <Button 
                onClick={prevVideo} 
                variant="outline" 
                size="icon"
                className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
              >
                <ChevronLeft size={24} />
                <span className="sr-only">Previous video</span>
              </Button>
              
              <span className="text-white/70 text-sm">
                {currentVideoIndex + 1} / {VIDEOS.length}
              </span>
              
              <Button 
                onClick={nextVideo} 
                variant="outline" 
                size="icon"
                className="bg-zinc-800 hover:bg-zinc-700 border-zinc-700"
              >
                <ChevronRight size={24} />
                <span className="sr-only">Next video</span>
              </Button>
            </div>
            
            <h3 className="text-lg font-medium flex-1 text-center line-clamp-1 px-4">
              {currentVideo.title}
            </h3>
          </div>
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
