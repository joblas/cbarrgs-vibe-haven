
import React, { useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ShopComingSoon from '@/components/ShopComingSoon';
import Listen from '@/components/Listen';
import { useReducedMotion } from '@/hooks/useAccessibility';

const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();
  
  useEffect(() => {
    // Smooth scroll behavior for the entire page (respect user preferences)
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    
    // Check if there's a scroll target in localStorage
    const scrollTarget = localStorage.getItem('scrollTarget');
    if (scrollTarget) {
      // Clear it immediately to prevent future unwanted scrolls
      localStorage.removeItem('scrollTarget');
      
      // Give the page a moment to render before scrolling
      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({ 
            behavior: prefersReducedMotion ? 'auto' : 'smooth', 
            block: 'start' 
          });
          // Announce navigation for screen readers
          const sectionName = scrollTarget.replace('-', ' ');
          const announcement = document.createElement('div');
          announcement.setAttribute('aria-live', 'polite');
          announcement.setAttribute('class', 'sr-only');
          announcement.textContent = `Navigated to ${sectionName} section`;
          document.body.appendChild(announcement);
          setTimeout(() => document.body.removeChild(announcement), 1000);
        }
      }, 100);
    }
    
    // Clean up
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add grain overlay for texture (respect motion preferences) */}
      {!prefersReducedMotion && <div className="grain-overlay" aria-hidden="true"></div>}
      
      <SkipToContent />
      <Navigation />
      
      <main id="main-content" className="relative" role="main">
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
