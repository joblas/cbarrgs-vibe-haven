
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { useNavigationScroll } from '@/hooks/useNavigationScroll';
import Logo from './navigation/Logo';
import DesktopMenu from './navigation/DesktopMenu';
import MobileMenuButton from './navigation/MobileMenuButton';
import MobileMenu from './navigation/MobileMenu';
import { NavItem } from '@/types/navigation';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const scrolled = useNavigationScroll();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.45, 0, 0.55, 1]
      }
    }
  };

  // Navigation items
  const navItems: NavItem[] = [
    { name: "Home", href: isHomePage ? "#hero" : "/#hero" },
    { name: "About", href: isHomePage ? "#about" : "/#about" },
    { name: "Listen", href: isHomePage ? "#listen-section" : "/#listen-section" },
    { name: "Shop", href: isHomePage ? "#shop-coming-soon" : "/#shop-coming-soon" }
  ];

  // Handle navigation item click
  const handleNavItemClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    setIsOpen(false);
    
    // Handle home page hash links
    if (isHomePage && href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else if (!isHomePage && !href.startsWith('/')) {
      const targetId = href.replace('/#', '');
      localStorage.setItem('scrollTarget', targetId);
    }
  };

  return (
    <>
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled ? 'py-4 bg-black/80 backdrop-blur-md' : 'py-6 bg-transparent'
        }`}
        variants={navVariants}
        initial="hidden"
        animate="visible"
        role="navigation"
        aria-label="Main Navigation"
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <Logo isHomePage={isHomePage} />
          
          {/* Desktop Menu */}
          <DesktopMenu 
            navItems={navItems} 
            handleNavItemClick={handleNavItemClick} 
          />

          {/* Mobile Menu Button */}
          <MobileMenuButton 
            isOpen={isOpen} 
            toggleMenu={toggleMenu} 
          />
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <MobileMenu 
        isOpen={isOpen} 
        navItems={navItems} 
        handleNavItemClick={handleNavItemClick}
      />
    </>
  );
};

export default Navigation;
