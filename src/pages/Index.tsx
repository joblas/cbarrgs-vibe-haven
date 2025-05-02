import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ShopComingSoon from '@/components/ShopComingSoon';
import Listen from '@/components/Listen';
import ShowBanner from '@/components/ShowBanner';

const Index: React.FC = () => {
  
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
      {/* Add grain overlay for texture */}
      <div className="grain-overlay"></div>
      
      <ShowBanner />
      <SkipToContent />
      <Navigation />
      <main id="main-content">
        <Hero />
        <About />
        <Listen />
        <ShopComingSoon />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
