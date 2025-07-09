import Link from 'next/link';
import { useContext, useState } from 'react';
import { CartContext } from '../lib/CartContext';
import toast from 'react-hot-toast';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { createSlug } from '../utils/slugify';
import { FloatingGlassCard } from './Cards';
import { ArrowRight, Sparkles, TrendingUp } from 'lucide-react';

const formatPrice = (price) => {
  return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export default function Products({ products }) {
  const { addProduct } = useContext(CartContext);
  const [likedProducts, setLikedProducts] = useState(new Set());
  const router = useRouter();

  // Sort products by date (newest first) and limit to 6 for homepage
  const featuredProducts = [...products]
    .sort((a, b) => {
      const dateA = new Date(a.date || a.createdAt || 0);
      const dateB = new Date(b.date || b.createdAt || 0);
      return dateB - dateA;
    })
    .slice(0, 6);

  const handleToggleLike = (productId) => {
    setLikedProducts((prev) => {
      const newLiked = new Set(prev);
      if (newLiked.has(productId)) {
        newLiked.delete(productId);
        toast.success('Pašalinta iš mėgstamų');
      } else {
        newLiked.add(productId);
        toast.success('Pridėta į mėgstamus');
      }
      return newLiked;
    });
  };

  const handleProductClick = (productId, productTitle) => {
    if (!productId || !productTitle) {
      return;
    }
    const slug = createSlug(productTitle);
    router.push(`/keliones/${slug}`);
  };

  return (
    <section className='py-16 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='text-center mb-12'>
          <div className='inline-flex items-center gap-2 bg-gradient-to-r from-button/10 to-primary/10 px-4 py-2 rounded-full mb-4'>
            <TrendingUp className='w-4 h-4 text-button' />
            <span className='text-sm font-medium text-button'>
              Populiariausi pasiūlymai
            </span>
          </div>
          <h2 className='text-3xl lg:text-4xl font-bold text-gray-800 mb-4'>
            Naujausios kelionių programos
          </h2>
          <p className='text-gray-600 max-w-2xl mx-auto text-lg'>
            Atraskite įspūdingiausias keliones ir nepamirštamus nuotykius su
            mūsų kruopščiai parinktais maršrutais
          </p>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12'>
          {featuredProducts.map((product, index) => (
            <div
              key={product.id || product._id}
              className='transform transition-all duration-300 hover:scale-[1.02]'
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <FloatingGlassCard
                product={product}
                onProductClick={handleProductClick}
                onToggleLike={handleToggleLike}
                likedProducts={likedProducts}
                formatPrice={formatPrice}
              />
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className='text-center'>
          <div className='inline-flex flex-col sm:flex-row items-center gap-4 bg-white rounded-2xl p-6 shadow-lg border border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-12 h-12 bg-gradient-to-r from-button to-primary rounded-full flex items-center justify-center'>
                <Sparkles className='w-6 h-6 text-white' />
              </div>
              <div className='text-left'>
                <h3 className='font-semibold text-gray-800'>
                  Daugiau kelionių laukia!
                </h3>
                <p className='text-gray-600 text-sm'>
                  Peržiūrėkite visą katalogą
                </p>
              </div>
            </div>
            <Link
              href='/keliones'
              className='inline-flex items-center gap-2 bg-button hover:bg-hover3 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg whitespace-nowrap'
            >
              Žiūrėti visas keliones
              <ArrowRight className='w-4 h-4' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
