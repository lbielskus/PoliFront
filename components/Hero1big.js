import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

const Hero1big = () => {
  const [visibleMedia, setVisibleMedia] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch media data');
        }
        const data = await response.json();

        const filteredData = data.filter((media) => media.firstBanner);
        setVisibleMedia(filteredData);
      } catch (error) {
        // Error handling for production
      }
    };

    fetchMediaData();
  }, []);

  const handleButtonClick = () => {
    router.push('/keliones');
  };

  return (
    <section
      className='flex justify-center items-center w-full relative'
      style={{ height: '350px' }}
    >
      {visibleMedia.map((media, index) => (
        <div key={index} className='relative w-full h-full'>
          {media.firstBanner && index === startIndex && (
            <>
              <Image
                src={media.images[0]}
                alt={media.name}
                layout='fill'
                objectFit='cover'
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                className='w-full h-full'
              />
              <div
                className='absolute inset-0 flex flex-col justify-center items-center text-center text-white p-4'
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.4)' }} // Add a slight overlay for readability
              >
                <h2 className='text-3xl font-bold'>{media.name}</h2>
                <p className='text-lg mt-4'>{media.description}</p>
                <button
                  className='mt-4 bg-button hover:bg-hover3 text-white  py-2 px-4 rounded'
                  onClick={handleButtonClick}
                >
                  Visos kelionės
                </button>
              </div>
            </>
          )}
        </div>
      ))}
    </section>
  );
};

export default Hero1big;
