import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { fadeIn, slideDown } from '@/utils/transitions';
import { Link, useLocation } from 'react-router-dom';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const toggleMenu = () => setIsOpen(!isOpen);

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    open: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.1,
        duration: 0.8,
        ease: [0.45, 0, 0.55, 1]
      }
    })
  };

  // Simplified navigation items as requested
  const navItems = [
    { name: "Home", href: isHomePage ? "#hero" : "/#hero" },
    { name: "About", href: isHomePage ? "#about" : "/#about" },
    { name: "Shop", href: isHomePage ? "#shop-coming-soon" : "/#shop-coming-soon" }
  ];

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
          <motion.div {...fadeIn()}>
            {isHomePage ? (
              <a 
                href="#hero"
                className="text-2xl md:text-3xl old-english-font font-light"
                aria-label="CBARRGS - Back to Home"
              >
                Cbarrgs
              </a>
            ) : (
              <Link 
                to="/"
                className="text-2xl md:text-3xl old-english-font font-light"
                aria-label="CBARRGS - Back to Home"
              >
                Cbarrgs
              </Link>
            )}
          </motion.div>

          {/* Desktop Menu */}
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
                onClick={() => {
                  if (!isHomePage && !item.href.startsWith('/')) {
                    // This ensures smooth scrolling works when returning to homepage
                    const targetId = item.href.replace('/#', '');
                    localStorage.setItem('scrollTarget', targetId);
                  }
                }}
              >
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
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
        </div>
      </motion.nav>

      {/* Mobile Menu */}
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
              onClick={() => {
                setIsOpen(false);
                if (!isHomePage && !item.href.startsWith('/')) {
                  const targetId = item.href.replace('/#', '');
                  localStorage.setItem('scrollTarget', targetId);
                }
              }}
              custom={i}
              variants={menuItemVariants}
              role="menuitem"
            >
              {item.name}
            </motion.a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default Navigation;
