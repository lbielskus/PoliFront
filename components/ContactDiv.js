import React from 'react';
import Link from 'next/link';
import Spinner from '../components/Spinner';

const ContactDiv = () => {
  return (
    <div className=' bg-gradient-to-r from-indigo-50 to-red-75 p-4 rounded-2xl  text-center shadow-2xl '>
      <h2 className='text-xl font-bold mb-2 text-gray-700 rounded-2xl'>
        Susisiekite!
      </h2>
      <p className='text-gray-700 mb-4'>
        Turite klausimų ar norite gauti pasiūlymą?
      </p>
      <Link href='/contact'>
        <button className=' h-[40px] text-white bg-button dark:bg-button border-2 border-button hover:border-2 hover:bg-white hover:text-button drop-shadow-md  px-4 py-1 rounded-lg'>
          Susisiekti
        </button>
      </Link>
    </div>
  );
};

export default ContactDiv;
