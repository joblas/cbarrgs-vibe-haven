


export const fadeIn = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      delay,
      duration: 0.8, 
      ease: [0.45, 0, 0.55, 1] 
    }
  }
});

export const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      delay, 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
});

export const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.95 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: { 
      delay, 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] 
    }
  }
});

// Fixed slideDown animation
export const slideDown = (delay = 0) => ({
  initial: { opacity: 0, y: -20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

// Fixed staggerContainer for Framer Motion Variants
export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Fixed staggerItems with proper types
export const staggerItems = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

// Custom staggerItem with delay based on index
export const staggerItemWithDelay = (i = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
});

