import React from 'react';
import './Option_button.scss';

/**
 * Option Button Component
 * 
 * Кнопка вибору опції для форм та калькуляторів
 * @param {boolean} active - Чи активна кнопка
 * @param {function} onClick - Обробник кліку
 * @param {string} children - Текст кнопки
 * @param {string} className - Додатковий клас
 */
const Form_container = ({ active = false, onClick, children, className = '' }) => {
  return (
    <button
      className={`option-button ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
};

export default Form_container;