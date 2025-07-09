import React, { useState, useEffect } from 'react';
import Hero1 from './Hero1';
import Hero2 from './Hero2';

import {
  BsFillArrowLeftCircleFill,
  BsFillArrowRightCircleFill,
  BsCircleFill,
} from 'react-icons/bs';

const HeroSlider = ({ mediaData }) => {
  const [visibleHeroIndex, setVisibleHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleHeroIndex((prevIndex) => (prevIndex + 1) % 2);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevClick = () => {
    setVisibleHeroIndex((prevIndex) => (prevIndex - 1 + 2) % 2);
  };

  const handleNextClick = () => {
    setVisibleHeroIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  return (
    <section className='hero-slider mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-white rounded-2xl shadow-2xl'>
      <div className='relative overflow-hidden' style={{ height: '100%' }}>
        <div
          className='transition-transform duration-2000'
          style={{
            opacity: visibleHeroIndex === 0 ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Hero1 mediaData={mediaData} />
        </div>
        <div
          className='transition-transform duration-2000'
          style={{
            opacity: visibleHeroIndex === 1 ? 1 : 0,
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
          }}
        >
          <Hero2 mediaData={mediaData} />
        </div>
      </div>
      <div
        className='flex justify-center items-center absolute bottom-0 left-0 w-full'
        style={{ height: '50px' }}
      >
        <BsFillArrowLeftCircleFill
          className='cursor-pointer text-2xl mr-4 text-red-700'
          onClick={handlePrevClick}
        />
        <BsCircleFill
          className={`mx-1 ${
            visibleHeroIndex === 0 ? 'text-red-200' : 'text-gray-300'
          }`}
          style={{ fontSize: '1.5rem' }}
        />
        <BsCircleFill
          className={`mx-1 ${
            visibleHeroIndex === 1 ? 'text-red-200' : 'text-gray-300'
          }`}
          style={{ fontSize: '1.5rem' }}
        />
        <BsFillArrowRightCircleFill
          className='cursor-pointer text-2xl ml-4 text-red-700'
          onClick={handleNextClick}
        />
      </div>
    </section>
  );
};

export default HeroSlider;
