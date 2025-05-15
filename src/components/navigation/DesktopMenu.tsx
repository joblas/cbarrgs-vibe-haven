
import React from 'react';
import { motion } from 'framer-motion';
import { slideDown } from '@/utils/transitions';
import { NavItem } from '@/types/navigation';

interface DesktopMenuProps {
  navItems: NavItem[];
  handleNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const DesktopMenu: React.FC<DesktopMenuProps> = ({ navItems, handleNavItemClick }) => {
  return (
    <motion.div 
      className="hidden md:flex space-x-8 items-center"
      {...slideDown(0.2)}
      role="menubar"
      aria-label="Desktop menu"
    >
      {navItems.map((item, i) => (
        <a 
          key={i} 
          href={item.href} 
          className="nav-link font-light tracking-wider"
          role="menuitem"
          onClick={(e) => handleNavItemClick(e, item.href)}
        >
          {item.name}
        </a>
      ))}
    </motion.div>
  );
};

export default DesktopMenu;
