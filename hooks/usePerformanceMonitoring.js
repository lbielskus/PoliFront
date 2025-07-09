import { useEffect } from 'react';

const usePerformanceMonitoring = () => {
  useEffect(() => {
    // Only run in production
    if (process.env.NODE_ENV !== 'production') return;

    // Core Web Vitals monitoring
    const getCLS = () => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            if (!entry.hadRecentInput) {
              resolve(entry.value);
            }
          });
        }).observe({ entryTypes: ['layout-shift'] });
      });
    };

    const getFID = () => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            resolve(entry.processingStart - entry.startTime);
          });
        }).observe({ entryTypes: ['first-input'] });
      });
    };

    const getLCP = () => {
      return new Promise((resolve) => {
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.startTime);
        }).observe({ entryTypes: ['largest-contentful-paint'] });
      });
    };

    // Report to analytics (optional)
    const reportWebVitals = async () => {
      try {
        const [cls, fid, lcp] = await Promise.all([
          getCLS(),
          getFID(),
          getLCP(),
        ]);

        // You can send this data to your analytics service
        // Example: Google Analytics, Sentry, etc.
        if (window.gtag) {
          window.gtag('event', 'web_vitals', {
            cls,
            fid,
            lcp,
          });
        }
      } catch (error) {
        // Silent fail for performance monitoring
      }
    };

    // Run after page load
    if (document.readyState === 'complete') {
      reportWebVitals();
    } else {
      window.addEventListener('load', reportWebVitals);
    }

    return () => {
      window.removeEventListener('load', reportWebVitals);
    };
  }, []);
};

export default usePerformanceMonitoring;
