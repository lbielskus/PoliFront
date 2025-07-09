import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

import { FaBus } from 'react-icons/fa';
import { FaPlaneUp } from 'react-icons/fa6';
import { FaMountainSun } from 'react-icons/fa6';
import { GiMountedKnight } from 'react-icons/gi';

import styles from '../styles/topbanner.module.css';

const TopBanner = () => {
  return (
    <div
      className={`${styles['logo']} flex justify-between items-center bg-gray-100 p-4`}
    >
      <Link href='/' passHref>
        <Image
          src='/logo1-01.png'
          alt='Logo'
          className='h-[90px] w-auto cursor-pointer'
          width={210}
          height={105}
          layout='fixed'
        />
      </Link>

      <div
        className={`${styles['hide-links']} flex items-center mr-[22px] space-x-[0px] sm:space-x-[5px] md:space-x-[20px] xl:space-x-[40px] 2xl:space-x-[50px]`}
      >
        <Link href='/kategorijos/keliones-autobusu'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <FaBus className='inline-block mr-1 text-gray-700' />
            Kelionės autobusu
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/kategorijos/keliones-lektuvu'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <FaPlaneUp className='inline-block mr-1 text-gray-700' />
            Kelionės lėktuvu
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/kategorijos/aktyvios-keliones'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <FaMountainSun className='inline-block mr-1 text-gray-700' />
            Aktyvios kelionės
          </span>
        </Link>
        <span className='text-gray-700 opacity-50'> | </span>
        <Link href='/kategorijos/teatralizuotos-ekskursijos'>
          <span className='text-gray-700 cursor-pointer text-lg'>
            <GiMountedKnight className='inline-block mr-1 text-gray-700' />
            Teatralizuotos ekskursijos
          </span>
        </Link>
      </div>
    </div>
  );
};

export default TopBanner;
