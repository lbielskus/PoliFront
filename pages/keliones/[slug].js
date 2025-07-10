'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import sanitizeHtml from 'sanitize-html';
import { NextSeo } from 'next-seo';
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  Calendar,
  Clock,
  Star,
  Heart,
  Share2,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

import Button from '../../components/Button';
import { findBySlug } from '../../utils/slugify';

// Temporary UI components - replace with your actual UI library
const Badge = ({ children, variant, className }) => (
  <span
    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
  >
    {children}
  </span>
);

const Card = ({ children, className }) => (
  <div
    className={`bg-white overflow-hidden shadow rounded-lg ${className || ''}`}
  >
    {children}
  </div>
);

const CardContent = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const Tabs = ({ children, value, onValueChange, className }) => (
  <div className={className}>{children}</div>
);

const TabsList = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const TabsTrigger = ({ children, value, className, isActive, onClick }) => (
  <button
    className={`${className} ${
      isActive
        ? 'bg-green-100 text-green-800 border-green-200'
        : 'bg-gray-100 text-gray-600 border-gray-200'
    } px-6 py-3 rounded-lg font-medium transition-colors border-2 hover:bg-green-50`}
    onClick={() => onClick && onClick(value)}
  >
    {children}
  </button>
);

const TabsContent = ({ children, value, activeValue, className }) => {
  if (value !== activeValue) return null;
  return <div className={className}>{children}</div>;
};

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

const calculatePriceWithTaxes = (price) => {
  const taxRate = 0.21;
  const vat = price * taxRate;
  const total = price + vat;
  return { vat: vat.toFixed(2), total: total.toFixed(2) };
};

