import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link, useLocation } from 'react-router-dom';
import SubscribeForm from './SubscribeForm';
import { socialLinks } from '@/data/socialLinks';
import { CONTACT_EMAIL, BOOKING_EMAIL } from '@/utils/constants';
import BlurFade from '@/components/ui/blur-fade';
import Magnetic from '@/components/ui/magnetic';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

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
    <footer className="relative bg-black py-12 sm:py-16 md:py-24 overflow-hidden" role="contentinfo">
      {/* Top border glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 px-5 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand Column */}
          <BlurFade delay={0.1} className="col-span-full md:col-span-1">
            {isHomePage ? (
              <a
                href="#hero"
                className="text-2xl sm:text-3xl font-serif font-light inline-block mb-4 hover:opacity-80 transition-opacity"
                aria-label="CBARRGS - Back to top"
              >
                Cbarrgs
              </a>
            ) : (
              <Link
                to="/"
                className="text-2xl sm:text-3xl font-serif font-light inline-block mb-4 hover:opacity-80 transition-opacity"
                aria-label="CBARRGS - Back to Home"
              >
                Cbarrgs
              </Link>
            )}

            {/* Social Links */}
            <div className="mt-5 flex flex-wrap gap-1" aria-label="Social media links">
              {socialLinks.map((link) => (
                <Magnetic key={link.name} strength={0.2} radius={60}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-white/60 hover:text-white transition-colors duration-300 text-lg sm:text-xl touch-manipulation"
                    aria-label={link.name}
                  >
                    <FontAwesomeIcon icon={link.icon} aria-hidden="true" />
                  </a>
                </Magnetic>
              ))}
            </div>
          </BlurFade>

          {/* Navigation Column */}
          <BlurFade delay={0.2} className="col-span-full md:col-span-1">
            <h3 className="text-sm sm:text-base font-serif font-light mb-4 tracking-wide" id="footer-navigation">
              Navigation
            </h3>
            <ul className="space-y-2.5" aria-labelledby="footer-navigation">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-white transition-colors duration-300 font-extralight tracking-wide text-sm"
                    onClick={(e) => handleFooterLinkClick(e, link.href)}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </BlurFade>

          {/* Subscribe Column */}
          <BlurFade delay={0.3} className="col-span-full md:col-span-1">
            <h3 className="text-sm sm:text-base font-serif font-light mb-4 tracking-wide" id="subscribe-section">
              Stay Connected
            </h3>
            <p className="text-white/50 mb-4 font-extralight text-sm">
              Sign up for updates on music releases and more.
            </p>
            <SubscribeForm />
          </BlurFade>
        </div>

        {/* Bottom Bar */}
        <BlurFade delay={0.4}>
          <div className="mt-10 sm:mt-12 pt-6 sm:pt-8 border-t border-white/[0.08] flex flex-col gap-4 sm:gap-3 items-center text-white/50 text-xs font-extralight">
            <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-4 text-center">
              <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-white transition-colors duration-300">{CONTACT_EMAIL}</a>
              <span className="hidden sm:inline text-white/20">|</span>
              <a href={`mailto:${BOOKING_EMAIL}`} className="hover:text-white transition-colors duration-300">{BOOKING_EMAIL}</a>
            </div>
            <p className="text-white/40">&copy; {currentYear} Cbarrgs. All rights reserved.</p>
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
          </div>
        </BlurFade>
      </div>
    </footer>
  );
};

export default Footer;
