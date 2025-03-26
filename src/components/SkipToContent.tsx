
import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <a 
      href="#main-content" 
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 z-[100] focus:outline-none focus:ring-2 focus:ring-white/50 rounded-sm"
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
