import React, { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true, // Always required
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookie-consent');
    if (!consent) {
      setIsVisible(true);
    } else {
      const savedPreferences = JSON.parse(consent);
      setPreferences(savedPreferences);

      // Initialize analytics based on saved preferences
      if (savedPreferences.analytics) {
        initializeAnalytics();
      }
    }
  }, []);

  const initializeAnalytics = () => {
    // Initialize Google Analytics or other analytics here
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: 'granted',
      });
    }
  };

  const handleAcceptAll = () => {
    const allPreferences = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setPreferences(allPreferences);
    localStorage.setItem('cookie-consent', JSON.stringify(allPreferences));
    setIsVisible(false);
    initializeAnalytics();
  };

  const handleAcceptSelected = () => {
    localStorage.setItem('cookie-consent', JSON.stringify(preferences));
    setIsVisible(false);
    if (preferences.analytics) {
      initializeAnalytics();
    }
  };

  const handleRejectNonEssential = () => {
    const essentialOnly = {
      necessary: true,
      analytics: false,
      marketing: false,
    };
    setPreferences(essentialOnly);
    localStorage.setItem('cookie-consent', JSON.stringify(essentialOnly));
    setIsVisible(false);
  };

  const togglePreference = (type) => {
    if (type === 'necessary') return; // Can't disable necessary cookies
    setPreferences((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className='fixed inset-0 bg-black/50 backdrop-blur-sm z-50' />

      {/* Cookie Consent Modal */}
      <div className='fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50'>
        <div className='bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden'>
          {/* Header */}
          <div className='bg-gradient-to-r from-button/10 to-primary/10 px-6 py-4 border-b border-gray-100'>
            <div className='flex items-center gap-3'>
              <div className='w-8 h-8 bg-button/20 rounded-full flex items-center justify-center'>
                <Cookie className='w-4 h-4 text-button' />
              </div>
              <h3 className='font-semibold text-gray-800'>
                Slapukai ir privatumas
              </h3>
            </div>
          </div>

          {/* Content */}
          <div className='p-6'>
            {!showSettings ? (
              <>
                <p className='text-gray-600 text-sm mb-4 leading-relaxed'>
                  Mes naudojame slapukus, kad pagerintume jūsų naršymo patirtį
                  ir analizuotume svetainės lankytojų srautus. Jūs galite
                  pasirinkti, kokius slapukus priimti.
                </p>

                <div className='flex flex-col gap-3'>
                  <button
                    onClick={handleAcceptAll}
                    className='w-full bg-button hover:bg-hover3 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02]'
                  >
                    Priimti visus
                  </button>

                  <div className='flex gap-2'>
                    <button
                      onClick={() => setShowSettings(true)}
                      className='flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-all duration-300 flex items-center justify-center gap-2'
                    >
                      <Settings className='w-4 h-4' />
                      Nustatymai
                    </button>

                    <button
                      onClick={handleRejectNonEssential}
                      className='flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-2 px-4 rounded-xl font-medium transition-all duration-300'
                    >
                      Tik būtini
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className='mb-4'>
                  <button
                    onClick={() => setShowSettings(false)}
                    className='text-gray-500 hover:text-gray-700 mb-2'
                  >
                    ← Atgal
                  </button>
                  <h4 className='font-medium text-gray-800 mb-3'>
                    Slapukų nustatymai
                  </h4>
                </div>

                <div className='space-y-4 mb-6'>
                  {/* Necessary Cookies */}
                  <div className='flex items-center justify-between p-3 bg-gray-50 rounded-xl'>
                    <div className='flex-1'>
                      <h5 className='font-medium text-gray-800 text-sm'>
                        Būtini slapukai
                      </h5>
                      <p className='text-xs text-gray-600'>
                        Reikalingi svetainės veikimui
                      </p>
                    </div>
                    <div className='w-8 h-8 bg-green-100 rounded-full flex items-center justify-center'>
                      <Check className='w-4 h-4 text-green-600' />
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className='flex items-center justify-between p-3 border border-gray-200 rounded-xl'>
                    <div className='flex-1'>
                      <h5 className='font-medium text-gray-800 text-sm'>
                        Analitikos slapukai
                      </h5>
                      <p className='text-xs text-gray-600'>
                        Padeda mums suprasti, kaip naudojate svetainę
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('analytics')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        preferences.analytics ? 'bg-button' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                          preferences.analytics
                            ? 'translate-x-6'
                            : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Marketing Cookies */}
                  <div className='flex items-center justify-between p-3 border border-gray-200 rounded-xl'>
                    <div className='flex-1'>
                      <h5 className='font-medium text-gray-800 text-sm'>
                        Rinkodaros slapukai
                      </h5>
                      <p className='text-xs text-gray-600'>
                        Naudojami personalizuotai reklamai
                      </p>
                    </div>
                    <button
                      onClick={() => togglePreference('marketing')}
                      className={`w-12 h-6 rounded-full transition-all duration-300 ${
                        preferences.marketing ? 'bg-button' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 bg-white rounded-full shadow-md transition-all duration-300 transform ${
                          preferences.marketing
                            ? 'translate-x-6'
                            : 'translate-x-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className='flex gap-3'>
                  <button
                    onClick={handleAcceptSelected}
                    className='flex-1 bg-button hover:bg-hover3 text-white py-3 px-4 rounded-xl font-medium transition-all duration-300'
                  >
                    Išsaugoti nustatymus
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Privacy Policy Link */}
          <div className='px-6 py-3 bg-gray-50 border-t border-gray-100'>
            <p className='text-xs text-gray-500 text-center'>
              Daugiau informacijos{' '}
              <a
                href='/sub/privatumo-politika'
                className='text-button hover:underline'
              >
                privatumo politikoje
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CookieConsent;
