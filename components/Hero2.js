import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { FaHotjar } from 'react-icons/fa';

const Hero2 = () => {
  const [visibleMedia, setVisibleMedia] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchMediaData = async () => {
      try {
        const response = await fetch('/api/images');
        if (!response.ok) {
          throw new Error('Failed to fetch media data');
        }
        const data = await response.json();

        const filteredData = data.filter((media) => media.secondBanner);
        setVisibleMedia(filteredData);
      } catch (error) {
        // Error handling for production
      }
    };

    fetchMediaData();
  }, []);

  const handleButtonClick = (route) => {
    router.push(route);
  };

  return (
    <section className='hero-slider mx-auto px-4 sm:px-6 lg:px-4 py-12 bg-gray-100 rounded-xl shadow-2xl h-full '>
      {visibleMedia.map((media, index) => (
        <div
          key={index}
          className='relative flex flex-col md:flex-row items-center md:items-start w-full h-full rounded-xl  overflow-hidden  pt-[30px]'
        >
          <div className='p-4 w-full md:w-1/2 h-[280px] border-r-2 border-button pl-[150px] pt-[10px] text-center'>
            <h2 className='text-xl font-semibold'>{media.name}</h2>
            <p className='text-sm mt-4 mb-8'>{media.description}</p>
            <div className='mt-4'>
              <button
                className='bg-button hover:bg-hover3 text-white font-bold py-2 px-4 rounded '
                onClick={() => handleButtonClick(media.route)}
              >
                Plačiau
              </button>
            </div>
          </div>
          <div className='relative w-full md:w-1/2 h-0 md:h-auto pl-[250px]'>
            <div className='absolute top-0 left-50'>
              <FaHotjar className='text-button text-3xl  z-10' />
            </div>
            {media.images && media.images.length > 0 && (
              <Image
                src={media.images[0]}
                alt={media.name}
                width={180}
                height={180}
                layout='fixed'
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
                className='rounded-2xl'
              />
            )}
          </div>
        </div>
      ))}
    </section>
  );
};

export default Hero2;
