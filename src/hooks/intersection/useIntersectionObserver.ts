import { useState, useEffect, RefObject } from 'react';

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number | number[];
  triggerOnce?: boolean;
}

// TypeScript definitions for requestIdleCallback
interface Window {
  requestIdleCallback?: (
    callback: IdleRequestCallback,
    options?: IdleRequestOptions
  ) => number;
  cancelIdleCallback?: (handle: number) => void;
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
    let timeoutId: number | null = null;

    // Create an intersection observer handler
    const createObserver = () => {
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
    };

    // Use requestIdleCallback with fallback to setTimeout
    if (typeof window.requestIdleCallback === 'function') {
      const idleCallbackId = window.requestIdleCallback(() => {
        createObserver();
      });
      
      // Store the callback ID for cleanup
      timeoutId = idleCallbackId;
    } else {
      // Fallback to setTimeout and store the timeout ID
      timeoutId = window.setTimeout(() => {
        createObserver();
      }, 200);
    }

    return () => {
      if (observer) {
        unobserve();
        observer.disconnect();
      }
      
      // Clean up the appropriate timer based on which API was used
      if (timeoutId !== null) {
        if (typeof window.cancelIdleCallback === 'function') {
          window.cancelIdleCallback(timeoutId);
        } else {
          window.clearTimeout(timeoutId);
        }
      }
    };
  }, [elementRef, JSON.stringify({ threshold, root, rootMargin, triggerOnce })]);

  return { 
    isIntersecting, 
    intersectionRatio: entry?.intersectionRatio || 0 
  };
};
