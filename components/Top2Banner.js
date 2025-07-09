import React from 'react';
import Link from 'next/link';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import styles from '../styles/topbanner2.module.css';

const Top2Banner = () => {
  return (
    <div className='flex justify-between items-center bg-gray-100 p-2 h-14 border-b border-opacity-50 border-gray-500 pr-[60px]'>
      <div
        className={`${styles['center-contact']} flex items-center space-x-4`}
      >
        <div className='flex items-center space-x-2'>
          <FaPhone className='text-gray-700' />
          <span className='text-gray-700'>+37069803302</span>
        </div>
        <div className='flex items-center space-x-2'>
          <FaEnvelope className='text-gray-700' />
          <span className='text-gray-700'>info@politravel.lt</span>
        </div>
      </div>

      <div className={`${styles['hide-links']} flex items-center space-x-4`}>
        <span>
          <Link href='/sub/apie-mus'>
            <span className='text-gray-700 cursor-pointer'>Apie mus</span>
          </Link>
        </span>
        <span className='text-gray-700'> \ </span>
        <span>
          <Link href='/kontaktai'>
            <span className='text-gray-700 cursor-pointer'>Kontaktai</span>
          </Link>
        </span>
        <span className='text-gray-700'> \ </span>
        <span>
          <Link href='/straipsniai'>
            <span className='text-gray-700 cursor-pointer'>Tinklaraštis</span>
          </Link>
        </span>
        <span className='text-gray-700'> \ </span>
        <span>
          <Link href='/sub/duk'>
            <span className='text-gray-700 cursor-pointer'>D. U. K.</span>
          </Link>
        </span>
      </div>
    </div>
  );
};

export default Top2Banner;
