/**
 * Validation Utilities
 * Утиліти для валідації форм
 */

/**
 * Валідація email
 * @param {string} email
 * @returns {boolean}
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Валідація телефону (український формат)
 * @param {string} phone
 * @returns {boolean}
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^(\+38)?0\d{9}$/;
  return phoneRegex.test(phone.replace(/\s/g, ''));
};

/**
 * Перевірка на порожнє значення
 * @param {any} value
 * @returns {boolean}
 */
export const isEmpty = (value) => {
  if (value === null || value === undefined) return true;
  if (typeof value === 'string') return value.trim() === '';
  if (Array.isArray(value)) return value.length === 0;
  if (typeof value === 'object') return Object.keys(value).length === 0;
  return false;
};
