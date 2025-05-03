import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface Section {
  id: string;
  label: string;
}

interface ScrollIndicatorProps {
  sections: Section[];
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ sections }) => {
  const [activeSection, setActiveSection] = useState<string>(sections[0]?.id || '');

  useEffect(() => {
    // Create intersection observers for each section
    const observers: IntersectionObserver[] = [];
    const sectionElements = sections.map(section => 
      document.getElementById(section.id.replace('#', ''))
    ).filter(Boolean) as HTMLElement[];

    // Function to handle intersection
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          setActiveSection('#' + sectionId);
        }
      });
    };

    // Create and setup observers for each section
    sectionElements.forEach(element => {
      const observer = new IntersectionObserver(handleIntersection, {
        rootMargin: '-30% 0px -70% 0px', // Consider section visible when it's in the middle 40% of viewport
        threshold: 0.1
      });
      
      observer.observe(element);
      observers.push(observer);
    });

    // Clean up observers on unmount
    return () => {
      observers.forEach(observer => observer.disconnect());
    };
  }, [sections]);

  const handleDotClick = (sectionId: string) => {
    const element = document.getElementById(sectionId.replace('#', ''));
    if (element) {
      // Smooth scroll to the section
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Only show indicator if we have more than 1 section
  if (sections.length <= 1) return null;

  return (
    <motion.div 
      className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 flex flex-col items-center space-y-4"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 0.6 }}
    >
      {sections.map((section) => (
        <button
          key={section.id}
          onClick={() => handleDotClick(section.id)}
          className="group flex items-center"
          aria-label={`Scroll to ${section.label} section`}
        >
          <span className="hidden group-hover:block mr-2 text-sm font-light text-white/70 transition-all duration-300">
            {section.label}
          </span>
          <motion.div
            className={`w-3 h-3 rounded-full border border-white/50 transition-all duration-300 ${
              activeSection === section.id 
                ? 'bg-white w-4 h-4' 
                : 'bg-transparent hover:bg-white/30'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          />
        </button>
      ))}
    </motion.div>
  );
};

export default ScrollIndicator;
