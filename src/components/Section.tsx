
import React, { useRef, useCallback, forwardRef, useEffect } from 'react';
import { motion, useAnimation, HTMLMotionProps } from 'framer-motion';
import { useIntersectionObserver } from '@/hooks/intersection/useIntersectionObserver';

// Create a type that omits the conflicting onAnimationStart prop
type MotionSectionProps = Omit<HTMLMotionProps<"section">, "onAnimationStart">;

interface SectionProps extends MotionSectionProps {
  id: string;
  fullScreen?: boolean;
  className?: string;
  animationVariants?: any;
  animationDelay?: number;
  onSectionVisible?: (id: string, visible: boolean) => void;
  backgroundImage?: string;
  backgroundOverlay?: string;
  children: React.ReactNode;
}

/**
 * Reusable Section component that handles:
 * - Full screen sizing
 * - Intersection observation
 * - Animation triggers
 * - Background parallax effects
 */
const Section = forwardRef<HTMLElement, SectionProps>(({
  id,
  fullScreen = true,
  className = '',
  animationVariants,
  animationDelay = 0,
  onSectionVisible,
  backgroundImage,
  backgroundOverlay = 'bg-black/50',
  children,
  ...props
}, ref) => {
  const localRef = useRef<HTMLElement>(null);
  const sectionRef = (ref || localRef) as React.RefObject<HTMLElement>;
  const controls = useAnimation();
  
  // Use our custom intersection observer hook
  const { isIntersecting, intersectionRatio } = useIntersectionObserver(
    sectionRef,
    { threshold: [0.1, 0.5, 0.8], rootMargin: '0px' }
  );

  // Default animation variants if none provided
  const defaultVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (delay: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay,
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  const variants = animationVariants || defaultVariants;

  // Handle section visibility changes
  const handleVisibilityChange = useCallback(() => {
    if (isIntersecting) {
      controls.start((delay: number) => ({
        ...variants.visible(delay + animationDelay),
        transition: {
          ...variants.visible(0).transition,
          delay: delay + animationDelay
        }
      }));
      
      onSectionVisible?.(id, true);
    } else if (intersectionRatio < 0.1) {
      onSectionVisible?.(id, false);
    }
  }, [
    isIntersecting, 
    intersectionRatio, 
    id, 
    controls, 
    variants, 
    animationDelay, 
    onSectionVisible
  ]);

  // Trigger animation when section becomes visible
  useEffect(() => {
    handleVisibilityChange();
  }, [handleVisibilityChange]);

  return (
    <motion.section
      id={id}
      ref={sectionRef}
      className={`
        relative 
        ${fullScreen ? 'min-h-screen' : ''} 
        ${backgroundImage ? 'overflow-hidden' : ''}
        ${className}
      `}
      initial="hidden"
      animate={controls}
      variants={variants}
      custom={0}
      {...props}
    >
      {backgroundImage && (
        <motion.div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: `url('${backgroundImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          initial={{ scale: 1 }}
          animate={{ 
            scale: isIntersecting ? 1.05 : 1,
            y: isIntersecting ? -10 : 0
          }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      )}
      
      {backgroundImage && backgroundOverlay && (
        <div className={`absolute inset-0 w-full h-full z-0 ${backgroundOverlay}`} />
      )}
      
      <div className="relative z-10 h-full">
        {children}
      </div>
    </motion.section>
  );
});

Section.displayName = 'Section';

export default Section;
