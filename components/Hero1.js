import React, { useState, useEffect } from 'react';
import Hero1small from './Hero1small';
import Hero1big from './Hero1big';

const Hero1 = ({ mediaData }) => {
  const [isSmallScreen, setIsSmallScreen] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1128);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      {isSmallScreen ? (
        <Hero1small mediaData={mediaData} />
      ) : (
        <Hero1big mediaData={mediaData} />
      )}
    </div>
  );
};

export default Hero1;
