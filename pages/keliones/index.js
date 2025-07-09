import Link from 'next/link';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Spinner from '../../components/Spinner';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { NextSeo } from 'next-seo';
import { createSlug } from '../../utils/slugify';
import { FloatingGlassCard } from '../../components/Cards';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ allProducts = [] }) {
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(9);
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const router = useRouter();

  // Initialize search from URL query parameter
  useEffect(() => {
    if (router.query.search) {
      setSearchQuery(router.query.search);
    }
  }, [router.query.search]);

  useEffect(() => {
    const filterProducts = () => {
      let filtered;
      if (searchQuery === '') {
        filtered = allProducts || [];
      } else {
        const lowerCaseQuery = searchQuery.toLowerCase();
        filtered = (allProducts || []).filter(
          (product) =>
            product.title.toLowerCase().includes(lowerCaseQuery) ||
            product.brand?.toLowerCase().includes(lowerCaseQuery) ||
            product.gender?.toLowerCase().includes(lowerCaseQuery)
        );
      }

      // Sort products by date (newest first)
      const sortedFiltered = [...filtered].sort((a, b) => {
        const dateA = new Date(a.date || a.createdAt || 0);
        const dateB = new Date(b.date || b.createdAt || 0);
        return dateB - dateA;
      });

      setFilteredProducts(sortedFiltered);
    };

    setTimeout(() => {
      setLoading(false);
    }, 2000);

    filterProducts();
  }, [searchQuery, allProducts]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts
    ? filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      const previousPage = prevPage - 1;
      if (previousPage < 1) {
        return totalPages;
      }
      return previousPage;
    });
  };

  const handleNextPage = (event) => {
    event.preventDefault();
    setCurrentPage((prevPage) => {
      const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
      const nextPage = prevPage + 1;
      if (nextPage > totalPages) {
        return 1;
      }
      return nextPage;
    });
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

    return <FloatingGlassCard key={product.id} {...cardProps} />;
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setCurrentPage(1); // Reset to first page when searching

    // Update URL without causing a page reload
    const query = { ...router.query };
    if (value) {
      query.search = value;
    } else {
      delete query.search;
    }
    router.push({ pathname: router.pathname, query }, undefined, {
      shallow: true,
    });
  };

  return (
    <>
      <NextSeo
        title='Visos kelionės'
        description='Visos kelionės'
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
      <div className='min-h-screen bg-background rounded-2xl mt-5'>
        {loading ? (
          <div className='flex justify-center items-center min-h-screen w-full '>
            <Spinner />
          </div>
        ) : (
          <div className='mt-14 md:mt-6 w-full px-4 md:p-0 ml-4 mr-4'>
            <input
              type='text'
              placeholder='Paieška'
              value={searchQuery}
              onChange={handleSearchChange}
              className='mb-4 px-4 py-2 rounded-xl border border-gray-300 w-full '
            />

            {filteredProducts.length === 0 ? (
              <p className='text-center text-gray-600'>
                Pagal Jūsų paiešką kelionių nerasta.
              </p>
            ) : (
              <>
                <div className='flex justify-center mt-4 mb-4'>
                  {filteredProducts.length > productsPerPage && (
                    <nav aria-label='Page navigation example'>
                      <ul className='flex items-center -space-x-px h-8 text-sm'>
                        <li>
                          <a
                            onClick={handlePreviousPage}
                            className='flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white  border-e-0 border-gray-300 rounded-s-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
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
                          </a>
                        </li>
                        {Array.from(
                          {
                            length: Math.ceil(
                              filteredProducts.length / productsPerPage
                            ),
                          },
                          (_, i) => (
                            <li key={i}>
                              <a
                                onClick={() => paginate(i + 1)}
                                className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white   hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white ${
                                  i + 1 === currentPage
                                    ? 'bg-blue-50 text-blue-600'
                                    : ''
                                }`}
                              >
                                {i + 1}
                              </a>
                            </li>
                          )
                        )}
                        <li>
                          <a
                            onClick={handleNextPage}
                            className='flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  rounded-e-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
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
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>

                {/* Cards Grid */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-8 items-stretch'>
                  {currentProducts.map((product, index) =>
                    renderCard(product, index)
                  )}
                </div>

                {/* Bottom Pagination */}
                <div className='flex justify-center mt-4 mb-4'>
                  {filteredProducts.length > productsPerPage && (
                    <nav aria-label='Page navigation example'>
                      <ul className='flex items-center -space-x-px h-8 text-sm'>
                        <li>
                          <a
                            onClick={handlePreviousPage}
                            className='flex items-center justify-center px-3 h-10 ms-0 leading-tight text-gray-500 bg-white  border-gray-300 rounded-s-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
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
                          </a>
                        </li>
                        {Array.from(
                          {
                            length: Math.ceil(
                              filteredProducts.length / productsPerPage
                            ),
                          },
                          (_, i) => (
                            <li key={i}>
                              <a
                                onClick={() => paginate(i + 1)}
                                className={`flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white   hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:bg-opacity-90 dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white ${
                                  i + 1 === currentPage
                                    ? 'bg-blue-50 text-blue-600'
                                    : ''
                                }`}
                              >
                                {i + 1}
                              </a>
                            </li>
                          )
                        )}
                        <li>
                          <a
                            onClick={handleNextPage}
                            className='flex items-center justify-center px-3 h-10 leading-tight text-gray-500 bg-white  rounded-e-2xl hover:bg-gray-100 hover:text-gray-700 dark:bg-button dark:border-gray-200 dark:text-white dark:hover:bg-red-400 dark:hover:text-white'
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
                          </a>
                        </li>
                      </ul>
                    </nav>
                  )}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const baseUrl = req.headers['x-forwarded-proto']
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : `http://${req.headers.host}`;

  let allProducts = [];
  try {
    const res = await fetch(`${baseUrl}/api/products`);
    if (res.ok) {
      allProducts = await res.json();
    }
  } catch (error) {
    // Error handling for production
  }

  return {
    props: {
      allProducts: allProducts || [],
    },
  };
}
