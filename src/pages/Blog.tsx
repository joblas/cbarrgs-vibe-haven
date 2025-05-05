import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Blog: React.FC = () => {
  // Sample blog posts - in a real implementation, these would come from a CMS or API
  const blogPosts = [
    {
      id: 'behind-the-sound',
      title: 'Behind the Sound: The Making of My Latest EP',
      excerpt: 'A look into the creative process, inspirations, and technical aspects of creating electronic music in Los Angeles.',
      date: 'May 2, 2025',
      category: 'Behind The Scenes',
      image: '/lovable-uploads/blog-studio.jpg',
      slug: 'behind-the-sound'
    },
    {
      id: 'influences-evolution',
      title: 'Influences & Evolution: From Ambient to Electronic',
      excerpt: 'Exploring the journey through different sound textures and how various artists shaped my musical direction.',
      date: 'April 15, 2025',
      category: 'Inspirations',
      image: '/lovable-uploads/blog-influences.jpg',
      slug: 'influences-evolution'
    },
    {
      id: 'studio-techniques',
      title: 'Studio Techniques: Creating Atmospheric Layers',
      excerpt: 'A tutorial on how I approach building rich, textured soundscapes in my production process.',
      date: 'March 28, 2025',
      category: 'Tutorials',
      image: '/lovable-uploads/blog-techniques.jpg',
      slug: 'studio-techniques'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add grain overlay for texture */}
      <div className="grain-overlay"></div>
      
      <SkipToContent />
      <Navigation />
      
      <main id="main-content" className="relative py-20 px-4 md:px-6 lg:px-8 max-w-7xl mx-auto">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-light mb-6">Journal</h1>
          <p className="text-white/80 max-w-2xl">
            Thoughts, insights and stories about music production, creative process, 
            and the electronic music scene in Los Angeles and beyond.
          </p>
        </motion.section>

        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-neutral-900/50 backdrop-blur-sm border border-white/10 rounded-md overflow-hidden flex flex-col h-full"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                  <span className="text-white/50">Image Placeholder</span>
                </div>
              </div>
              
              <div className="p-6 flex-grow flex flex-col">
                <div className="mb-4">
                  <span className="text-sm text-white/60">{post.date}</span>
                  <span className="mx-2 text-white/30">•</span>
                  <span className="text-sm text-white/60">{post.category}</span>
                </div>
                
                <h2 className="text-xl font-light mb-3">{post.title}</h2>
                <p className="text-white/70 text-sm mb-6 flex-grow">{post.excerpt}</p>
                
                <Link 
                  to={`/blog/${post.slug}`} 
                  className="inline-flex items-center text-sm border-b border-white/30 pb-1 hover:border-white/80 transition-colors group"
                  aria-label={`Read more about ${post.title}`}
                >
                  Read more
                  <svg 
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                  >
                    <path 
                      fillRule="evenodd" 
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" 
                      clipRule="evenodd" 
                    />
                  </svg>
                </Link>
              </div>
            </motion.article>
          ))}
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;