
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { NavItem } from '@/types/navigation';
import { useAccessibility, useReducedMotion } from '@/hooks/useAccessibility';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  handleNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, handleNavItemClick }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { trapFocus } = useAccessibility();
  const prefersReducedMotion = useReducedMotion();

  const menuVariants = prefersReducedMotion ? {
    closed: { display: 'none' },
    open: { display: 'flex' }
  } : {
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

  const menuItemVariants = prefersReducedMotion ? {
    closed: { opacity: 1 },
    open: { opacity: 1 }
  } : {
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

  // Manage focus trapping when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const cleanup = trapFocus(menuRef.current);
      return cleanup;
    }
  }, [isOpen, trapFocus]);

  return (
    <motion.div
      ref={menuRef}
      id="mobile-menu"
      className="fixed inset-0 bg-black z-40 flex flex-col md:hidden pt-24 px-6"
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      aria-hidden={!isOpen}
      style={{ display: isOpen ? 'flex' : 'none' }}
    >
      <div className="flex flex-col space-y-8 items-center">
        {navItems.map((item, i) => (
          <motion.a
            key={i}
            href={item.href}
            className="text-2xl font-light tracking-wide nav-link text-center py-3 px-4 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            onClick={(e) => handleNavItemClick(e, item.href)}
            custom={i}
            variants={menuItemVariants}
            role="menuitem"
            aria-label={`Navigate to ${item.name} section`}
          >
            {item.name}
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default MobileMenu;
