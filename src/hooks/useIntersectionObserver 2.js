import { useState, useEffect } from 'react';

/**
 * useIntersectionObserver Hook
 * 
 * Хук для відстеження видимості елементів на екрані
 * Корисний для анімацій при скролі
 * 
 * @param {Object} options - Опції для IntersectionObserver
 * @returns {Array} [ref, isVisible] - Реф для елемента та стан видимості
 * 
 * @example
 * const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });
 * 
 * return (
 *   <div ref={ref} className={isVisible ? 'fade-in' : ''}>
 *     Content
 *   </div>
 * );
 */
const useIntersectionObserver = (options = {}) => {
  const [ref, setRef] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!ref) return;

    const observer = new IntersectionObserver(([entry]) => {
      setIsVisible(entry.isIntersecting);
    }, {
      threshold: 0.1,
      ...options
    });

    observer.observe(ref);

    return () => {
      if (ref) {
        observer.unobserve(ref);
      }
    };
  }, [ref, options]);

  return [setRef, isVisible];
};

export default useIntersectionObserver;
