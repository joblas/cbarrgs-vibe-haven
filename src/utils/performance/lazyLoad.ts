/**
 * Utility functions for performance optimization through lazy loading
 */

/**
 * Creates a loading placeholder for images with the same aspect ratio
 * to prevent layout shifts (CLS)
 */
export const getImagePlaceholder = (width: number, height: number): string => {
  const ratio = (height / width) * 100;
  return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'%3E%3C/svg%3E`;
};

/**
 * Lazy loads a script with configurable strategy
 * @param src - Script source URL
 * @param strategy - Loading strategy (defer or async)
 * @param id - Optional ID for the script tag
 */
export const loadScript = (
  src: string, 
  strategy: 'defer' | 'async' = 'defer', 
  id?: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Check if script already exists
    if (id && document.getElementById(id)) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = src;
    if (id) script.id = id;
    
    script[strategy] = true;
    script.onload = () => resolve();
    script.onerror = (error) => reject(error);
    
    document.body.appendChild(script);
  });
};

/**
 * Prefetches resources when browser is idle
 * Uses requestIdleCallback with fallback to setTimeout
 */
export const prefetchResource = (
  url: string, 
  resourceType: 'image' | 'style' | 'script' | 'font' = 'image'
): void => {
  const prefetch = () => {
    let link: HTMLLinkElement | null = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    
    switch (resourceType) {
      case 'style':
        link.as = 'style';
        break;
      case 'script':
        link.as = 'script';
        break;
      case 'font':
        link.as = 'font';
        link.crossOrigin = 'anonymous';
        break;
      default:
        link.as = 'image';
    }
    
    document.head.appendChild(link);
    // Clean up to avoid memory leaks
    link = null;
  };
  
  // Use requestIdleCallback with setTimeout fallback
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(() => prefetch());
  } else {
    setTimeout(prefetch, 1000);
  }
};

/**
 * Defers loading of Spotify embeds until user interaction or element is in view
 */
export const initSpotifyEmbed = async (): Promise<void> => {
  await loadScript('https://open.spotify.com/embed/iframe-api/v1', 'async', 'spotify-iframe-api');
};

// Intersection Observer for lazy loading images on demand
export const createLazyLoadObserver = (): IntersectionObserver => {
  // Helper function to sanitize URLs against XSS
  const sanitizeUrl = (url: string): string | null => {
    try {
      // First, basic validation for common secure protocols and patterns
      if (!/^(https?:\/\/|\/|\.\/|\.\.\/)/i.test(url) || /^javascript:/i.test(url)) {
        console.error('Invalid image URL detected:', url);
        return null;
      }

      // Create URL object to further validate - this will throw for malformed URLs
      const urlObj = new URL(url, window.location.origin);
      
      // Only allow specific protocols
      if (urlObj.protocol !== 'http:' && urlObj.protocol !== 'https:') {
        console.error('Invalid protocol in URL:', url);
        return null;
      }
      
      // Return the sanitized URL string
      return urlObj.toString();
    } catch (error) {
      // If URL parsing fails or any other error occurs
      console.error('URL sanitization failed:', error);
      return null;
    }
  };

  return new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target as HTMLImageElement;
          const dataSrc = img.getAttribute('data-src');
          
          if (dataSrc) {
            // Sanitize the URL to prevent XSS attacks
            const sanitizedUrl = sanitizeUrl(dataSrc);
            
            // Only proceed if URL was successfully sanitized
            if (sanitizedUrl) {
              // Create new image to preload
              const newImg = new Image();
              // Set crossOrigin if it's a remote URL
              if (/^https?:\/\//i.test(sanitizedUrl) && !sanitizedUrl.startsWith(window.location.origin)) {
                newImg.crossOrigin = 'anonymous';
              }
              
              // Use the sanitized URL
              newImg.src = sanitizedUrl;
              
              newImg.onload = () => {
                // Set the sanitized URL to the image
                img.src = sanitizedUrl;
                img.removeAttribute('data-src');
                img.classList.add('loaded');
                observer.unobserve(img);
              };
            }
          }
        }
      });
    },
    {
      rootMargin: '200px 0px', // Start loading 200px before image enters viewport
      threshold: 0.01
    }
  );
};
