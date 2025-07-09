import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ChevronDown, Menu, Search, Mail, MapPin } from 'lucide-react';
import { useRouter } from 'next/router';
import styles from '../styles/header.module.css';
import { createSlug } from '../utils/slugify';

interface HeaderProps {
  categories: any[];
  showCategories: boolean;
  setShowCategories: React.Dispatch<React.SetStateAction<boolean>>;
}

const HIDDEN_CATEGORY_ID = '6681319c2290aed4f9bc778e';
const SPECIAL_CATEGORY_ID = '668130de2290aed4f9bc7768';

export default function Header({
  categories,
  showCategories,
  setShowCategories,
}: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/keliones?search=${encodeURIComponent(searchQuery)}`);
  };

  const getCategoryIcon = (categoryName: string) => {
    const name = categoryName.toLowerCase();
    if (name.includes('autobus')) return '🚌';
    if (name.includes('lėktuv')) return '✈️';
    if (name.includes('aktyvios')) return '🏃‍♂️';
    if (name.includes('teatr')) return '🎭';
    return '🌍';
  };

  const renderCategories = (categories: any[]) => {
    const filteredCategories = categories.filter(
      (category) => category.id !== HIDDEN_CATEGORY_ID
    );

    return (
      <div
        className={`absolute left-0 top-full mt-2 z-50 ${
          isMobile ? 'w-screen' : 'w-80'
        }`}
      >
        <div className='bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-button/10 to-primary/10 px-4 py-3 border-b border-gray-100'>
            <h3 className='font-semibold text-gray-800 text-sm'>
              Kelionių kategorijos
            </h3>
          </div>

          {/* Categories Grid */}
          <div className='p-4'>
            <div
              className={`grid gap-2 ${
                isMobile ? 'grid-cols-1' : 'grid-cols-2'
              }`}
            >
              {filteredCategories.map((category) => (
                <Link
                  key={category.id}
                  href={
                    category.id === SPECIAL_CATEGORY_ID
                      ? '/keliones'
                      : `/kategorijos/${createSlug(category.name)}`
                  }
                  onClick={() => setShowCategories(false)}
                >
                  <div className='group flex items-center gap-3 p-3 rounded-xl hover:bg-gradient-to-r hover:from-button/10 hover:to-primary/10 transition-all duration-300 border border-transparent hover:border-button/20'>
                    <div className='text-2xl'>
                      {getCategoryIcon(category.name)}
                    </div>
                    <div className='flex-1 min-w-0'>
                      <h4 className='font-medium text-gray-800 group-hover:text-button transition-colors text-sm truncate'>
                        {category.name}
                      </h4>
                      <p className='text-xs text-gray-500 truncate'>
                        {category.id === SPECIAL_CATEGORY_ID
                          ? 'Visos kelionės'
                          : 'Peržiūrėti pasiūlymus'}
                      </p>
                    </div>
                    <ChevronDown className='w-4 h-4 text-gray-400 group-hover:text-button transition-all transform group-hover:translate-x-1 rotate-[-90deg]' />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className='bg-gray-50 px-4 py-3 border-t border-gray-100'>
            <Link
              href='/kategorijos'
              onClick={() => setShowCategories(false)}
              className='text-sm text-button hover:text-hover3 font-medium flex items-center gap-2'
            >
              <MapPin className='w-4 h-4' />
              Peržiūrėti visas kategorijas
            </Link>
          </div>
        </div>
      </div>
    );
  };

  const toggleCategories = () => {
    setShowCategories(!showCategories);
  };

  useEffect(() => {
    const handleRouteChange = () => {
      setShowCategories(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('[data-dropdown]')) {
        setShowCategories(false);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [router.events, setShowCategories]);

  return (
    <>
      <header className='bg-white sticky top-0 z-40 w-full shadow-lg border-b border-gray-200'>
        <div className='mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 lg:px-6'>
          {/* Categories Dropdown */}
          <div className='relative' data-dropdown>
            <button
              onClick={toggleCategories}
              className={`inline-flex items-center gap-2 px-4 py-2 bg-button hover:bg-hover3 text-white font-medium rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${
                showCategories ? 'bg-hover3 scale-[1.02]' : ''
              }`}
            >
              <Menu className='w-4 h-4' />
              <span className='hidden sm:inline'>Kategorijos</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showCategories ? 'rotate-180' : ''
                }`}
              />
            </button>

            {showCategories &&
              categories &&
              categories.length > 0 &&
              renderCategories(categories)}
          </div>

          {/* Search Form */}
          <form
            onSubmit={handleSearchSubmit}
            className='flex items-center gap-2 flex-1 max-w-md mx-4'
          >
            <div className='relative flex-1'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400' />
              <input
                type='text'
                placeholder='Ieškoti kelionių...'
                value={searchQuery}
                onChange={handleSearchChange}
                className='w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-button/20 focus:border-button transition-all duration-300 bg-gray-50 hover:bg-white'
              />
            </div>
            <button
              type='submit'
              className='px-4 py-2 bg-primary hover:bg-primary/90 text-white rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] whitespace-nowrap'
            >
              <span className='hidden sm:inline'>Ieškoti</span>
              <Search className='w-4 h-4 sm:hidden' />
            </button>
          </form>

          {/* Contact Button */}
          <Link href='/kontaktai'>
            <button className='inline-flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-button border border-gray-200 hover:border-button/30 rounded-xl transition-all duration-300 hover:bg-button/5'>
              <Mail className='w-4 h-4 text-button' />
              <span className='hidden lg:inline'>Gauti pasiūlymą!</span>
              <span className='lg:hidden'>Kontaktai</span>
            </button>
          </Link>
        </div>
      </header>
    </>
  );
}
