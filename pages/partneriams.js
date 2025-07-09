import React from 'react';
import Layout from '../components/Layout';
import MumisPasitiki from '../components/MumisPasitiki';
import { NextSeo } from 'next-seo';

const Partneriai = () => {
  return (
    <>
      <NextSeo
        title='Kontaktai'
        description='Kontaktai'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://politravel.lt/',
          site_name: 'PoliTravel',
          images: [
            {
              url: 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719670070/ecommerce-app/zx6rrkftwt5agzysa7tg.png',
              width: 1200,
              height: 630,
              alt: 'Politravel logo',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <Layout>
        <div className='container mx-auto px-4 py-8'>
          <MumisPasitiki />
        </div>
      </Layout>
    </>
  );
};

export default Partneriai;

export async function getServerSideProps({ req }) {
  const baseUrl = req?.headers?.['x-forwarded-proto']
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : `http://${req.headers.host}`;

  let categories = [];
  try {
    const res = await fetch(`${baseUrl}/api/categories`);
    categories = await res.json();
  } catch (error) {
    // Error handling for production
  }

  return {
    props: {
      categories,
    },
  };
}
