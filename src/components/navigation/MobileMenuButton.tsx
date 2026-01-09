
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import { useReducedMotion } from '@/hooks/useAccessibility';

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, toggleMenu }) => {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = prefersReducedMotion ? {} : fadeIn(0.4);

  // Animated hamburger line variants
  const lineVariants = {
    closed: { rotate: 0, y: 0 },
    open: (custom: number) => {
      if (custom === 0) return { rotate: 45, y: 6 };
      if (custom === 1) return { opacity: 0, x: -10 };
      return { rotate: -45, y: -6 };
    }
  };

  const lineTransition = prefersReducedMotion
    ? { duration: 0 }
    : { duration: 0.3, ease: [0.4, 0, 0.2, 1] };

  return (
    <motion.button
      className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 p-3 rounded-sm bg-white/10 hover:bg-white/20 active:bg-white/30 transition-colors min-h-[48px] min-w-[48px] flex items-center justify-center"
      onClick={toggleMenu}
      {...motionProps}
      whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      type="button"
    >
      <div className="w-6 h-5 flex flex-col justify-between items-center">
        {/* Top line */}
        <motion.span
          className="w-6 h-0.5 bg-white rounded-full origin-center"
          custom={0}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={lineTransition}
        />
        {/* Middle line */}
        <motion.span
          className="w-6 h-0.5 bg-white rounded-full"
          custom={1}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={lineTransition}
          style={{ opacity: isOpen ? 0 : 1 }}
        />
        {/* Bottom line */}
        <motion.span
          className="w-6 h-0.5 bg-white rounded-full origin-center"
          custom={2}
          variants={lineVariants}
          animate={isOpen ? "open" : "closed"}
          transition={lineTransition}
        />
      </div>
    </motion.button>
  );
};

export default MobileMenuButton;
