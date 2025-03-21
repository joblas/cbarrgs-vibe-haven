import React from 'react';

interface IconProps {
  size?: number;
  className?: string;
}

const LinktreeIcon: React.FC<IconProps> = ({ size = 24, className = '' }) => {
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
        d="M12.5 16.75C12.5 17.1642 12.1642 17.5 11.75 17.5C11.3358 17.5 11 17.1642 11 16.75V13.5H9.13176C8.75176 13.5 8.65428 13.0389 8.98846 12.8223L11.8567 11.043V10.1H10.2424C9.85301 10.1 9.75976 9.62835 10.1033 9.41503L11.8567 8.31201V7.25C11.8567 6.83579 12.1925 6.5 12.6067 6.5C13.0209 6.5 13.3567 6.83579 13.3567 7.25V7.72002L14.9819 6.71947C15.3223 6.50442 15.716 6.92814 15.4783 7.25L13.3567 9.84998V10.5993L15.1173 9.41503C15.4608 9.18806 15.8479 9.61677 15.6122 9.94303L13.3567 13.0867V16.75H12.5Z" 
        fill="white"
      />
    </svg>
  );
};

export default LinktreeIcon;