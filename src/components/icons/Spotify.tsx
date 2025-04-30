import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const SpotifyIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="10" fill="#1DB954" stroke="none" />
      <path 
        d="M16.8 10.8c-1.9-1.1-5-1.2-6.8-0.7-0.3 0.1-0.6-0.1-0.7-0.4-0.1-0.3 0.1-0.6 0.4-0.7 2.1-0.6 5.5-0.5 7.7 0.8 0.3 0.2 0.4 0.5 0.2 0.8-0.2 0.2-0.5 0.3-0.8 0.2zM16.5 12.7c-0.2 0.2-0.4 0.3-0.7 0.1-1.6-1-4-1.3-5.9-0.7-0.2 0.1-0.5 0-0.6-0.2-0.1-0.2 0-0.5 0.2-0.6 2.1-0.6 4.8-0.3 6.6 0.8 0.3 0.2 0.4 0.5 0.4 0.6zM15.5 14.5c-0.1 0.2-0.3 0.2-0.5 0.1-1.4-0.8-3.1-1-5.1-0.6-0.2 0-0.3-0.1-0.4-0.3-0.1-0.2 0.1-0.3 0.3-0.4 2.2-0.5 4.1-0.3 5.7 0.7 0.2 0.1 0.2 0.3 0 0.5zM12 3c-5 0-9 4-9 9s4 9 9 9 9-4 9-9-4-9-9-9z"
        fill="white"
      />
    </svg>
  );
};

export default SpotifyIcon;