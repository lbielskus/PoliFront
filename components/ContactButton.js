import { useRouter } from 'next/router';
import { FiPhone } from 'react-icons/fi';
import { useState } from 'react';

import styles from '../styles/contactbutton.module.css';

const ContactButton = () => {
  const router = useRouter();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    router.push('/kontaktai');
  };

  return (
    <div className='fixed bottom-4 right-4'>
      <div
        className='relative inline-block'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {isHovered && (
          <span className='absolute right-16 bg-white text-green-700 px-4 py-1 rounded shadow-md whitespace-nowrap'>
            Susisiekite!
          </span>
        )}
        <button
          className={`bg-green-600 hover:bg-green-500 border border-white text-white flex items-center justify-center w-16 h-16 rounded-full shadow-md  ${styles['button-mobile']}`}
          onClick={handleClick}
        >
          <FiPhone size={32} />
        </button>
      </div>
    </div>
  );
};

export default ContactButton;
