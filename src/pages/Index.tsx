
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '@/components/Footer';
import SkipToContent from '@/components/SkipToContent';
import Hero from '@/components/Hero';
import About from '@/components/About';
import ShopComingSoon from '@/components/ShopComingSoon';
import Listen from '@/components/Listen';
import ScrollProgress from '@/components/ui/scroll-progress';
import { useReducedMotion } from '@/hooks/useAccessibility';

const Index: React.FC = () => {
  const prefersReducedMotion = useReducedMotion();

  const { hash } = useLocation();

  useEffect(() => {
    document.documentElement.style.scrollBehavior = prefersReducedMotion ? 'auto' : 'smooth';
    return () => {
      document.documentElement.style.scrollBehavior = '';
    };
  }, [prefersReducedMotion]);

  // Links from other pages arrive as /#section. The browser's own jump runs
  // before React renders the sections, so scroll once they exist.
  useEffect(() => {
    if (!hash) return;
    const timer = window.setTimeout(() => {
      document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView({
        behavior: prefersReducedMotion ? 'auto' : 'smooth',
        block: 'start',
      });
    }, 100);
    return () => window.clearTimeout(timer);
  }, [hash, prefersReducedMotion]);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {!prefersReducedMotion && <div className="grain-overlay" aria-hidden="true"></div>}
      {!prefersReducedMotion && <ScrollProgress />}

      <SkipToContent />

      <main id="main-content" className="relative" role="main">
        <Hero />
        <Listen />
        <ShopComingSoon />
        <About />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
