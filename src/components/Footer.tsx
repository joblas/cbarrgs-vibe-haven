
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/transitions';
import { INSTAGRAM_URL, YOUTUBE_CHANNEL, SPOTIFY_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSpotify, faYoutube, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { name: 'Instagram', icon: faInstagram, url: INSTAGRAM_URL },
    { name: 'Spotify', icon: faSpotify, url: SPOTIFY_URL },
    { name: 'YouTube', icon: faYoutube, url: YOUTUBE_CHANNEL },
    { name: 'Apple Music', icon: faApple, url: APPLE_MUSIC_URL },
    { name: 'SoundCloud', icon: faSoundcloud, url: SOUNDCLOUD_URL },
    { name: 'Linktree', icon: faLink, url: LINKTREE_URL },
  ];

  const footerLinks = [
    { name: 'Home', url: '#hero' },
    { name: 'About', url: '#about' },
    { name: 'Music', url: '#music' },
    { name: 'Videos', url: '#videos' },
    { name: 'Store', url: '#store' },
  ];

  return (
    <footer className="relative bg-black py-16 md:py-24" role="contentinfo">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <motion.div 
            className="col-span-full md:col-span-1"
            {...fadeIn()}
          >
            <a 
              href="#hero" 
              className="text-3xl md:text-4xl old-english-font font-bold inline-block mb-4"
              aria-label="CBARRGS - Back to top"
            >
              CBARRGS
            </a>
            <p className="text-white/70 max-w-md">
              Crafting musical experiences that push boundaries and resonate with souls.
            </p>
            
            <div className="mt-6 flex space-x-4" aria-label="Social media links">
              {socialLinks.map((link, index) => (
                <a 
                  key={index}
                  href={link.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors duration-300"
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
            <h3 className="text-lg font-medium mb-4" id="footer-navigation">Navigation</h3>
            <ul className="space-y-3" aria-labelledby="footer-navigation">
              {footerLinks.map((link, i) => (
                <li key={i}>
                  <a href={link.url} className="nav-link">
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
            <h3 className="text-lg font-medium mb-4" id="subscribe-section">Subscribe</h3>
            <p className="text-white/70 mb-4">
              Stay updated with the latest news, releases, and tour dates.
            </p>
            
            <form className="flex space-x-2" aria-labelledby="subscribe-section">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-white/50 text-white placeholder:text-white/50"
                required
                aria-label="Email address"
              />
              <button
                type="submit"
                className="btn-primary text-sm whitespace-nowrap"
                aria-label="Subscribe to newsletter"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
        
        <motion.div 
          className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between text-white/60 text-sm"
          {...fadeIn(0.6)}
        >
          <p>&copy; {currentYear} CBARRGS. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="hover:text-white transition-colors duration-300">Privacy Policy</Link>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
