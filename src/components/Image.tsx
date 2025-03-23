import React, { useState } from 'react';

interface ImageProps {
  src: string;
  alt: string;
  className?: string;
}

const Image: React.FC<ImageProps> = ({ src, alt, className = '' }) => {
  const [hasError, setHasError] = useState(false);
  
  // Default placeholder for when image fails to load
  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 300 300'%3E%3Crect fill='%23222222' width='300' height='300'/%3E%3Ctext fill='%23ffffff' font-family='Arial, sans-serif' font-size='25' text-anchor='middle' x='150' y='150'%3E${alt}%3C/text%3E%3C/svg%3E`;

  return (
    <img
      src={hasError ? placeholder : src}
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
    />
  );
};

export default Image;
