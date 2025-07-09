import { useState } from 'react';
import Image from 'next/image';
import {
  Clock,
  Star,
  Heart,
  Users,
  Camera,
  Mountain,
  Compass,
  Globe,
} from 'lucide-react';

const FloatingGlassCard = ({
  product,
  onProductClick,
  likedProducts = new Set(),
  onToggleLike,
}) => {
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  const getCategoryIcon = (category) => {
    const icons = {
      cultural: Camera,
      nature: Mountain,
      historical: Compass,
      mountain: Mountain,
      romantic: Heart,
      cruise: Globe,
      'keliones-autobusu': Users,
      'aktyvios-keliones': Mountain,
    };
    return icons[category] || Users;
  };

  const getCountryFlag = (country) => {
    const flags = {
      Lietuva: '🇱🇹',
      Lenkija: '🇵🇱',
      Prancūzija: '🇫🇷',
      Italija: '🇮🇹',
      Latvija: '🇱🇻',
      Estija: '🇪🇪',
      Vokietija: '🇩🇪',
    };
    return flags[country] || '🌍';
  };

  // Use the gender field to determine category for icon
  const category =
    product.gender?.toLowerCase().replace(/\s+/g, '-') || 'cultural';
  const IconComponent = getCategoryIcon(category);

  return (
    <div className='group relative h-full'>
      {/* Subtle background glow */}
      <div className='absolute inset-0 bg-gradient-to-r from-gray-200/30 to-gray-300/30 rounded-2xl blur-sm group-hover:blur-md transition-all duration-300 transform group-hover:scale-105'></div>

      {/* Main card with fixed height */}
      <div className='relative bg-white border border-gray-200 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col'>
        {/* Image */}
        <div className='relative overflow-hidden'>
          <div className='aspect-[4/3] relative'>
            <Image
              src={product.images?.[0] || '/placeholder.svg'}
              alt={product.title}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent' />

            {/* Price tag */}
            <div className='absolute top-4 left-4 bg-white rounded-lg px-3 py-2 shadow-md'>
              <span className='text-lg font-bold text-gray-900'>
                €{formatPrice(product.price)}
              </span>
            </div>

            {/* Heart button */}
            {onToggleLike && (
              <button
                onClick={() => onToggleLike(product.id || product._id)}
                className={`absolute top-4 right-4 p-2 rounded-lg transition-all duration-300 ${
                  likedProducts.has(product.id || product._id)
                    ? 'bg-red-500 text-white'
                    : 'bg-white/90 text-gray-600 hover:bg-white hover:text-red-500'
                }`}
              >
                <Heart
                  className={`w-5 h-5 ${
                    likedProducts.has(product.id || product._id)
                      ? 'fill-current'
                      : ''
                  }`}
                />
              </button>
            )}
          </div>
        </div>

        {/* Content with flex-grow to fill remaining space */}
        <div className='p-6 space-y-4 flex-grow flex flex-col'>
          {/* Country */}
          <div className='flex items-center gap-2'>
            <span className='text-xl'>{getCountryFlag(product.brand)}</span>
            <span className='text-sm font-medium text-gray-600'>
              {product.brand}
            </span>
          </div>

          {/* Title with fixed height */}
          <h3 className='text-xl font-bold text-gray-700 group-hover:text-primary transition-colors duration-300 h-14 line-clamp-2 overflow-hidden'>
            {product.title}
          </h3>

          {/* Category badge */}
          <div className='inline-flex items-center gap-1 bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium w-fit'>
            <IconComponent className='w-4 h-4' />
            <span className='truncate'>{product.gender}</span>
          </div>

          {/* Duration and rating */}
          <div className='flex items-center justify-between text-sm text-gray-600'>
            <div className='flex items-center gap-1'>
              <Clock className='w-4 h-4' />
              <span>{product.duration || '1-3 dienos'}</span>
            </div>
            {product.rating && (
              <div className='flex items-center gap-1'>
                <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                <span>{product.rating}</span>
              </div>
            )}
          </div>

          {/* Button - pushed to bottom with mt-auto */}
          <button
            onClick={() =>
              onProductClick(product.id || product._id, product.title)
            }
            className='w-full bg-button hover:bg-hover3 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-[1.02] mt-auto'
          >
            Plačiau
          </button>
        </div>
      </div>
    </div>
  );
};

export default FloatingGlassCard;
