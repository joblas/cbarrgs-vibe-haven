import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const SoundCloudIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => {
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
        d="M6.5 14C6.5 14 6.5 11.5 6.5 11C6.5 10.5 6.55 10.05 6.8 9.8C7.05 9.55 7.35 9.5 7.7 9.5C8.05 9.5 8.26667 9.56667 8.5 9.7V14H6.5ZM9 14V9.5C9 9.5 9.5 9 10.2 9C10.9 9 11 9.5 11 9.5V14H9ZM11.5 14V9C12 8.5 12.5 8.5 12.5 8.5C13.5 8.5 14 9.5 14 9.5C14 9.5 14.5 9 15 9C15.5 9 16 9.5 16 9.5C16 9.5 16.5 9 17 9C17.5 9 18 9.5 18 9.5V14H11.5Z" 
        fill="white"
      />
    </svg>
  );
};

export default SoundCloudIcon;