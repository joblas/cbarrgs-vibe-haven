import { useRef } from 'react';
import {
  motion,
  useInView,
  type Variants,
} from 'framer-motion';

interface BlurFadeProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  blur?: string;
  once?: boolean;
  amount?: number;
}

const BlurFade: React.FC<BlurFadeProps> = ({
  children,
  className,
  delay = 0,
  duration = 0.6,
  yOffset = 12,
  blur = '6px',
  once = true,
  amount = 0.2,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, amount });

  const variants: Variants = {
    hidden: {
      opacity: 0,
      y: yOffset,
      filter: `blur(${blur})`,
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        delay,
        duration,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

export default BlurFade;
