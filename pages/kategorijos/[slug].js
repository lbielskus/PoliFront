import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { createSlug, findBySlug } from '../../utils/slugify';
import { FloatingGlassCard } from '../../components/Cards';

export default function CategorySlugPage({ products, categoryName }) {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [likedProducts, setLikedProducts] = useState(new Set());

  useEffect(() => {
    setCurrentPage(1);
  }, [router.query.slug]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Sort products by date (newest first)
  const sortedProducts = products
    ? [...products].sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || 0);
        const dateB = new Date(b.date || b.createdAt || 0);
        return dateB - dateA;
      })
    : [];

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    const totalPages = Math.ceil(sortedProducts.length / productsPerPage);
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const redirectToPost = (productId, productTitle) => {
    if (!productId || !productTitle) {
      return;
    }
    const slug = createSlug(productTitle);
    router.push(`/keliones/${slug}`);
  };

  const toggleLike = (productId) => {
    const newLiked = new Set(likedProducts);
    if (newLiked.has(productId)) {
      newLiked.delete(productId);
    } else {
      newLiked.add(productId);
    }
    setLikedProducts(newLiked);
  };

  const renderCard = (product, index) => {
    const cardProps = {
      product,
      onProductClick: redirectToPost,
      likedProducts,
      onToggleLike: toggleLike,
    };

    return <FloatingGlassCard key={product.id || product._id} {...cardProps} />;
  };

  return (
    <>
      <NextSeo
        title={`${categoryName}`}
        description={`${categoryName} `}
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
      <div className='min-h-screen bg-background rounded-2xl shadow-lg pb-8 mt-4'>
        <div className='content-center py-10 max-w-screen-2xl mx-auto px-4'>
          <h2 className='text-2xl tracking-tight text-text text-center my-1'>
            {categoryName}
          </h2>
          <div className='flex justify-center mt-14 mb-4'>
            <nav aria-label='Kategorijų navigacija'>
              <ul className='flex items-center -space-x-px h-8 text-sm'>
                <li>
                  <button
                    onClick={handlePreviousPage}
                    className='flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white  border-gray-300 rounded-s-2xl hover:bg-gray-500 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-gray-0000 dark:hover:text-white'
                  >
                    <span className='sr-only'>Previous</span>
                    <svg
                      className='w-2.5 h-2.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 1 1 5l4 4'
                      />
                    </svg>
                  </button>
                </li>
                {Array.from(
                  {
                    length: Math.ceil(sortedProducts.length / productsPerPage),
                  },
                  (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white ${
                          i + 1 === currentPage
                            ? 'bg-green-50 text-green-600'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
                    onClick={handleNextPage}
                    className='flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  rounded-e-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white'
                  >
                    <span className='sr-only'>Next</span>
                    <svg
                      className='w-2.5 h-2.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 9 4-4-4-4'
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>{' '}
          {/* Cards Grid */}
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 items-stretch'>
            {currentProducts?.length > 0 ? (
              currentProducts.map((product, index) =>
                renderCard(product, index)
              )
            ) : (
              <div className='col-span-3 h-40 pt-11'>
                <p className='text-center text-gray-600'>
                  Šioje kategorijoje kelionių nėra.
                </p>
              </div>
            )}
          </div>
          {/* Bottom Pagination */}
          <div className='flex justify-center mt-4 mb-4'>
            <nav aria-label='Kategorijų navigacija'>
              <ul className='flex items-center -space-x-px h-8 text-sm'>
                <li>
                  <button
                    onClick={handlePreviousPage}
                    className='flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white  border-gray-300 rounded-s-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white'
                  >
                    <span className='sr-only'>Previous</span>
                    <svg
                      className='w-2.5 h-2.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='M5 1 1 5l4 4'
                      />
                    </svg>
                  </button>
                </li>
                {Array.from(
                  {
                    length: Math.ceil(sortedProducts.length / productsPerPage),
                  },
                  (_, i) => (
                    <li key={i}>
                      <button
                        onClick={() => paginate(i + 1)}
                        className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white ${
                          i + 1 === currentPage
                            ? 'bg-green-50 text-green-600'
                            : ''
                        }`}
                      >
                        {i + 1}
                      </button>
                    </li>
                  )
                )}
                <li>
                  <button
                    onClick={handleNextPage}
                    className='flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  rounded-e-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-gray-500 dark:hover:text-white'
                  >
                    <span className='sr-only'>Next</span>
                    <svg
                      className='w-2.5 h-2.5 rtl:rotate-180'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 6 10'
                    >
                      <path
                        stroke='currentColor'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth='2'
                        d='m1 9 4-4-4-4'
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ params, req }) {
  const baseUrl = req.headers['x-forwarded-proto']
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : `http://${req.headers.host}`;

  const { slug } = params;

  // Fetch all categories
  const categoriesRes = await fetch(`${baseUrl}/api/categories`);
  const categories = await categoriesRes.json();

  // Find the category by slug
  const categoryData = findBySlug(categories, slug);

  if (!categoryData) {
    return { notFound: true };
  }

  // Fetch all products
  const productsRes = await fetch(`${baseUrl}/api/products`);
  const allProducts = await productsRes.json();

  // Filter products by category id
  const products = allProducts.filter((p) => p.category === categoryData.id);

  return {
    props: {
      products,
      categoryName: categoryData.name,
    },
  };
}
