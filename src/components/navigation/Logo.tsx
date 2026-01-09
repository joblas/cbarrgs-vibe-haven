
import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn } from '@/utils/transitions';
import { Link } from 'react-router-dom';

interface LogoProps {
  isHomePage: boolean;
}

const Logo: React.FC<LogoProps> = ({ isHomePage }) => {
  return (
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
  );
};

export default Logo;
