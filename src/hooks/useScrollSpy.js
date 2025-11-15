import { useState, useEffect } from 'react';

/**
 * useScrollSpy Hook
 * 
 * Хук для відстеження активної секції при скролі
 * Корисний для навігації по сторінці
 * 
 * @param {Array} sectionIds - Масив ID секцій для відстеження
 * @param {number} offset - Зміщення від верху (за замовчуванням 100)
 * @returns {string} activeSection - ID активної секції
 * 
 * @example
 * const activeSection = useScrollSpy(['hero', 'about', 'services']);
 * 
 * <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>
 *   Home
 * </a>
 */
const useScrollSpy = (sectionIds, offset = 100) => {
  const [activeSection, setActiveSection] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset;

      for (const sectionId of sectionIds) {
        const section = document.getElementById(sectionId);
        if (section) {
          const { offsetTop, offsetHeight } = section;
          
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Викликаємо одразу для початкової позиції

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeSection;
};

export default useScrollSpy;
