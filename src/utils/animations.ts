/**
 * Shared Framer Motion animation variants for consistent animations across the site.
 * Bedroom pop aesthetic: dreamy, subtle, smooth. Not flashy.
 */

import { Variants, Transition } from 'framer-motion';

// ============================================
// TIMING & EASING
// ============================================

export const easing = {
  // Smooth, natural feeling
  smooth: [0.45, 0, 0.55, 1] as const,
  // Snappy with overshoot
  spring: [0.22, 1, 0.36, 1] as const,
  // Gentle ease out
  gentle: [0.25, 0.1, 0.25, 1] as const,
  // Quick start, slow end
  decelerate: [0, 0, 0.2, 1] as const,
};

export const duration = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.8,
  verySlow: 1.2,
};

// ============================================
// FLOATING ANIMATIONS (Hero title, etc.)
// ============================================

export const floatingVariants: Variants = {
  initial: { y: 0, scale: 1 },
  animate: {
    y: [0, -12, 0],
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: [0.45, 0.05, 0.55, 0.95], // Bouncy ease
      times: [0, 0.5, 1],
    },
  },
};

export const floatingSlowVariants: Variants = {
  initial: { y: 0 },
  animate: {
    y: [0, -4, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// GLOW PULSE (Subtle ambient effect)
// ============================================

export const glowPulseVariants: Variants = {
  initial: { opacity: 0.3 },
  animate: {
    opacity: [0.3, 0.5, 0.3],
    scale: [1, 1.02, 1],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

// ============================================
// SCROLL-TRIGGERED REVEALS
// ============================================

export const fadeInUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.slow,
      ease: easing.spring,
    },
  },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: duration.normal,
      ease: easing.gentle,
    },
  },
};

export const scaleInVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: duration.normal,
      ease: easing.spring,
    },
  },
};

// ============================================
// STAGGERED CONTAINER
// ============================================

export const staggerContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: duration.normal,
      ease: easing.spring,
    },
  },
};

// ============================================
// HOVER INTERACTIONS
// ============================================

export const hoverLift = {
  whileHover: { y: -4, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 25 } as Transition,
};

export const hoverScale = {
  whileHover: { scale: 1.05 },
  whileTap: { scale: 0.95 },
  transition: { type: 'spring', stiffness: 400, damping: 25 } as Transition,
};

export const socialIconHover = {
  whileHover: { y: -4, scale: 1.1 },
  whileTap: { scale: 0.9 },
  transition: { type: 'spring', stiffness: 400, damping: 15 } as Transition,
};

export const buttonHover = {
  whileHover: { scale: 1.02, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 400, damping: 25 } as Transition,
};

// ============================================
// 3D TILT (for cards - desktop only)
// ============================================

export const createTiltStyle = (rotateX: number, rotateY: number) => ({
  transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
  transition: 'transform 0.15s ease-out',
});

export const resetTiltStyle = {
  transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg)',
  transition: 'transform 0.4s ease-out',
};

// ============================================
// PAGE TRANSITIONS
// ============================================

export const pageTransitionVariants: Variants = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.4,
      ease: easing.gentle,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: easing.gentle,
    },
  },
};

// ============================================
// MOBILE HELPERS
// ============================================

/**
 * Check if device prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

/**
 * Check if device is likely mobile (touch-primary)
 */
export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
};

/**
 * Get animation variants based on user preferences
 * Returns empty objects for reduced motion users
 */
export const getResponsiveVariants = <T extends Variants>(
  variants: T,
  disableOnMobile = false
): T | Record<string, Record<string, never>> => {
  if (prefersReducedMotion()) {
    return { hidden: {}, visible: {} } as T;
  }
  if (disableOnMobile && isTouchDevice()) {
    return { hidden: {}, visible: {} } as T;
  }
  return variants;
};
