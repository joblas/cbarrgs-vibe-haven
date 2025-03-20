
import React from "react";
import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { ArrowLeft } from "lucide-react";

const NotFound: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
        className="text-center"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
          className="mb-8"
        >
          <span className="text-9xl font-display font-bold tracking-tighter">404</span>
        </motion.div>
        
        <motion.h1 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
          className="text-3xl md:text-4xl font-display font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
          className="text-white/70 text-lg max-w-md mx-auto mb-8"
        >
          Sorry, the page you're looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8, ease: [0.45, 0, 0.55, 1] }}
        >
          <a 
            href="/" 
            className="inline-flex items-center btn-secondary"
          >
            <ArrowLeft size={18} className="mr-2" />
            Return to Home
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default NotFound;
