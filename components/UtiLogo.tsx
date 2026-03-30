
import React from 'react';

interface Props {
  className?: string;
}

export const UtiLogo: React.FC<Props> = ({ className = "h-12 w-12" }) => {
  return (
    <img 
      src="https://raw.githubusercontent.com/fradara699-wq/medical-media/main/HP%20foto%20.png" 
      alt="Logo" 
      className={`${className} object-contain`}
      referrerPolicy="no-referrer"
    />
  );
};
