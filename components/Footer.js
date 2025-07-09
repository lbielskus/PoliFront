import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaFacebook, FaInstagram, FaLinkedin, FaTiktok } from 'react-icons/fa';
import { MdArrowForward } from 'react-icons/md';

import styles from '../styles/footer.module.css';

const logoUrl = '/roto_logo2.png';

const Footer = () => {
  const [socialLinks, setSocialLinks] = useState({
    facebook: 'https://www.facebook.com/politravelgidas',
    instagram: 'https://www.instagram.com/',
  });

  const handleIconClick = (link) => {
    window.open(link, '_blank');
  };

  return (
    <div className='footer-container py-16 mt-3 '>
      <div className='container mx-auto flex flex-col items-center justify-center'>
        <div
          className={`flex flex-wrap w-full justify-center mb-2 text-start ${styles['footer-links']}`}
        >
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 text-text'>
            <div className='footer-link-items text-text'>
              <h2 className='text-xl font-semibold mb-4 border-b-2 border-button custom-border'>
                Rekvizitai
              </h2>
              <div
                className={`flex flex-col mb-2 ${styles['footer-links-padd']}`}
              >
                <p>Asmeninė gido svetainė</p>

                <p>Kaunas</p>
                <p>LT-47155</p>
                <p>Lietuva</p>
                <p>Tel.: +370 698 03302</p>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 '>
            <div className='footer-link-items '>
              <h2 className='text-xl font-semibold mb-4 text-text border-b-2 border-button custom-border'>
                Apie mus
              </h2>

              <div
                className={`flex flex-col mb-2 text-text ${styles['footer-links-padd']}`}
              >
                <Link href='/sub/apie-mus' className='flex items-center'>
                  <MdArrowForward />
                  <span className='ml-2 '>Apie mus</span>
                </Link>
                <Link href='/kontaktai' className='flex items-center'>
                  <MdArrowForward />
                  <span className='ml-2'>Kontaktai</span>
                </Link>
              </div>
            </div>
          </div>
          <div className='w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-0 text-text'>
            <div className='footer-link-items text-text'>
              <h2 className='text-xl font-semibold mb-4 border-b-2 border-button custom-border'>
                Tinklaraštis
              </h2>

              <div
                className={`flex flex-col mb-2  ${styles['footer-links-padd']}`}
              >
                <Link href='/straipsniai' className='flex items-center'>
                  <MdArrowForward />
                  <span className='ml-2'>Straipsniai</span>
                </Link>
                <Link href='/sub/duk' className='flex items-center'>
                  <MdArrowForward />
                  <span className='ml-2'>Dažniausiai užduodami klausimai</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='mt-8 '>
          <div className='footer-logo mb-4'>
            <Link href='/' className='social-logo flex items-center'>
              <Image
                src='/logo1-01.png'
                alt='Logo'
                className='h-[90px] w-auto cursor-pointer'
                width={210}
                height={105}
                layout='fixed'
              />
            </Link>
          </div>
          <div className='social-icons flex items-center justify-center space-x-4 text-text mt-8'>
            <div
              onClick={() => handleIconClick(socialLinks.facebook)}
              role='button'
              className='cursor-pointer'
            >
              <FaFacebook size={24} className='text-button' />
            </div>
            <div
              onClick={() => handleIconClick(socialLinks.instagram)}
              role='button'
              className='cursor-pointer'
            >
              <FaInstagram size={24} className='text-button' />
            </div>
          </div>
        </div>
        <div className='mt-8'>
          <small className='website-rights text-gray-700 text-center'>
            Created by &copy;Lets Be Visible 2024
          </small>
        </div>
      </div>
    </div>
  );
};

export default Footer;
