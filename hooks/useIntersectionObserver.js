import { useEffect, useRef, useState } from 'react';

const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Lazy loading wrapper component
const LazySection = ({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '50px',
  fallback = null,
}) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold,
    rootMargin,
  });

  return (
    <div ref={elementRef} className={className}>
      {hasIntersected ? children : fallback}
    </div>
  );
};

export { useIntersectionObserver, LazySection };
