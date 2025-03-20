import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navigation from '@/components/Navigation';
import SimpleHero from '@/components/SimpleHero'; 
import About from '@/components/About';
import Music from '@/components/Music';
import Videos from '@/components/Videos';
import Store from '@/components/Store';
import Footer from '@/components/Footer';

// Needed for Framer Motion
import { fadeIn } from '@/utils/transitions';

// Add dependency
import 'framer-motion';

const Index: React.FC = () => {
  // Intersection Observer setup for fade-in sections
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      });
    }, observerOptions);

    const fadeElems = document.querySelectorAll('.fade-in-section');
    fadeElems.forEach(elem => observer.observe(elem));

    return () => {
      fadeElems.forEach(elem => observer.unobserve(elem));
    };
  }, []);

  // Smooth scrolling for anchor links
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a[href^="#"]');
      
      if (anchor) {
        e.preventDefault();
        const targetId = anchor.getAttribute('href');
        
        if (targetId) {
          const targetElement = document.querySelector(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({
              behavior: 'smooth'
            });
          }
        }
      }
    };

    document.body.addEventListener('click', handleAnchorClick);
    
    return () => {
      document.body.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div 
        initial="initial"
        animate="animate"
        exit="exit"
        variants={fadeIn()}
        className="min-h-screen"
      >
        <Navigation />
        <main>
          <SimpleHero />
          <About />
          <Music />
          <Videos />
          <Store />
        </main>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
};

export default Index;
