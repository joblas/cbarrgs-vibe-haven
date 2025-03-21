import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const AppleMusicIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="black" stroke="white" strokeWidth="0.5" />
      <path 
        d="M16.03 11.67c-.02-2.07 1.7-3.04 1.77-3.12-.96-1.38-2.44-1.56-2.97-1.59-1.25-.13-2.46.74-3.1.74-.65 0-1.62-.72-2.67-.7-1.36.02-2.62.8-3.32 2-1.43 2.47-.36 6.11 1 8.11.68.97 1.48 2.05 2.53 2.02 1.02-.04 1.4-.65 2.64-.65 1.22 0 1.58.65 2.64.63 1.1-.02 1.79-.98 2.45-1.96.78-1.12 1.1-2.22 1.12-2.28-.02-.01-2.14-.81-2.16-3.23M13.84 6.35c.55-.67.92-1.59.82-2.52-.79.03-1.78.53-2.36 1.2-.51.59-.96 1.56-.84 2.47.89.07 1.8-.44 2.38-1.15" 
        fill="white"
      />
    </svg>
  );
};

export default AppleMusicIcon;