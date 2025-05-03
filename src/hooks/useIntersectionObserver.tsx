import { useState, useEffect, useRef, RefObject } from 'react';

interface IntersectionObserverOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

/**
 * Custom hook for detecting when an element enters the viewport
 * @param options - Intersection observer options
 * @returns [ref, isIntersecting] - Reference to attach to the element and boolean indicating if element is visible
 */
export function useIntersectionObserver({
  threshold = 0.1,
  rootMargin = '0px',
  triggerOnce = true
}: IntersectionObserverOptions = {}): [RefObject<HTMLElement>, boolean] {
  const ref = useRef<HTMLElement>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;
    
    // If the element doesn't exist or we've already triggered (when triggerOnce is true)
    if (!element || (triggerOnce && isIntersecting)) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
      observer.disconnect();
    };
  }, [threshold, rootMargin, triggerOnce, isIntersecting]);

  return [ref, isIntersecting];
}
