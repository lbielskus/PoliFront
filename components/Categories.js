import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createSlug } from '../utils/slugify';
import { ArrowRight, MapPin, Users, Camera } from 'lucide-react';

const Categories = ({ categories }) => {
  const getCategoryIcon = (categoryName) => {
    const name = categoryName.toLowerCase();
    if (name.includes('autobus') || name.includes('kelion')) return Users;
    if (name.includes('lėktuv') || name.includes('aktyvios')) return Camera;
    return MapPin;
  };

  return (
    <section className='min-h-screen bg-background'>
      <div className='container mx-auto px-4 py-16'>
        <div className='text-center mb-12'>
          <h1 className='text-4xl font-bold text-text mb-4'>Kategorijos</h1>
          <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
            Atraskite savo tobulą kelionę pagal pageidaujamą kelionės tipą
          </p>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {categories.map((category, index) => {
            const IconComponent = getCategoryIcon(category.name);
            return (
              <Link
                key={`${category._id || category.id}-${index}`}
                href={`/kategorijos/${createSlug(category.name)}`}
              >
                <div className='group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col'>
                  {/* Image */}
                  <div className='relative h-64 overflow-hidden'>
                    {category.images && category.images.length > 0 ? (
                      <Image
                        src={category.images[0]}
                        alt={category.name}
                        fill
                        className='object-cover transition-transform duration-500 group-hover:scale-110'
                      />
                    ) : (
                      <div className='h-full bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center'>
                        <IconComponent className='w-16 h-16 text-gray-400' />
                      </div>
                    )}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent' />

                    {/* Icon overlay */}
                    <div className='absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-full p-3'>
                      <IconComponent className='w-6 h-6 text-button' />
                    </div>
                  </div>

                  {/* Content */}
                  <div className='p-6 flex-grow flex flex-col'>
                    <h3 className='text-xl font-bold text-text mb-3 group-hover:text-button transition-colors duration-300'>
                      {category.name}
                    </h3>

                    <p className='text-gray-600 mb-6 line-clamp-3 flex-grow'>
                      {category.description ||
                        'Atraskite nuostabiausias kelionės galimybes šioje kategorijoje.'}
                    </p>

                    {/* Button */}
                    <div className='flex items-center justify-between mt-auto'>
                      <span className='text-sm text-gray-500'>
                        Sužinokite daugiau
                      </span>
                      <div className='bg-button hover:bg-hover3 text-white rounded-full p-2 transition-all duration-300 group-hover:translate-x-1'>
                        <ArrowRight className='w-5 h-5' />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Categories;
