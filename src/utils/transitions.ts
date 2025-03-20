
export const fadeIn = (delay: number = 0) => ({
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.45, 0, 0.55, 1]
    }
  },
  exit: { 
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1]
    }
  }
});

export const slideUp = (delay: number = 0) => ({
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.45, 0, 0.55, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: 20,
    transition: {
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1]
    }
  }
});

export const slideDown = (delay: number = 0) => ({
  initial: { opacity: 0, y: -20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.45, 0, 0.55, 1]
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    transition: {
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1]
    }
  }
});

export const scaleIn = (delay: number = 0) => ({
  initial: { opacity: 0, scale: 0.98 },
  animate: { 
    opacity: 1, 
    scale: 1,
    transition: {
      duration: 0.8,
      delay,
      ease: [0.45, 0, 0.55, 1]
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.98,
    transition: {
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1]
    }
  }
});

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
};

export const staggerItems = {
  initial: { opacity: 0, y: 20 },
  animate: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.8,
      ease: [0.45, 0, 0.55, 1]
    }
  }
};
