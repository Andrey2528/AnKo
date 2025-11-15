/**
 * Scroll Utilities
 * Утиліти для роботи зі скролом
 */

/**
 * Плавний скрол до елемента
 * @param {string} elementId - ID елемента
 * @param {number} offset - Зміщення від верху
 */
export const scrollToElement = (elementId, offset = 80) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

/**
 * Перевірка, чи елемент видимий на екрані
 * @param {HTMLElement} element - DOM елемент
 * @returns {boolean}
 */
export const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};
