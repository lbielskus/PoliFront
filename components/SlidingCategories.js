import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createSlug } from '../utils/slugify';
import {
  ChevronLeft,
  ChevronRight,
  Map,
  Compass,
  ArrowRight,
} from 'lucide-react';

const HIDDEN_CATEGORY_ID = '6681319c2290aed4f9bc778e';

const SlidingCategories = ({ categories }) => {
  const [visibleCategories, setVisibleCategories] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);

  // Filter out hidden categories
  const filteredCategories =
    categories?.filter((category) => category._id !== HIDDEN_CATEGORY_ID) || [];

  useEffect(() => {
    if (filteredCategories.length === 0) return;

    const updateVisibleCategories = () => {
      const categoriesToShow =
        typeof window !== 'undefined'
          ? window.innerWidth >= 1024
            ? 3
            : window.innerWidth >= 768
            ? 2
            : 1
          : 3;
      const endIndex =
        (startIndex + categoriesToShow) % filteredCategories.length;

      if (endIndex >= startIndex) {
        setVisibleCategories(filteredCategories.slice(startIndex, endIndex));
      } else {
        setVisibleCategories([
          ...filteredCategories.slice(startIndex),
          ...filteredCategories.slice(0, endIndex),
        ]);
      }
    };

    updateVisibleCategories();

    // Auto-slide functionality
    if (isAutoplay && filteredCategories.length > 1) {
      const interval = setInterval(() => {
        setStartIndex(
          (prevIndex) => (prevIndex + 1) % filteredCategories.length
        );
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [filteredCategories, startIndex, isAutoplay]);

  const handlePrevClick = () => {
    setIsAutoplay(false);
    setStartIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredCategories.length) % filteredCategories.length
    );
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  const handleNextClick = () => {
    setIsAutoplay(false);
    setStartIndex((prevIndex) => (prevIndex + 1) % filteredCategories.length);
    setTimeout(() => setIsAutoplay(true), 10000);
  };

  if (!filteredCategories.length) return null;

  return (
    <section className='py-16 lg:py-20 relative overflow-hidden'>
      {/* Background Pattern */}
      <div className='absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-button/5'></div>

      <div className='container mx-auto px-4 relative'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-button/10 px-4 py-2 rounded-full mb-4'>
            <Map className='w-4 h-4 text-primary' />
            <span className='text-sm font-medium text-primary'>
              Kelionių tipai
            </span>
          </div>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            Kategorijos
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Raskite savo idealų kelionės tipą ir pradėkite savo nuotykį šiandien
          </p>
        </div>

        {/* Categories Grid */}
        <div className='relative max-w-7xl mx-auto'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {visibleCategories.map((category, index) => (
              <div
                key={`${category._id}-${index}`}
                className='group relative transform transition-all duration-500 hover:scale-[1.02]'
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className='relative h-80 lg:h-96 rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500'>
                  {/* Category Image */}
                  <div className='absolute inset-0'>
                    {category.images && category.images.length > 0 ? (
                      <Image
                        src={category.images[0]}
                        alt={category.name}
                        fill
                        className='object-cover transition-transform duration-700 group-hover:scale-110'
                      />
                    ) : (
                      <div className='w-full h-full bg-gradient-to-br from-primary/20 to-button/20 flex items-center justify-center'>
                        <Compass className='w-16 h-16 text-primary/50' />
                      </div>
                    )}
                  </div>

                  {/* Overlay Gradient */}
                  <div className='absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent group-hover:from-black/80 transition-all duration-500'></div>

                  {/* Content */}
                  <div className='absolute bottom-0 left-0 right-0 p-6 text-white'>
                    <div className='transform translate-y-2 group-hover:translate-y-0 transition-all duration-500'>
                      <h3 className='text-xl lg:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300'>
                        {category.name}
                      </h3>
                      <p className='text-white/90 text-sm lg:text-base mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100'>
                        {category.description}
                      </p>
                      <Link
                        href={`/kategorijos/${createSlug(category.name)}`}
                        className='inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-xl font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 delay-200'
                      >
                        Žiūrėti
                        <ArrowRight className='w-4 h-4' />
                      </Link>
                    </div>
                  </div>

                  {/* Floating Number Badge */}
                  <div className='absolute top-4 right-4 w-8 h-8 bg-white/90 rounded-full flex items-center justify-center text-sm font-bold text-gray-800 shadow-lg'>
                    {index + 1}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          {filteredCategories.length > 1 && (
            <div className='flex items-center justify-center mt-8 gap-4'>
              <button
                onClick={handlePrevClick}
                className='w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-gray-200'
              >
                <ChevronLeft className='w-5 h-5 text-gray-700' />
              </button>

              {/* Dots Indicator */}
              <div className='flex gap-2'>
                {Array.from({
                  length: Math.ceil(filteredCategories.length / 3),
                }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setIsAutoplay(false);
                      setStartIndex(i * 3);
                      setTimeout(() => setIsAutoplay(true), 10000);
                    }}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === Math.floor(startIndex / 3)
                        ? 'bg-button w-6'
                        : 'bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNextClick}
                className='w-12 h-12 bg-white hover:bg-gray-50 rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 border border-gray-200'
              >
                <ChevronRight className='w-5 h-5 text-gray-700' />
              </button>
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className='text-center mt-12'>
          <Link
            href='/kategorijos'
            className='inline-flex items-center gap-2 bg-gradient-to-r from-button to-primary hover:from-hover3 hover:to-button text-white px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl'
          >
            Peržiūrėti visas kategorijas
            <ArrowRight className='w-5 h-5' />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SlidingCategories;
