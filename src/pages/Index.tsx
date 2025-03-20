import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Music from '@/components/Music';
import Videos from '@/components/Videos';
import Store from '@/components/Store';
import Footer from '@/components/Footer';

const Index: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <main>
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
