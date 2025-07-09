import '../styles/globals.css';
import { Montserrat } from 'next/font/google';
import { DefaultSeo } from 'next-seo';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { CartContextProvider } from '../lib/CartContext';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import ContactButton from '../components/ContactButton';
import '../styles/buttonStyles.module.scss';
import TopBanner from '../components/TopBanner';
import Top2Banner from '../components/Top2Banner';
import BackToTopButton from '../components/BackToTopButton';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

const montserrat = Montserrat({
  subsets: ['latin'],
});

type Category = {
  id: string;
  [key: string]: any; // or define your fields more specifically
};

export default function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const { pathname } = router;
  const [showCategories, setShowCategories] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);

  let showNavbar = true;

  if (
    pathname === '/login' ||
    pathname === '/signup' ||
    pathname === '/forgot-password'
  ) {
    showNavbar = false;
  }

  useEffect(() => {
    const handleRouteChange = () => {
      setShowCategories(false);
    };

    router.events.on('routeChangeStart', handleRouteChange);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, []);

  useEffect(() => {
    // Fetch categories from Firestore on mount
    const fetchCategories = async () => {
      const snapshot = await getDocs(collection(db, 'categories'));
      setCategories(
        snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    };
    fetchCategories();
  }, []);

  return (
    <>
      <DefaultSeo
        title='VandensTalpos.lt'
        description='Išskirtiniai plastikiniai gaminiai namams ir sodui'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://yourwebsite.com/',
          site_name: 'Vandens Talpos',
          images: [
            {
              url: 'https://res.cloudinary.com/dtv9ufmel/image/upload/v1712755967/ecommerce-app/nkdyueoqvtwbc215unry.png',
              width: 1200,
              height: 630,
              alt: 'Roto image',
            },
          ],
        }}
        twitter={{
          handle: '@handle',
          site: '@site',
          cardType: 'summary_large_image',
        }}
      />
      <SessionProvider session={pageProps.session}>
        <CartContextProvider>
          <main
            className={`${montserrat.className} min-h-screen max-w-screen-2xl mx-auto bg-background sm:px-6`}
          >
            <Top2Banner />
            <TopBanner />

            <Header
              categories={categories}
              showCategories={showCategories}
              setShowCategories={setShowCategories}
            />
            <Toaster position='top-center' />
            <Component
              {...pageProps}
              className={montserrat.className + ' sm:mt-36'}
            />
            <Footer />
            <ContactButton />
            <BackToTopButton />
          </main>
        </CartContextProvider>
      </SessionProvider>
    </>
  );
}
