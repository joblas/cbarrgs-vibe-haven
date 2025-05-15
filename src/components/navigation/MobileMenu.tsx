
import React from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { NavItem } from '@/types/navigation';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  handleNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, handleNavItemClick }) => {
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.6,
        ease: [0.45, 0, 0.55, 1]
      }
    },
    open: {
      opacity: 1,
      height: "100vh",
      transition: {
        duration: 0.6,
        ease: [0.45, 0, 0.55, 1]
      }
    }
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.8,
        ease: [0.45, 0, 0.55, 1]
      }
    })
  };

  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 bg-black z-40 flex flex-col md:hidden pt-24 px-6"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      role="menu"
      aria-label="Mobile menu"
      aria-hidden={!isOpen}
    >
      <div className="flex flex-col space-y-8 items-center">
        {navItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            className="text-2xl font-light tracking-wide nav-link"
            onClick={(e) => handleNavItemClick(e, item.href)}
            custom={i}
            variants={menuItemVariants}
            role="menuitem"
          >
            {item.name}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
