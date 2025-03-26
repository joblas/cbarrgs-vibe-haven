import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { fadeIn, slideDown } from '@/utils/transitions';

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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

  const navItems = [
    { name: "Home", href: "#hero" },
    { name: "About", href: "#about" },
    { name: "Music", href: "#music" },
    { name: "Videos", href: "#videos" },
    { name: "Store", href: "#store" }
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
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex justify-between items-center">
          <motion.a 
            href="#hero"
            className="text-2xl md:text-3xl old-english-font font-bold"
            {...fadeIn()}
          >
            CBARRGS
          </motion.a>

          {/* Desktop Menu */}
          <motion.div 
            className="hidden md:flex space-x-8 items-center"
            {...slideDown(0.2)}
          >
            {navItems.map((item, i) => (
              <a key={i} href={item.href} className="nav-link">
                {item.name}
              </a>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            {...fadeIn(0.4)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <motion.div
        className="fixed inset-0 bg-black z-40 flex flex-col md:hidden pt-24 px-6"
        initial="closed"
        animate={isOpen ? "open" : "closed"}
        variants={menuVariants}
      >
        <div className="flex flex-col space-y-8 items-center">
          {navItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              className="text-2xl font-medium nav-link"
              onClick={() => setIsOpen(false)}
              custom={i}
              variants={menuItemVariants}
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
