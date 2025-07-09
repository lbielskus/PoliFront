import Head from 'next/head';
import { ReactNode } from 'react';
import CookieConsent from './CookieConsent';
import usePerformanceMonitoring from '../hooks/usePerformanceMonitoring';

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  // Monitor performance in production
  usePerformanceMonitoring();

  return (
    <div className='gpu-accelerate'>
      <Head>
        <title>Your Website Title</title>
        <meta name='description' content='Your website description' />
        <link rel='icon' href='/favicon.ico' />

        {/* Preload critical resources */}
        <link
          rel='preload'
          href='/fonts/montserrat.woff2'
          as='font'
          type='font/woff2'
          crossOrigin=''
        />

        {/* DNS prefetch for external domains */}
        <link rel='dns-prefetch' href='//res.cloudinary.com' />
        <link rel='dns-prefetch' href='//firebasestorage.googleapis.com' />

        {/* Viewport optimization for mobile */}
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1, viewport-fit=cover'
        />
      </Head>
      <header></header>
      <main className='will-change-scroll'>{children}</main>
      <footer></footer>
      <CookieConsent />
    </div>
  );
};

export default Layout;
