
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { fadeIn } from '@/utils/transitions';
import { useReducedMotion } from '@/hooks/useAccessibility';

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, toggleMenu }) => {
  const prefersReducedMotion = useReducedMotion();
  const motionProps = prefersReducedMotion ? {} : fadeIn(0.4);

  return (
    <motion.button
      className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 p-3 rounded-sm bg-white/10 hover:bg-white/20 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
      onClick={toggleMenu}
      {...motionProps}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
      type="button"
    >
      {isOpen ? (
        <X size={24} aria-hidden="true" />
      ) : (
        <Menu size={24} aria-hidden="true" />
      )}
    </motion.button>
  );
};

export default MobileMenuButton;
