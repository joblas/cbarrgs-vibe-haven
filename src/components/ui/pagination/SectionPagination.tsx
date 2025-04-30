import React, { useCallback, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface SectionInfo {
  id: string;
  label: string;
}

interface SectionPaginationProps {
  sections: SectionInfo[];
  activeSection: string;
  onSectionChange: (sectionId: string) => void;
}

/**
 * A responsive vertical section pagination component
 * Provides elegant navigation between full-page sections
 */
const SectionPagination: React.FC<SectionPaginationProps> = ({ 
  sections, 
  activeSection, 
  onSectionChange 
}) => {
  const [isMobile, setIsMobile] = useState(false);
  
  // Check if mobile view based on screen width
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleDotClick = useCallback((sectionId: string) => {
    onSectionChange(sectionId);
    
    // Smooth scroll to section
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
  }, [onSectionChange]);

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2,
        duration: 0.5 
      }
    }
  };
  
  const dotVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1 }
  };

  // Label appears on hover or when active
  const labelVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } }
  };

  return (
    <motion.div 
      className={`fixed z-40 ${isMobile ? 'bottom-6 left-0 right-0' : 'top-1/2 right-6 transform -translate-y-1/2'} pointer-events-none`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      aria-label="Section Navigation"
    >
      <div 
        className={`flex ${isMobile ? 'justify-center items-center space-x-3' : 'flex-col items-end space-y-4'} pointer-events-auto`}
        role="navigation"
        aria-label="Page Sections"
      >
        {sections.map((section) => (
          <motion.div 
            key={section.id}
            className={`flex ${isMobile ? '' : 'items-center'} cursor-pointer group`}
            onClick={() => handleDotClick(section.id)}
            variants={dotVariants}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={`Go to ${section.label} section`}
          >
            {!isMobile && (
              <AnimatePresence>
                <motion.div 
                  className="text-right mr-2 text-white/80 text-sm hidden group-hover:block"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={labelVariants}
                >
                  {section.label}
                </motion.div>
              </AnimatePresence>
            )}
            
            <div 
              className={`relative w-3 h-3 rounded-full transition-all duration-300 ${
                section.id === activeSection 
                  ? 'bg-white scale-[1.15]' 
                  : 'bg-white/50 hover:bg-white/70'
              }`}
            >
              {section.id === activeSection && (
                <motion.div 
                  className="absolute inset-0 rounded-full bg-white/30"
                  initial={{ scale: 1 }}
                  animate={{ 
                    scale: 1.5, 
                    opacity: 0,
                  }}
                  transition={{ 
                    repeat: Infinity, 
                    duration: 1.5, 
                    ease: "easeOut" 
                  }}
                />
              )}
            </div>
            
            {isMobile && section.id === activeSection && (
              <motion.div 
                className="absolute -bottom-5 text-center text-white/80 text-xs"
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {section.label}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SectionPagination;
