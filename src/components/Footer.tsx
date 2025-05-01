import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/transitions';
import { INSTAGRAM_URL, YOUTUBE_CHANNEL, SPOTIFY_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSpotify, faYoutube, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link, useLocation } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  const socialLinks = [
    { name: 'Instagram', icon: faInstagram, url: INSTAGRAM_URL },
    { name: 'Spotify', icon: faSpotify, url: SPOTIFY_URL },
    { name: 'YouTube', icon: faYoutube, url: YOUTUBE_CHANNEL },
    { name: 'Apple Music', icon: faApple, url: APPLE_MUSIC_URL },
    { name: 'SoundCloud', icon: faSoundcloud, url: SOUNDCLOUD_URL },
    { name: 'Linktree', icon: faLink, url: LINKTREE_URL },
  ];

  // Simplified footer links as requested
  const footerLinks = [
    { name: 'Home', href: isHomePage ? '#hero' : '/#hero' },
    { name: 'About', href: isHomePage ? '#about' : '/#about' },
    { name: 'Shop', href: isHomePage ? '#shop-coming-soon' : '/#shop-coming-soon' },
  ];

  return (
    <footer className="relative bg-black py-16 md:py-24" role="contentinfo">
      {/* Grain Overlay */}
      <div 
        className="absolute inset-0 z-0 opacity-10"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")',
        }}
      />
      
      <div className="section-container relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <motion.div 
            className="col-span-full md:col-span-1"
            {...fadeIn()}
          >
            {isHomePage ? (
              <a 
                href="#hero" 
                className="text-3xl md:text-4xl old-english-font font-light inline-block mb-4"
                aria-label="CBARRGS - Back to top"
              >
                CBARRGS
              </a>
            ) : (
              <Link 
                to="/" 
                className="text-3xl md:text-4xl old-english-font font-light inline-block mb-4"
                aria-label="CBARRGS - Back to Home"
              >
                CBARRGS
              </Link>
            )}
            
            <div className="mt-6 flex space-x-4" aria-label="Social media links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors duration-300"
                  aria-label={link.name}
                >
                  <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
                </a>
              ))}
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-full md:col-span-1"
            {...slideUp(0.2)}
          >
            <h3 className="text-lg font-serif font-light mb-4" id="footer-navigation">Navigation</h3>
            <ul className="space-y-3" aria-labelledby="footer-navigation">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <a 
                    href={link.href} 
                    className="nav-link font-light tracking-wide"
                    onClick={() => {
                      if (!isHomePage && !link.href.startsWith('/')) {
                        const targetId = link.href.replace('/#', '');
                        localStorage.setItem('scrollTarget', targetId);
                      }
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div 
            className="col-span-full md:col-span-1"
            {...slideUp(0.4)}
          >
            <h3 className="text-lg font-serif font-light mb-4" id="subscribe-section">Stay Connected</h3>
            <p className="text-white/70 mb-4 font-light">
              Sign up for updates on music releases and more.
            </p>
            
            <form className="flex flex-col space-y-3" aria-labelledby="subscribe-section">
              <input
                type="email"
                placeholder="Your email"
                className="px-4 py-2 bg-white/5 border border-white/10 rounded-sm focus:outline-none focus:ring-1 focus:ring-white/50 text-white placeholder:text-white/40 font-light"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="btn-secondary text-sm"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/60 text-sm font-light"
          {...fadeIn(0.6)}
        >
          <p>&copy; {currentYear} CBARRGS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <Link to="/terms-of-service" className="hover:text-white transition-colors duration-300">Terms of Service</Link>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
