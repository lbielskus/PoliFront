import React from 'react';
import { useRouter } from 'next/router'; // Import useRouter

import { FaBus } from 'react-icons/fa';
import { FaPlaneUp } from 'react-icons/fa6';
import { FaMountainSun } from 'react-icons/fa6';
import { GiMountedKnight } from 'react-icons/gi';
import { TbWorld } from 'react-icons/tb';
import { GiOpenBook } from 'react-icons/gi';

const ServicesCards = () => {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 '>
      <Card
        title='Visos kelionės'
        icon={<TbWorld className='text-7xl  text-button' />}
        url='/keliones'
      />
      <Card
        title='Kelionės autobusu'
        icon={<FaBus className='text-6xl  text-button ' />}
        url='/kategorijos/keliones-autobusu' // Updated to use slug-based URL
      />
      <Card
        title='Kelionės lėktuvu'
        icon={<FaPlaneUp className='text-6xl  text-button' />}
        url='/kategorijos/keliones-lektuvu'
      />
      <Card
        title='Aktyvios kelionės'
        icon={<FaMountainSun className='text-6xl  text-button' />}
        url='/kategorijos/aktyvios-keliones'
      />
      <Card
        title='Teatralizuotos ekskursijos'
        icon={<GiMountedKnight className='text-7xl  text-button' />}
        url='/kategorijos/teatralizuotos-ekskursijos'
      />
      <Card
        title='Straipsniai'
        icon={<GiOpenBook className='text-7xl  text-button' />}
        url='/straipsniai'
      />
    </div>
  );
};

const Card = ({ title, icon, url }) => {
  const router = useRouter(); // Use the useRouter hook

  const handleClick = () => {
    router.push(url); // Navigate to the specified URL
  };

  return (
    <div className='bg-white rounded-2xl p-6 h-200 flex flex-col items-center justify-center shadow-2xl w-[200px] md:w-[200px] lg:w-[250px] xl:w-[250px] mx-auto'>
      <div className='icon-container w-16 h-16 text-center'>{icon}</div>

      <button
        onClick={handleClick} // Add onClick handler to the button
        className='h-15 mt-11 bg-button text-white px-4 py-2 rounded-md hover:bg-hover3 transition-colors'
      >
        {title}
      </button>
    </div>
  );
};

export default ServicesCards;
