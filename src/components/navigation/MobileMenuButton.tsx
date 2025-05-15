
import React from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { fadeIn } from '@/utils/transitions';

interface MobileMenuButtonProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenuButton: React.FC<MobileMenuButtonProps> = ({ isOpen, toggleMenu }) => {
  return (
    <motion.button
      className="md:hidden text-white focus:outline-none focus:ring-2 focus:ring-white/50 p-2 rounded-sm"
      onClick={toggleMenu}
      {...fadeIn(0.4)}
      aria-expanded={isOpen}
      aria-controls="mobile-menu"
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      {isOpen ? <X size={24} aria-hidden="true" /> : <Menu size={24} aria-hidden="true" />}
    </motion.button>
  );
};

export default MobileMenuButton;
