import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ShopComingSoon from '@/components/ShopComingSoon';
import Listen from '@/components/Listen';
import ScrollIndicator from '@/components/ScrollIndicator';

// Define sections for the ScrollIndicator
const sections = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'listen-section', label: 'Listen' },
  { id: 'shop-coming-soon', label: 'Shop' }
];

const Index: React.FC = () => {
  
  useEffect(() => {
    // Smooth scroll behavior for the entire page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    // Check if there's a scroll target in localStorage
    const scrollTarget = localStorage.getItem('scrollTarget');
    if (scrollTarget) {
      // Clear it immediately to prevent future unwanted scrolls
      localStorage.removeItem('scrollTarget');
      
      // Give the page a moment to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add grain overlay for texture */}
      <div className="grain-overlay"></div>
      
      <SkipToContent />
      <Navigation />
      {/* Add the scroll indicator component */}
      <ScrollIndicator sections={sections.map(section => ({ ...section, id: `#${section.id}` }))} />
      
      <main id="main-content" className="relative">
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
