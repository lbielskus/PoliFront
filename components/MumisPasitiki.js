import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

const MumisPasitiki = () => {
  const openUrl = () => {
    window.open('https://lbvisible.com', '_blank');
  };

  return (
    <section className='py-10 bg-gradient-to-r from-green-50/40 to-blue-100/40 rounded-2xl shadow-2xl'>
      <div className='container mx-auto'>
        <div className='flex flex-col items-center space-y-8 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4 gap-12'>
          <div
            className='inline-block rounded-lg border border-gray-300 overflow-hidden shadow-md cursor-pointer'
            onClick={openUrl}
          >
            <Image
              src='/3.png'
              alt='Logo 1'
              width={300}
              height={150}
              className='h-18 opacity-100'
              layout='fixed'
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MumisPasitiki;
