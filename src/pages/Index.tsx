
import React, { useEffect } from 'react';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import Hero from '@/components/Hero';
import LiveShow from '@/components/LiveShow';
import About from '@/components/About';
import ShopComingSoon from '@/components/ShopComingSoon';
import Listen from '@/components/Listen';
import { useReducedMotion } from '@/hooks/useAccessibility';

const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';

    const scrollTarget = localStorage.getItem('scrollTarget');
    if (scrollTarget) {
      localStorage.removeItem('scrollTarget');

      setTimeout(() => {
        const element = document.getElementById(scrollTarget);
        if (element) {
          element.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start'
          });
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

    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {!prefersReducedMotion && <div className="grain-overlay" aria-hidden="true"></div>}

      <SkipToContent />

      <main id="main-content" className="relative" role="main">
        <Hero />
        <LiveShow />
        <Listen />
        <ShopComingSoon />
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
