import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { createSlug } from '../../utils/slugify';
import { Calendar, Clock, ArrowRight, User } from 'lucide-react';

export default function Blog({ posts }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    setLoading(false);
  }, [posts]);

  const handlePostClick = (postId, postTitle) => {
    const slug = createSlug(postTitle);
    router.push(`/straipsniai/${slug}`);
  };

  const truncateContent = (content, maxLength) => {
    // Remove HTML tags for preview
    const cleanContent = content.replace(/<[^>]*>/g, '');
    if (cleanContent.length > maxLength) {
      return cleanContent.slice(0, maxLength) + '...';
    }
    return cleanContent;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Nėra datos';

    try {
      // Handle different date formats
      let date;
      if (typeof dateString === 'object' && dateString.seconds) {
        // Firestore timestamp
        date = new Date(dateString.seconds * 1000);
      } else {
        // String or other format
        date = new Date(dateString);
      }

      if (isNaN(date.getTime())) {
        return 'Nėra datos';
      }

      return date.toLocaleDateString('lt-LT', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch (error) {
      return 'Nėra datos';
    }
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content.replace(/<[^>]*>/g, '').split(' ').length;
    const readTime = Math.ceil(words / wordsPerMinute);
    return readTime;
  };

  return (
    <>
      <NextSeo
        title='Straipsniai'
        description='Kelionių patarimai, įdomūs faktai ir naujienos'
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://politravel.lt/',
          site_name: 'PoliTravel',
          images: [
            {
              url: 'https://res.cloudinary.com/dgsidhhur/image/upload/v1719670070/ecommerce-app/zx6rrkftwt5agzysa7tg.png',
              width: 600,
              height: 270,
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

      <div className='min-h-screen bg-background'>
        <div className='container mx-auto px-4 py-16'>
          {/* Header */}
          <div className='text-center mb-12'>
            <h1 className='text-4xl font-bold text-text mb-4'>Straipsniai</h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              Kelionių patarimai, įdomūs faktai ir naujienos iš pasaulio
            </p>
          </div>

          {loading ? (
            <div className='flex justify-center items-center h-64'>
              <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-button'></div>
            </div>
          ) : posts && posts.length === 0 ? (
            <div className='text-center py-12'>
              <p className='text-gray-600 text-lg'>Straipsnių dar nėra.</p>
            </div>
          ) : posts && posts.length > 0 ? (
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {posts.map((post, index) => (
                <article
                  key={post.id}
                  className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col'
                >
                  {/* Featured Image */}
                  <div className='relative h-48 overflow-hidden'>
                    {post.images && post.images.length > 0 ? (
                      <Image
                        src={post.images[0]}
                        alt={post.title}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    ) : (
                      <div className='h-full bg-gradient-to-br from-button/20 to-hover3/20 flex items-center justify-center'>
                        <User className='w-16 h-16 text-button/40' />
                      </div>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

                    {/* Category badge if available */}
                    {post.category && (
                      <div className='absolute top-4 left-4 bg-button text-white px-3 py-1 rounded-full text-sm font-medium'>
                        {post.category}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className='p-6 flex-grow flex flex-col'>
                    {/* Meta info */}
                    <div className='flex items-center gap-4 text-sm text-gray-500 mb-3'>
                      <div className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        <span>{formatDate(post.createdAt)}</span>
                      </div>
                      <div className='flex items-center gap-1'>
                        <Clock className='w-4 h-4' />
                        <span>{calculateReadTime(post.content)} min</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className='text-xl font-bold text-gray-700 mb-3 group-hover:text-button transition-colors duration-300 line-clamp-2'>
                      {post.title}
                    </h2>

                    {/* Excerpt */}
                    <p className='text-gray-600 mb-6 line-clamp-3 flex-grow'>
                      {truncateContent(post.content, 150)}
                    </p>

                    {/* Read More Button */}
                    <button
                      onClick={() => handlePostClick(post.id, post.title)}
                      className='flex items-center justify-between w-full mt-auto group/button'
                    >
                      <span className='text-button font-semibold group-hover/button:text-hover3 transition-colors duration-300'>
                        Skaityti plačiau
                      </span>
                      <div className='bg-button hover:bg-hover3 text-white rounded-full p-2 transition-all duration-300 group-hover/button:translate-x-1'>
                        <ArrowRight className='w-4 h-4' />
                      </div>
                    </button>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className='text-center py-12'>
              <p className='text-gray-600 text-lg'>
                Straipsnių nėra arba nepavyko jų užkrauti.
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps({ req }) {
  const baseUrl = req.headers['x-forwarded-proto']
    ? `${req.headers['x-forwarded-proto']}://${req.headers.host}`
    : `http://${req.headers.host}`;

  let posts = [];
  try {
    const res = await fetch(`${baseUrl}/api/blogs`);
    const allPosts = await res.json();

    // Sort posts by date (newest first)
    posts = allPosts.sort((a, b) => {
      let dateA, dateB;

      // Handle different date formats
      if (
        a.createdAt &&
        typeof a.createdAt === 'object' &&
        a.createdAt.seconds
      ) {
        dateA = new Date(a.createdAt.seconds * 1000);
      } else {
        dateA = new Date(a.date || a.createdAt || 0);
      }

      if (
        b.createdAt &&
        typeof b.createdAt === 'object' &&
        b.createdAt.seconds
      ) {
        dateB = new Date(b.createdAt.seconds * 1000);
      } else {
        dateB = new Date(b.date || b.createdAt || 0);
      }

      return dateB - dateA;
    });
  } catch (error) {
    // Error handling for production
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
