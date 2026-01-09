import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { INSTAGRAM_URL, YOUTUBE_CHANNEL, SPOTIFY_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSpotify, faYoutube, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';
import SubscribeForm from './SubscribeForm';
import {
  staggerContainerVariants,
  staggerItemVariants,
  fadeInUpVariants,
  socialIconHover
} from '@/utils/animations';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const socialLinks = [
    { name: 'Instagram', icon: faInstagram, url: INSTAGRAM_URL },
    { name: 'Spotify', icon: faSpotify, url: SPOTIFY_URL },
    { name: 'YouTube', icon: faYoutube, url: YOUTUBE_CHANNEL },
    { name: 'Apple Music', icon: faApple, url: APPLE_MUSIC_URL },
    { name: 'SoundCloud', icon: faSoundcloud, url: SOUNDCLOUD_URL },
    { name: 'Linktree', icon: faLink, url: LINKTREE_URL },
  ];

  const footerLinks = [
    { name: 'Home', href: isHomePage ? '#hero' : '/#hero' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Listen', href: isHomePage ? '#listen-section' : '/#listen-section' },
    { name: 'Shop', href: isHomePage ? '#shop-coming-soon' : '/#shop-coming-soon' },
  ];

  const handleFooterLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
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
    <footer className="relative bg-black py-16 md:py-24 overflow-hidden" role="contentinfo">
      {/* Grain Overlay */}
      <div className="grain-overlay opacity-10" aria-hidden="true" />

      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
        }}
        aria-hidden="true"
      />

      <motion.div
        ref={ref}
        className="relative z-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto"
        variants={staggerContainerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand Column */}
          <motion.div className="col-span-full md:col-span-1" variants={fadeInUpVariants}>
            {isHomePage ? (
              <a
                href="#hero"
                className="text-2xl sm:text-3xl md:text-4xl font-serif font-light inline-block mb-4 hover:opacity-80 transition-opacity"
                aria-label="CBARRGS - Back to top"
              >
                Cbarrgs
              </a>
            ) : (
              <Link
                to="/"
                className="text-2xl sm:text-3xl md:text-4xl font-serif font-light inline-block mb-4 hover:opacity-80 transition-opacity"
                aria-label="CBARRGS - Back to Home"
              >
                Cbarrgs
              </Link>
            )}

            {/* Social Links */}
            <div className="mt-6 flex flex-wrap gap-1" aria-label="Social media links">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center text-white/70 hover:text-white transition-colors duration-300 text-xl sm:text-2xl touch-manipulation"
                  {...socialIconHover}
                  aria-label={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Navigation Column */}
          <motion.div className="col-span-full md:col-span-1" variants={staggerItemVariants}>
            <h3 className="text-base sm:text-lg font-serif font-light mb-4" id="footer-navigation">
              Navigation
            </h3>
            <ul className="space-y-3" aria-labelledby="footer-navigation">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 font-light tracking-wide text-sm sm:text-base"
                    onClick={(e) => handleFooterLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Subscribe Column */}
          <motion.div className="col-span-full md:col-span-1" variants={staggerItemVariants}>
            <h3 className="text-base sm:text-lg font-serif font-light mb-4" id="subscribe-section">
              Stay Connected
            </h3>
            <p className="text-white/50 mb-4 font-light text-sm sm:text-base">
              Sign up for updates on music releases and more.
            </p>
            <SubscribeForm />
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between text-white/40 text-xs sm:text-sm font-light gap-4"
          variants={fadeInUpVariants}
        >
          <p>&copy; {currentYear} Cbarrgs. All rights reserved.</p>
          <div className="flex gap-6">
            <Link
              to="/privacy-policy"
              className="hover:text-white transition-colors duration-300"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms-of-service"
              className="hover:text-white transition-colors duration-300"
            >
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
};

export default Footer;
