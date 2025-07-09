import { useRouter } from 'next/router';
import Image from 'next/image';
import { NextSeo } from 'next-seo';
import { findBySlug } from '../../utils/slugify';

export default function BlogPost({ post }) {
  const router = useRouter();

  // Helper function to truncate very long titles
  const truncateTitle = (title, maxLength = 100) => {
    if (!title) return '';
    if (title.length <= maxLength) return title;
    return title.substring(0, maxLength) + '...';
  };

  if (!post) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Straipsnis nerastas
          </h1>
          <p className='text-gray-600 mb-6'>
            Atsiprašome, bet šio straipsnio nepavyko rasti.
          </p>
          <button
            onClick={() => router.push('/straipsniai')}
            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
          >
            Grįžti į straipsnius
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <NextSeo
        title={post.title}
        description={post.content?.substring(0, 160) || post.title}
        openGraph={{
          type: 'article',
          locale: 'lt_LT',
          url: `https://politravel.lt/straipsniai/${post.slug}`,
          site_name: 'PoliTravel',
          images: post.image
            ? [
                {
                  url: post.image,
                  width: 1200,
                  height: 630,
                  alt: post.title,
                },
              ]
            : [],
        }}
        twitter={{
          handle: '@politravel',
          site: '@politravel',
          cardType: 'summary_large_image',
        }}
      />

      <div className='min-h-screen bg-gray-50'>
        <div className='container mx-auto px-4 py-8 max-w-full overflow-hidden'>
          <div className='max-w-4xl mx-auto'>
            {/* Header */}
            <div className='bg-white rounded-2xl shadow-lg overflow-hidden mb-8'>
              {post.image && (
                <div className='relative w-full h-96'>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className='object-cover'
                  />
                </div>
              )}

              <div className='p-8 overflow-hidden'>
                <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                  <span>Autorius: {post.author || 'PoliTravel'}</span>
                  {post.date && (
                    <span>
                      Data: {new Date(post.date).toLocaleDateString('lt-LT')}
                    </span>
                  )}
                </div>

                <h1 className='text-2xl lg:text-3xl font-bold text-gray-700 mb-6 text-break leading-tight max-w-full'>
                  {truncateTitle(post.title, 80)}
                </h1>

                {post.excerpt && (
                  <p className='text-xl text-gray-600 leading-relaxed mb-8'>
                    {post.excerpt}
                  </p>
                )}
              </div>
            </div>

            {/* Content */}
            <div className='bg-white rounded-2xl shadow-lg p-8 overflow-hidden'>
              <div
                className='prose prose-lg max-w-full text-break overflow-hidden blog-content'
                dangerouslySetInnerHTML={{ __html: post.content }}
                style={{
                  fontSize: '16px',
                  lineHeight: '1.8',
                  color: '#374151',
                  wordBreak: 'break-word',
                  overflowWrap: 'anywhere',
                  maxWidth: '100%',
                }}
              />
            </div>

            {/* Navigation */}
            <div className='mt-8 text-center'>
              <button
                onClick={() => router.push('/straipsniai')}
                className='px-6 py-3 bg-button hover:bg-hover3 text-white rounded-lg transition-colors flex items-center gap-2 mx-auto'
              >
                <svg
                  className='w-4 h-4'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2}
                    d='M15 19l-7-7 7-7'
                  />
                </svg>
                Grįžti į straipsnius
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const baseUrl = context.req.headers['x-forwarded-proto']
    ? `${context.req.headers['x-forwarded-proto']}://${context.req.headers.host}`
    : `http://${context.req.headers.host}`;

  let post = null;

  try {
    // Fetch all posts to find by slug
    const res = await fetch(`${baseUrl}/api/blogs`);

    if (res.ok) {
      const allPosts = await res.json();
      post = findBySlug(allPosts, slug);
    }
  } catch (error) {
    // Error handling for production
  }

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
}
