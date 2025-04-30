import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

/**
 * Custom hook for tracking element visibility with Intersection Observer API
 * Optimized for monitoring scroll-based section visibility
 */
export const useIntersectionObserver = (
  elementRef: RefObject<Element>,
  {
    threshold = 0.1,
    root = null,
    rootMargin = '0px',
    triggerOnce = false,
  }: IntersectionObserverOptions = {}
): { isIntersecting: boolean; intersectionRatio: number } => {
  const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);
  const [isIntersecting, setIsIntersecting] = useState(false);

  useEffect(() => {
    const element = elementRef?.current;
    if (!element) return;

    let unobserve = () => {};
    let observer: IntersectionObserver;

    // Use requestIdleCallback to delay observer creation until browser is idle
    const requestId = window.requestIdleCallback?.(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          setEntry(entry);
          setIsIntersecting(entry.isIntersecting);
          
          // Unobserve after first intersection if triggerOnce is true
          if (triggerOnce && entry.isIntersecting) {
            unobserve();
          }
        },
        { threshold, root, rootMargin }
      );

      observer.observe(element);
      unobserve = () => observer.unobserve(element);
    }) || setTimeout(() => {
      observer = new IntersectionObserver(
        ([entry]) => {
          setEntry(entry);
          setIsIntersecting(entry.isIntersecting);
          
          // Unobserve after first intersection if triggerOnce is true
          if (triggerOnce && entry.isIntersecting) {
            unobserve();
          }
        },
        { threshold, root, rootMargin }
      );

      observer.observe(element);
      unobserve = () => observer.unobserve(element);
    }, 200);

    return () => {
      if (observer) {
        unobserve();
        observer.disconnect();
      }
      if (requestId) {
        window.cancelIdleCallback?.(requestId) || clearTimeout(requestId);
      }
    };
  }, [elementRef, JSON.stringify({ threshold, root, rootMargin, triggerOnce })]);

  return { 
    isIntersecting, 
    intersectionRatio: entry?.intersectionRatio || 0 
  };
};
