import { useState, useEffect, useCallback } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const BackToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Use useCallback to prevent unnecessary re-renders
  const handleScroll = useCallback(() => {
    const scrolled = window.pageYOffset;
    setIsVisible(scrolled > 400);
  }, []);

  useEffect(() => {
    // Throttle scroll events for better performance
    let ticking = false;

    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, [handleScroll]);

  const scrollToTop = useCallback(() => {
    // Enhanced smooth scroll with custom easing
    const startPosition = window.pageYOffset;
    const startTime = performance.now();
    const duration = 800; // ms

    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const animateScroll = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = easeOutCubic(progress);

      window.scrollTo(0, startPosition * (1 - ease));

      if (progress < 1) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  return (
    <button
      className={`fixed bottom-4 left-4 bg-button text-white p-3 rounded-full shadow-md transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
      aria-label='Scroll to top'
    >
      <FaArrowUp />
    </button>
  );
};

export default BackToTopButton;
