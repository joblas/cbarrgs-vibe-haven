import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Section from '@/components/Section';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Music from '@/components/Music';
import Videos from '@/components/Videos';
import Store from '@/components/Store';

const Index: React.FC = () => {
  console.log("Index component rendering");
  
  useEffect(() => {
    // Check if there's a scroll target in localStorage
    const scrollTarget = localStorage.getItem('scrollTarget');
    if (scrollTarget) {
      // Clear it immediately to prevent future unwanted scrolls
      localStorage.removeItem('scrollTarget');
      
      // Give the page a moment to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <SkipToContent />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Music />
        <Videos />
        <Store />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
