import { mongooseConnect } from '../lib/mongoose';
import Banner from '../components/Banner';
import Products from '../components/Products';
import Collection from '../components/Collection';
import ContactDiv from '../components/ContactDiv';
import BlogSlide from '../components/BlogSlide';
import SlidingCategories from '../components/SlidingCategories';
import MumisPasitiki from '../components/MumisPasitiki';
import IconCards from '../components/IconCards';
import ContactForm from '../components/ContactForm';
import Hero1 from '../components/Hero1';
import { DefaultSeo } from 'next-seo';

export default function Home({
  newProducts,
  collectionProduct1,
  blogPosts,
  pricingProducts,
  categories,
  mediaData,
}) {
  const imageUrl =
    'https://res.cloudinary.com/dgsidhhur/image/upload/v1719743756/ecommerce-app/sqltzz8bfsdtzjkjhyie.png';

  return (
    <main className='h-full p-4 bg-background'>
      <DefaultSeo
        title='PoliTravel.lt / Pagrindinis'
        description='Išskirtinės kelionių programos, norintiems atrasti daugiau.'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://politravel.lt/',
          site_name: 'PoliTravel.lt',
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
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Hero1 mediaData={mediaData} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <IconCards />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <BlogSlide posts={blogPosts} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Products products={newProducts} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <SlidingCategories categories={categories} />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <Banner imageUrl={imageUrl} title='Banner' />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <MumisPasitiki />
      <hr className='my-5 h-px border-0 bg-gray-300 ' />
      <ContactForm />
    </main>
  );
}

export async function getServerSideProps({ req }) {
  const baseUrl = req.headers['x-forwarded-proto']
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : `http://${req.headers.host}`;

  // Fetch from your API routes (which use Firestore)
  const [productsRes, blogsRes, categoriesRes, mediaRes] = await Promise.all([
    fetch(`${baseUrl}/api/products`),
    fetch(`${baseUrl}/api/blogs`),
    fetch(`${baseUrl}/api/categories`),
    fetch(`${baseUrl}/api/images`),
  ]);

  const [products, blogPosts, categories, mediaData] = await Promise.all([
    productsRes.json(),
    blogsRes.json(),
    categoriesRes.json(),
    mediaRes.json(),
  ]);

  // Example: filter/slice as needed for your UI
  const newProducts = products.slice(0, 3);
  const collectionProduct1 = products[0] || null;
  const pricingProducts = products.filter((p) =>
    [
      '65e64f0f283b34d56e536412',
      '65ec4f3fcf19fe7cb322f75e',
      '65ec50cbcf19fe7cb322f775',
      '65ec526ccf19fe7cb322f782',
    ].includes(p.id)
  );

  return {
    props: {
      collectionProduct1,
      newProducts,
      blogPosts,
      pricingProducts,
      categories,
      mediaData,
    },
  };
}
