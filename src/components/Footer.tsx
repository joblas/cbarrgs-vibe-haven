import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, slideUp } from '@/utils/transitions';
import { INSTAGRAM_URL, YOUTUBE_CHANNEL, SPOTIFY_URL, LINKTREE_URL, APPLE_MUSIC_URL, SOUNDCLOUD_URL } from '@/utils/constants';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faSpotify, faYoutube, faApple, faSoundcloud } from '@fortawesome/free-brands-svg-icons';
import { faLink } from '@fortawesome/free-solid-svg-icons';

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
    <footer className="relative bg-black py-16 md:py-24">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          <motion.div 
            className="col-span-full md:col-span-1"
            {...fadeIn()}
          >
            <a href="#hero" className="text-3xl font-display font-bold tracking-tight inline-block mb-4">
              CBARRGS
            </a>
            <p className="text-white/70 max-w-md">
              Crafting musical experiences that push boundaries and resonate with souls.
            </p>
            
            <div className="social-icons">
                <a href="https://www.instagram.com/cbarrgs/" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
                <a href="https://open.spotify.com/artist/4qRI7BqjuKH3ulYQrEYnLa" target="_blank" rel="noopener noreferrer"><i className="fab fa-spotify"></i></a>
                <a href="https://www.youtube.com/@cbarrgs" target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube"></i></a>
                <a href="https://music.apple.com/us/artist/cbarrgs/1448293718" target="_blank" rel="noopener noreferrer"><i className="fab fa-apple"></i></a>
                <a href="https://soundcloud.com/cbarrgs?ref=clipboard&p=i&c=1&si=06DEC2F9F22F4B25A6D1AF2E306A3032" target="_blank" rel="noopener noreferrer"><i className="fab fa-soundcloud"></i></a>
                <a href="https://linktr.ee/cbarrgs" target="_blank" rel="noopener noreferrer"><i className="fas fa-link"></i></a>
            </div>
          </motion.div>
          
          <motion.div 
            className="col-span-full md:col-span-1"
            {...slideUp(0.2)}
          >
            <h3 className="text-lg font-medium mb-4">Navigation</h3>
            <ul className="space-y-3">
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
            <h3 className="text-lg font-medium mb-4">Subscribe</h3>
            <p className="text-white/70 mb-4">
              Stay updated with the latest news, releases, and tour dates.
            </p>
            
            <form className="flex space-x-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-sm focus:outline-none focus:ring-1 focus:ring-white/50 text-white placeholder:text-white/50"
                required
              />
              <button
                type="submit"
                className="btn-primary text-sm whitespace-nowrap"
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
            <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors duration-300">Terms of Service</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
