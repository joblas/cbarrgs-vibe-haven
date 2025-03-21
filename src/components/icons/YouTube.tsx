import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const YouTubeIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => {
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
        d="M17 10.5C17 10.5 16.919 9.7 16.65 9.2C16.3 8.6 15.85 8.6 15.6 8.55C14.3 8.4 12 8.4 12 8.4C12 8.4 9.7 8.4 8.4 8.55C8.15 8.6 7.7 8.6 7.35 9.2C7.081 9.7 7 10.5 7 10.5C7 10.5 6.9 11.4 6.9 12.3V13.2C6.9 14.1 7 15 7 15C7 15 7.081 15.8 7.35 16.3C7.7 16.9 8.25 16.9 8.55 16.95C9.45 17.05 12 17.1 12 17.1C12 17.1 14.3 17.1 15.6 16.95C15.85 16.9 16.3 16.9 16.65 16.3C16.919 15.8 17 15 17 15C17 15 17.1 14.1 17.1 13.2V12.3C17.1 11.4 17 10.5 17 10.5ZM10.9 14.1V10.4L13.8 12.25L10.9 14.1Z" 
        fill="white"
      />
    </svg>
  );
};

export default YouTubeIcon;