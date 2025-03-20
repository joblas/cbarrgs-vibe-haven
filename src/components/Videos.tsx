import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { VIDEOS, YOUTUBE_CHANNEL } from '@/utils/constants';
import { fadeIn, slideUp } from '@/utils/transitions';
import { ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

// Video Card Component
const VideoCard: React.FC<{ video: typeof VIDEOS[0], isActive: boolean, onClick: () => void }> = ({ 
  video, isActive, onClick 
}) => (
  <div 
    className={`cursor-pointer rounded-md overflow-hidden transition-all duration-300 ${
      isActive ? 'ring-2 ring-orange-500' : 'opacity-70 hover:opacity-100'
    }`}
    onClick={onClick}
  >
    <div className="relative aspect-video">
      <img 
        src={video.thumbnail} 
        alt={video.title} 
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
        <div className="p-3">
          <h3 className="text-sm font-medium text-white">{video.title}</h3>
        </div>
      </div>
    </div>
  </div>
);

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
      <div className="container mx-auto px-4">
        <motion.div ref={ref} initial="initial" animate={controls} variants={fadeIn()} className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-sm font-medium text-white/60 uppercase tracking-wider mb-4">Visual Experience</span>
          <h2 className="text-4xl font-bold mb-6">Music Videos</h2>
          <p className="text-white/70 max-w-2xl mx-auto">
            Explore CBARRGS's visual journey through music videos, live performances, and behind-the-scenes content.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-10 items-center mb-16">
          <motion.div 
            className="lg:w-2/3 w-full aspect-video rounded-lg overflow-hidden"
            variants={slideUp(0.2)}
            initial="initial"
            animate={controls}
          >
            <iframe
              src={`${currentVideo.embedUrl}?autoplay=0&rel=0`}
              title={currentVideo.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </motion.div>

          <motion.div 
            className="lg:w-1/3 w-full"
            variants={slideUp(0.4)}
            initial="initial"
            animate={controls}
          >
            <div className="bg-zinc-800/50 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-2xl font-bold mb-3">{currentVideo.title}</h3>
              <p className="text-white/70 mb-6">
                Official music video by CBARRGS.
              </p>
              
              <div className="flex space-x-3 mb-6">
                <Button 
                  onClick={prevVideo} 
                  variant="outline" 
                  size="icon"
                  className="hover:bg-orange-500/20 border-white/20"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button 
                  onClick={nextVideo} 
                  variant="outline" 
                  size="icon"
                  className="hover:bg-orange-500/20 border-white/20"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              
              <a 
                href={YOUTUBE_CHANNEL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-orange-500 hover:text-orange-400 transition-colors"
              >
                View on YouTube <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3"
          variants={fadeIn(0.6)}
          initial="initial"
          animate={controls}
        >
          {VIDEOS.map((video, index) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              isActive={index === currentVideoIndex}
              onClick={() => setCurrentVideoIndex(index)}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Videos;
