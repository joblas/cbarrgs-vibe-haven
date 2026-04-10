import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
  once?: boolean;
  as?: React.ElementType;
}

const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className,
  delay = 0,
  staggerDelay = 0.03,
  once = true,
  as: Tag = 'span',
}) => {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once, amount: 0.3 });

  const words = children.split(' ');

  return (
    <Tag className={className} ref={ref}>
      <span className="sr-only">{children}</span>
      <motion.span
        aria-hidden="true"
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
              delayChildren: delay,
            },
          },
        }}
        className="inline"
      >
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => (
              <motion.span
                key={`${wordIndex}-${charIndex}`}
                className="inline-block"
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 10,
                    filter: 'blur(4px)',
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    transition: {
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            ))}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};

export default TextReveal;
