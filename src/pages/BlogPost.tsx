import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import { motion } from 'framer-motion';

// Sample blog post data - in a real implementation, this would come from a CMS or API
const blogPostsData = {
  'behind-the-sound': {
    title: 'Behind the Sound: The Making of My Latest EP',
    date: 'May 2, 2025',
    author: 'Cbarrgs',
    category: 'Behind The Scenes',
    heroImage: '/lovable-uploads/blog-studio.jpg',
    content: `
      <h2>Finding Inspiration in the City</h2>
      <p>The journey of creating my latest EP "Digital Solitude" began during late-night walks through Los Angeles. The contrast between the empty streets and distant sounds of the city created a sonic landscape in my mind that I needed to capture.</p>
      
      <p>While my previous work often explored more ambient textures, this project embraced the pulse of urban life while maintaining that sense of isolation that has become central to my sound. Each track evolved from field recordings captured throughout the city.</p>
      
      <h2>The Production Process</h2>
      <p>Working primarily with modular synthesis and digital processing, I built each track layer by layer in my East LA studio. The central theme became the dialogue between precise, digital elements and more organic, imperfect textures.</p>
      
      <p>For "Wavelength" — the opening track — I processed recordings of power lines humming outside my window, transforming them into rhythmic elements that pulse beneath warm synth pads. This technique of finding musicality in everyday sounds became the foundation of the entire EP.</p>
      
      <h2>Collaborations and Growth</h2>
      <p>I was fortunate to collaborate with visual artist Maya Chen for this release. Her projection mapping added an entirely new dimension to the music when we performed it live at The Echo last month. The visual interpretation of sound created a feedback loop that has already influenced how I'm approaching my next project.</p>
      
      <p>Each release is a learning experience, pushing me to evolve technically and creatively. What began as bedroom experiments has grown into a fully realized artistic expression, yet I try to maintain that sense of intimate exploration with each new track.</p>
      
      <h2>Looking Forward</h2>
      <p>As I prepare to take this material on tour across the West Coast, I'm already collecting new sounds and inspirations. The boundary between creation and performance has become increasingly blurred, with live sets becoming laboratories for new ideas.</p>
      
      <p>I'm deeply grateful to everyone who has supported this project. Music exists in the space between creator and listener, and that connection makes all the late studio nights worthwhile.</p>
    `,
    relatedPosts: ['influences-evolution', 'studio-techniques']
  },
  'influences-evolution': {
    title: 'Influences & Evolution: From Ambient to Electronic',
    date: 'April 15, 2025',
    author: 'Cbarrgs',
    category: 'Inspirations',
    heroImage: '/lovable-uploads/blog-influences.jpg',
    content: `
      <h2>Early Influences</h2>
      <p>My journey into electronic music began with artists who blended ambient textures with more structured elements. Brian Eno's "Music for Airports" showed me that electronic music could create environments rather than just tracks, while Boards of Canada demonstrated how nostalgic warmth could coexist with digital precision.</p>
      
      <p>Growing up in Los Angeles, I was equally drawn to the experimental electronic scene and the more beat-driven underground clubs. This tension between atmospheric soundscapes and rhythmic structures has defined my approach to production.</p>
      
      <h2>Pivotal Moments</h2>
      <p>Hearing Burial's "Untrue" for the first time was a revelation — here was music that felt deeply human despite its electronic construction. The imperfections and emotional weight of those tracks inspired me to focus on feeling rather than technical perfection.</p>
      
      <p>Another turning point came when I discovered the work of Caterina Barbieri. Her approach to modular synthesis as a means of building evolving, emotional compositions opened new possibilities in how I structured my own work.</p>
      
      <h2>Evolution of Sound</h2>
      <p>My earliest releases were primarily ambient pieces, focusing on texture and atmosphere with minimal rhythmic elements. As I've grown as an artist, I've incorporated more structured beats while maintaining that atmospheric foundation.</p>
      
      <p>The Los Angeles electronic scene has profoundly shaped this evolution. Collaborating with other local artists exposed me to new production techniques and approaches to composition that pushed me beyond my comfort zone.</p>
      
      <h2>Current Direction</h2>
      <p>My recent work has been exploring the intersection between electronic production and more organic sound sources. Field recordings, found sounds, and acoustic instruments processed through digital means have created a hybrid approach that feels more personal and distinctive.</p>
      
      <p>I'm increasingly interested in music that exists between established genres — neither purely ambient nor strictly dance-oriented, but something that captures the complexity of modern experience in urban environments like Los Angeles.</p>
    `,
    relatedPosts: ['behind-the-sound', 'studio-techniques']
  },
  'studio-techniques': {
    title: 'Studio Techniques: Creating Atmospheric Layers',
    date: 'March 28, 2025',
    author: 'Cbarrgs',
    category: 'Tutorials',
    heroImage: '/lovable-uploads/blog-techniques.jpg',
    content: `
      <h2>Building the Foundation</h2>
      <p>When creating atmospheric electronic music, I often begin with a bed of ambient texture rather than a beat or melody. This approach helps establish the emotional tone of the piece before adding structural elements.</p>
      
      <p>One technique I frequently use is capturing long samples of environmental sounds — from air conditioners to distant traffic — and then heavily processing them through granular synthesis. This creates unique textures that retain a subtle organic quality while becoming something entirely new.</p>
      
      <h2>Creating Movement</h2>
      <p>Static ambient layers can quickly become background noise, so introducing subtle movement is essential. I use LFOs (Low-Frequency Oscillators) to gently modulate filters, panning, and other parameters over long periods, creating a sense of breathing or natural evolution in the sound.</p>
      
      <p>Another effective approach is using sidechain compression triggered by nearly-inaudible pulse tracks. This creates ghost rhythms and subtle pulsations that give life to otherwise static atmospheres without introducing obvious beats.</p>
      
      <h2>Depth and Dimension</h2>
      <p>Creating a sense of three-dimensional space in electronic music requires careful attention to the frequency spectrum and reverb treatments. I often use multiple reverbs with different characteristics — a short, dense reverb for proximity and a long, spacious one for depth.</p>
      
      <p>Frequency management is crucial: lower frequencies tend to feel closer to the listener, while higher, airier elements create distance. By balancing these elements and automating their relationships throughout a track, you can create a sense of movement through an imaginary landscape.</p>
      
      <h2>Emotional Resonance</h2>
      <p>Technical aspects aside, the most important element is emotional authenticity. I always ask myself what feeling I'm trying to capture and let that guide my production decisions rather than following trends or technical formulas.</p>
      
      <p>Sometimes the imperfect take has more emotional power than the technically precise one. I often preserve artifacts, background noise, or happy accidents that might traditionally be cleaned up because they add character and human touch to electronic compositions.</p>
      
      <h2>Hardware vs. Software</h2>
      <p>While software offers incredible flexibility, I find that hardware synthesizers and effects processors introduce beneficial limitations and unique characteristics. My approach combines both: generating raw material with hardware then arranging and refining in the digital domain.</p>
      
      <p>This hybrid workflow combines the warmth and unpredictability of analog with the precision and flexibility of digital — much like the contrast between organic and technological that inspires my music conceptually.</p>
    `,
    relatedPosts: ['behind-the-sound', 'influences-evolution']
  }
};

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? blogPostsData[slug as keyof typeof blogPostsData] : null;
  
  if (!post) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl mb-4">Post Not Found</h1>
          <p className="mb-6">The blog post you're looking for doesn't exist.</p>
          <Link to="/blog" className="inline-block px-6 py-2 border border-white/30 hover:border-white transition-colors">
            Return to Blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add grain overlay for texture */}
      <div className="grain-overlay"></div>
      
      <SkipToContent />
      <Navigation />
      
      <main id="main-content" className="relative py-20 px-4 md:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <div className="max-w-3xl mx-auto mb-10">
          <div className="text-sm text-white/60 mb-1">
            <Link to="/" className="hover:text-white transition-colors">Home</Link> &raquo; 
            <Link to="/blog" className="hover:text-white transition-colors mx-2">Blog</Link> &raquo; 
            <span className="text-white/80">{post.title}</span>
          </div>
        </div>
        
        <article className="max-w-3xl mx-auto">
          <motion.header
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="mb-6">
              <span className="text-sm text-white/60">{post.date}</span>
              <span className="mx-2 text-white/30">•</span>
              <span className="text-sm text-white/60">{post.category}</span>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-light mb-8">{post.title}</h1>
            
            <div className="relative aspect-video overflow-hidden mb-8 rounded-sm">
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                <span className="text-white/50">Hero Image Placeholder</span>
              </div>
            </div>
          </motion.header>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="blog-content prose prose-invert prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-16 pt-8 border-t border-white/10"
          >
            <h2 className="text-xl font-light mb-6">Related Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {post.relatedPosts.map((relatedSlug) => {
                const relatedPost = blogPostsData[relatedSlug as keyof typeof blogPostsData];
                return (
                  <Link 
                    key={relatedSlug} 
                    to={`/blog/${relatedSlug}`}
                    className="bg-neutral-900/50 p-5 rounded-sm border border-white/10 hover:border-white/30 transition-colors"
                  >
                    <div className="text-sm text-white/60 mb-2">{relatedPost.category}</div>
                    <h3 className="text-lg font-light mb-2">{relatedPost.title}</h3>
                    <div className="text-sm text-white/40">{relatedPost.date}</div>
                  </Link>
                );
              })}
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 text-center"
          >
            <Link 
              to="/blog" 
              className="inline-flex items-center text-white/80 hover:text-white transition-colors"
            >
              <svg 
                className="mr-2 w-4 h-4" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" 
                  clipRule="evenodd" 
                />
              </svg>
              Back to all posts
            </Link>
          </motion.div>
        </article>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPost;