export default function ProductPage({ product }) {
  const router = useRouter();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('description');
  const [expandedDay, setExpandedDay] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [showToast, setShowToast] = useState(false);

  const handleNextImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === product.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousImage = () => {
    if (!product?.images?.length) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? product.images.length - 1 : prevIndex - 1
    );
  };

  const toggleDayExpansion = (dayNumber) => {
    setExpandedDay(expandedDay === dayNumber ? null : dayNumber);
  };

  const handleShare = async () => {
    try {
      const url = window.location.href;
      await navigator.clipboard.writeText(url);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    } catch (err) {
      // Copy failed silently
    }
  };

  if (!product) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-2xl font-bold text-gray-900 mb-4'>
            Kelionė nerasta
          </h1>
          <p className='text-gray-600 mb-6'>
            Atsiprašome, bet šios kelionės informacijos nepavyko rasti.
          </p>
          <button
            onClick={() => router.push('/keliones')}
            className='px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors'
          >
            Grįžti į keliones
          </button>
        </div>
      </div>
    );
  }

  if (product) {
    const sanitizedDescriptionText = sanitizeHtml(product.description, {
      allowedTags: [],
      allowedAttributes: {},
    });

    return (
      <>
        <NextSeo
          title={`${product.title}`}
          description={`${product.title} - ${sanitizedDescriptionText}`}
          openGraph={{
            type: 'website',
            locale: 'en_IE',
            url: 'https://politravel.lt/',
            site_name: 'PoliTravel',
            images: [
              {
                url: product.images[currentImageIndex],
                width: 1200,
                height: 630,
                alt: 'Product image',
              },
            ],
          }}
          twitter={{
            handle: '@handle',
            site: '@site',
            cardType: 'summary_large_image',
          }}
        />
        <div className='min-h-screen bg-gray-50'>
          {/* Hero Section with Image Gallery */}
          <div className='relative bg-white'>
            <div className='container mx-auto px-4 py-8'>
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12'>
                {/* Image Gallery */}
                <div className='space-y-4'>
                  {/* Main Image */}
                  <div className='relative aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group'>
                    <Image
                      src={
                        product.images[currentImageIndex] || '/placeholder.svg'
                      }
                      alt={product.title}
                      fill
                      className='object-contain transition-transform duration-300 group-hover:scale-105'
                    />
                    {/* Navigation Arrows */}
                    {product.images.length > 1 && (
                      <>
                        <button
                          onClick={handlePreviousImage}
                          className='absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110'
                        >
                          <ChevronLeft className='w-5 h-5' />
                        </button>
                        <button
                          onClick={handleNextImage}
                          className='absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 shadow-lg transition-all duration-200 hover:scale-110'
                        >
                          <ChevronRight className='w-5 h-5' />
                        </button>
                      </>
                    )}
                    {/* Image Counter */}
                    {product.images.length > 1 && (
                      <div className='absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm'>
                        {currentImageIndex + 1} / {product.images.length}
                      </div>
                    )}
                    {/* Action Buttons */}
                    <div className='absolute top-4 right-4 flex gap-2'>
                      <button
                        onClick={() => setIsLiked(!isLiked)}
                        className={`p-2 rounded-full shadow-lg transition-all duration-200 ${
                          isLiked
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 text-gray-800 hover:bg-white'
                        }`}
                      >
                        <Heart
                          className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`}
                        />
                      </button>
                      <div className='relative'>
                        <button
                          onClick={handleShare}
                          className='p-2 bg-white/90 hover:bg-white text-gray-800 rounded-full shadow-lg transition-all duration-200'
                        >
                          <Share2 className='w-5 h-5' />
                        </button>
                        {showToast && (
                          <div className='absolute top-12 right-0 bg-green-600 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap shadow-lg animate-fade-in'>
                            Nukopijuota!
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  {/* Thumbnail Gallery */}
                  {product.images.length > 1 && (
                    <div className='flex gap-2 overflow-x-auto pb-2'>
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            currentImageIndex === index
                              ? 'border-green-500 ring-2 ring-green-200'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Image
                            src={image || '/placeholder.svg'}
                            alt={`${product.title} ${index + 1}`}
                            fill
                            className='object-contain'
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* Product Info */}
                <div className='space-y-6'>
                  {/* Header */}
                  <div className='space-y-4'>
                    <div className='flex items-center gap-2'>
                      {(product.gender || product.travelType) && (
                        <Badge
                          variant='secondary'
                          className='bg-green-100 text-green-800'
                        >
                          {product.gender || product.travelType}
                        </Badge>
                      )}
                      {product.rating && (
                        <div className='flex items-center gap-1'>
                          <Star className='w-4 h-4 fill-yellow-400 text-yellow-400' />
                          <span className='text-sm font-medium'>
                            {product.rating}
                          </span>
                          <span className='text-sm text-gray-500'>
                            ({product.reviewCount} atsiliepimai)
                          </span>
                        </div>
                      )}
                    </div>
                    <h1 className='text-3xl lg:text-4xl font-bold text-gray-900'>
                      {product.title}
                    </h1>
                    <div className='flex items-center gap-4 text-gray-600'>
                      {(product.brand || product.country) && (
                        <div className='flex items-center gap-1'>
                          <MapPin className='w-4 h-4' />
                          <span className='text-sm'>
                            {product.brand || product.country}
                          </span>
                        </div>
                      )}
                      {(product.colors || product.duration) && (
                        <div className='flex items-center gap-1'>
                          <Clock className='w-4 h-4' />
                          <span className='text-sm'>
                            {product.colors || product.duration}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Price */}
                  <div className='bg-gradient-to-r from-green-50 to-yellow-50 rounded-2xl p-6 border border-green-100'>
                    <div className='flex items-baseline gap-2'>
                      <span className='text-3xl font-bold text-green-600'>
                        €{formatPrice(product.price)}
                      </span>
                      <span className='text-gray-500'>/ asmeniui</span>
                    </div>
                    <p className='text-sm text-gray-600 mt-1'>
                      Kaina gali keistis priklausomai nuo sezono
                    </p>
                  </div>
                  {/* Short Description */}
                  <div className='space-y-3'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      Pagrindinė informacija
                    </h3>
                    <p className='text-gray-700 leading-relaxed'>
                      {product.shortDescription}
                    </p>
                  </div>
                  {/* Quick Info */}
                  <div className='grid grid-cols-2 gap-4'>
                    <div className='space-y-2'>
                      <h4 className='font-medium text-gray-900'>
                        Lankomi miestai
                      </h4>
                      <p className='text-sm text-gray-600'>
                        {product.sizes || product.cities || 'Nenurodyta'}
                      </p>
                    </div>
                    <div className='space-y-2'>
                      <h4 className='font-medium text-gray-900'>Trukmė</h4>
                      <p className='text-sm text-gray-600'>
                        {product.colors || product.duration || 'Nenurodyta'}
                      </p>
                    </div>
                  </div>
                  {/* CTA Buttons */}
                  <div className='flex justify-center'>
                    <div className='w-full max-w-sm'>
                      <Button
                        title='✉️ Gauti pasiūlymą'
                        type='button'
                        onClick={() => router.push('/kontaktai')}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Content Tabs */}
          <div className='container mx-auto px-4 py-12'>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className='w-full'
            >
              <TabsList className='grid w-full grid-cols-2 lg:w-auto lg:grid-cols-2 mb-8'>
                <TabsTrigger
                  value='description'
                  className='text-base'
                  isActive={activeTab === 'description'}
                  onClick={setActiveTab}
                >
                  Aprašymas
                </TabsTrigger>
                <TabsTrigger
                  value='moreInfo'
                  className='text-base'
                  isActive={activeTab === 'moreInfo'}
                  onClick={setActiveTab}
                >
                  Daugiau informacijos
                </TabsTrigger>
              </TabsList>
              <TabsContent
                value='description'
                activeValue={activeTab}
                className='space-y-8'
              >
                {/* Travel Days */}
                {product.travelDays && (
                  <Card>
                    <CardContent className='p-6'>
                      <h3 className='text-xl font-semibold mb-6 flex items-center gap-2'>
                        <Calendar className='w-5 h-5 text-green-600' />
                        Kelionės programa
                      </h3>
                      <div className='space-y-4'>
                        {product.travelDays.map((day, idx) => (
                          <div
                            key={idx}
                            className='border border-gray-200 rounded-lg overflow-hidden hover:border-green-200 transition-colors'
                          >
                            <button
                              onClick={() => toggleDayExpansion(day.day)}
                              className='w-full p-4 text-left hover:bg-green-50 transition-colors duration-200 flex items-center justify-between'
                            >
                              <div>
                                <h4 className='font-medium text-gray-900'>
                                  {day.title}
                                </h4>
                              </div>
                              {expandedDay === day.day ? (
                                <ChevronUp className='w-5 h-5 text-green-500' />
                              ) : (
                                <ChevronDown className='w-5 h-5 text-green-500' />
                              )}
                            </button>
                            {expandedDay === day.day && (
                              <div className='px-4 pb-4 border-t border-gray-100 bg-green-50/50'>
                                <p className='text-gray-700 mt-3 leading-relaxed'>
                                  {day.description}
                                </p>
                                {/* Future: Add edit form here */}
                                {/* 
                                <div className='mt-4 space-y-2'>
                                  <input 
                                    type="text" 
                                    placeholder="Dienos pavadinimas"
                                    className="w-full p-2 border rounded"
                                  />
                                  <textarea 
                                    placeholder="Dienos aprašymas"
                                    className="w-full p-2 border rounded h-20"
                                  />
                                </div>
                                */}
                              </div>
                            )}
                          </div>
                        ))}
                        {/* Future: Add new day button */}
                        {/* 
                        <button className='w-full p-4 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-green-400 hover:text-green-600 transition-colors'>
                          + Pridėti dieną
                        </button>
                        */}
                      </div>
                    </CardContent>
                  </Card>
                )}
                {/* Description */}
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-xl font-semibold mb-4'>
                      Detalus aprašymas
                    </h3>
                    <div
                      className='description-content text-gray-700 leading-relaxed space-y-4'
                      dangerouslySetInnerHTML={{ __html: product.description }}
                      style={{
                        fontSize: '16px',
                        lineHeight: '1.7',
                        color: '#4a5568',
                      }}
                    />
                  </CardContent>
                </Card>
                {/* What's Included/Excluded */}
                <div className='grid md:grid-cols-2 gap-6'>
                  <Card>
                    <CardContent className='p-6'>
                      <h3 className='text-lg font-semibold mb-4 text-green-600 flex items-center gap-2'>
                        <CheckCircle className='w-5 h-5' />
                        Kainoje įskaičiuota
                      </h3>
                      <ul className='space-y-2'>
                        {product.included?.map((item, index) => (
                          <li key={index} className='flex items-start gap-2'>
                            <CheckCircle className='w-4 h-4 text-green-500 mt-0.5 flex-shrink-0' />
                            <span className='text-gray-700'>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className='p-6'>
                      <h3 className='text-lg font-semibold mb-4 text-red-600 flex items-center gap-2'>
                        <XCircle className='w-5 h-5' />
                        Kainoje neįskaičiuota
                      </h3>
                      <ul className='space-y-2'>
                        {product.excluded?.map((item, index) => (
                          <li key={index} className='flex items-start gap-2'>
                            <XCircle className='w-4 h-4 text-red-500 mt-0.5 flex-shrink-0' />
                            <span className='text-gray-700'>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value='moreInfo' activeValue={activeTab}>
                <Card>
                  <CardContent className='p-6'>
                    <h3 className='text-xl font-semibold mb-6 flex items-center gap-2'>
                      <Info className='w-5 h-5 text-green-600' />
                      Papildoma informacija
                    </h3>
                    <div className='grid md:grid-cols-2 gap-6'>
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-900 mb-1'>
                            Šalis
                          </label>
                          <p className='text-gray-700'>
                            {product.brand || product.country}
                          </p>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-900 mb-1'>
                            Kelionės tipas
                          </label>
                          <p className='text-gray-700'>
                            {product.gender || product.travelType}
                          </p>
                        </div>
                      </div>
                      <div className='space-y-4'>
                        <div>
                          <label className='block text-sm font-medium text-gray-900 mb-1'>
                            Lankomi miestai
                          </label>
                          <p className='text-gray-700'>
                            {product.sizes || product.cities}
                          </p>
                        </div>
                        <div>
                          <label className='block text-sm font-medium text-gray-900 mb-1'>
                            Kelionės trukmė
                          </label>
                          <p className='text-gray-700'>
                            {product.colors || product.duration}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          {/* Sticky Bottom CTA */}
          <div className='fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 lg:hidden'>
            <div className='flex justify-center'>
              <div className='w-full max-w-sm'>
                <Button
                  title='Gauti pasiūlymą'
                  type='button'
                  onClick={() => router.push('/kontaktai')}
                />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export async function getServerSideProps(context) {
  const { slug } = context.query;

  const baseUrl = context.req.headers['x-forwarded-proto']
    ? `${context.req.headers['x-forwarded-proto']}://${context.req.headers.host}`
    : `http://${context.req.headers.host}`;

  let product = null;

  try {
    // Fetch all products to find by slug
    const res = await fetch(`${baseUrl}/api/products`);

    if (res.ok) {
      const allProducts = await res.json();
      product = findBySlug(allProducts, slug);
    }
  } catch (error) {
    // Error handling for production
  }

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      product,
    },
  };
}
