import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Calendar,
  Clock,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { createSlug } from '../utils/slugify';

const BlogSlide = ({ posts }) => {
  const [currentPostIndex, setCurrentPostIndex] = useState(0);

  useEffect(() => {
    if (!posts || posts.length === 0) return;
    const intervalId = setInterval(() => {
      setCurrentPostIndex((prevIndex) =>
        prevIndex === posts.length - 1 ? 0 : prevIndex + 1
      );
    }, 6000);

    return () => clearInterval(intervalId);
  }, [posts?.length]);

  const truncateContent = (content, length) => {
    const cleanContent = content?.replace(/<[^>]*>/g, '') || '';
    return cleanContent.length > length
      ? cleanContent.substring(0, length) + '...'
      : cleanContent;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('lt-LT', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const calculateReadTime = (content) => {
    const wordsPerMinute = 200;
    const words = content?.replace(/<[^>]*>/g, '').split(' ').length || 0;
    return Math.ceil(words / wordsPerMinute);
  };

  const nextPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === posts.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevPost = () => {
    setCurrentPostIndex((prevIndex) =>
      prevIndex === 0 ? posts.length - 1 : prevIndex - 1
    );
  };

  if (!posts || posts.length === 0) {
    return null;
  }

  const currentPost = posts[currentPostIndex];

  return (
    <section className='py-12 lg:py-16'>
      <div className='container mx-auto px-4'>
        <div className='text-center mb-8'>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            Naujausi straipsniai
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto'>
            Sužinokite apie naujausias kelionių tendencijas ir gaukite naudingų
            patarimų
          </p>
        </div>

        <div className='relative max-w-6xl mx-auto'>
          <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100'>
            <div className='grid lg:grid-cols-2 gap-0'>
              {/* Image Section */}
              <div className='relative h-64 lg:h-full min-h-[400px]'>
                {currentPost.image ? (
                  <Image
                    src={currentPost.image}
                    alt={currentPost.title}
                    fill
                    className='object-cover'
                  />
                ) : (
                  <div className='w-full h-full bg-gradient-to-br from-button/20 to-primary/20 flex items-center justify-center'>
                    <span className='text-gray-500'>
                      Nuotrauka nepasiekiama
                    </span>
                  </div>
                )}
                <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />

                {/* Navigation arrows */}
                {posts.length > 1 && (
                  <>
                    <button
                      onClick={prevPost}
                      className='absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110'
                    >
                      <ChevronLeft className='w-5 h-5 text-gray-700' />
                    </button>
                    <button
                      onClick={nextPost}
                      className='absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110'
                    >
                      <ChevronRight className='w-5 h-5 text-gray-700' />
                    </button>
                  </>
                )}
              </div>

              {/* Content Section */}
              <div className='p-8 lg:p-12 flex flex-col justify-center'>
                {/* Meta info */}
                <div className='flex items-center gap-4 text-sm text-gray-500 mb-4'>
                  <div className='flex items-center gap-1'>
                    <Calendar className='w-4 h-4' />
                    <span>
                      {formatDate(currentPost.createdAt || currentPost.date)}
                    </span>
                  </div>
                  <div className='flex items-center gap-1'>
                    <Clock className='w-4 h-4' />
                    <span>{calculateReadTime(currentPost.content)} min</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className='text-2xl lg:text-3xl font-bold text-gray-800 mb-4 line-clamp-3'>
                  {currentPost.title}
                </h3>

                {/* Excerpt */}
                <p className='text-gray-600 mb-6 line-clamp-3 text-lg leading-relaxed'>
                  {truncateContent(currentPost.content, 200)}
                </p>

                {/* CTA Button */}
                <div className='flex items-center gap-4'>
                  <Link
                    href={`/straipsniai/${createSlug(currentPost.title)}`}
                    className='inline-flex items-center gap-2 bg-button hover:bg-hover3 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg'
                  >
                    Skaityti plačiau
                    <ArrowRight className='w-4 h-4' />
                  </Link>

                  {posts.length > 1 && (
                    <div className='flex gap-2'>
                      {posts.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPostIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentPostIndex
                              ? 'bg-button w-6'
                              : 'bg-gray-300 hover:bg-gray-400'
                          }`}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSlide;
