
import React from 'react';

const SkipToContent: React.FC = () => {
  return (
    <div className="sr-only focus-within:not-sr-only">
      <a 
        href="#main-content" 
        className="focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-white text-black px-4 py-2 z-[100] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm font-medium"
      >
        Skip to main content
      </a>
      <a 
        href="#navigation" 
        className="focus:not-sr-only focus:absolute focus:top-4 focus:left-40 bg-white text-black px-4 py-2 z-[100] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm font-medium"
      >
        Skip to navigation
      </a>
      <a 
        href="#about" 
        className="focus:not-sr-only focus:absolute focus:top-4 focus:left-80 bg-white text-black px-4 py-2 z-[100] focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 rounded-sm font-medium"
      >
        Skip to about section
      </a>
    </div>
  );
};

export default SkipToContent;
