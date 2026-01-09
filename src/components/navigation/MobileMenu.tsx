
import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { NavItem } from '@/types/navigation';
import { useAccessibility, useReducedMotion } from '@/hooks/useAccessibility';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { mobileSocialLinks } from '@/data/socialLinks';

interface MobileMenuProps {
  isOpen: boolean;
  navItems: NavItem[];
  handleNavItemClick: (e: React.MouseEvent<HTMLAnchorElement>, href: string) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, navItems, handleNavItemClick }) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const { trapFocus } = useAccessibility();
  const prefersReducedMotion = useReducedMotion();

  // Menu item animation - slide up with fade
  const menuItemVariants = prefersReducedMotion ? {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  } : {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.15 + i * 0.08,
        duration: 0.4,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Social icons animation
  const socialIconVariants = prefersReducedMotion ? {
    hidden: { opacity: 1 },
    visible: { opacity: 1 }
  } : {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + i * 0.1,
        duration: 0.3,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  // Manage focus trapping when menu opens
  useEffect(() => {
    if (isOpen && menuRef.current) {
      const cleanup = trapFocus(menuRef.current);
      // Lock body scroll when menu is open
      document.body.style.overflow = 'hidden';
      return () => {
        cleanup?.();
        document.body.style.overflow = '';
      };
    }
  }, [isOpen, trapFocus]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={menuRef}
          id="mobile-menu"
          className="fixed inset-0 z-40 flex flex-col md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          {/* Backdrop with blur */}
          <motion.div
            className="absolute inset-0 bg-black/95 backdrop-blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            aria-hidden="true"
          />

          {/* Ambient glow - dreamy bedroom pop effect */}
          <div
            className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 60%)',
              filter: 'blur(60px)',
            }}
            aria-hidden="true"
          />

          {/* Menu content */}
          <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 pt-20 pb-12">
            {/* Navigation links */}
            <nav className="flex flex-col items-center space-y-2">
              {navItems.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  className="group relative text-3xl sm:text-4xl font-serif font-light tracking-wider text-white/90 py-4 px-6 rounded-sm focus:outline-none focus:ring-2 focus:ring-white/30"
                  onClick={(e) => handleNavItemClick(e, item.href)}
                  custom={i}
                  variants={menuItemVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={prefersReducedMotion ? {} : { x: 10 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.98 }}
                  role="menuitem"
                  aria-label={`Navigate to ${item.name} section`}
                >
                  <span className="relative">
                    {item.name}
                    {/* Hover underline effect */}
                    <span
                      className="absolute -bottom-1 left-0 w-0 h-px bg-white/50 transition-all duration-300 group-hover:w-full"
                      aria-hidden="true"
                    />
                  </span>
                </motion.a>
              ))}
            </nav>

            {/* Social links at bottom */}
            <div className="mt-auto pt-12 flex items-center gap-6">
              {mobileSocialLinks.map((social, i) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 text-2xl"
                  custom={i}
                  variants={socialIconVariants}
                  initial="hidden"
                  animate="visible"
                  whileHover={prefersReducedMotion ? {} : { y: -3, scale: 1.1 }}
                  whileTap={prefersReducedMotion ? {} : { scale: 0.95 }}
                  aria-label={social.name}
                >
                  <FontAwesomeIcon icon={social.icon} />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
