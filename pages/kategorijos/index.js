import Categories from '../../components/Categories';
import { NextSeo } from 'next-seo';

export default function CategoriesPage({ categories }) {
  return (
    <>
      <NextSeo
        title='Kategorijos'
        description='Kategorijos'
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
      <div>
        <Categories categories={categories} />
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const baseUrl = req.headers['x-forwarded-proto']
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
