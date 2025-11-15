import React from 'react';
import './Form_container.scss';

/**
 * Form Container Component
 * 
 * Контейнер для форм із стилізованим фоном та padding
 * Використовується в Pricing та Contact секціях
 * 
 * @param {React.ReactNode} children - Вміст контейнера
 * @param {string} className - Додатковий клас
 */
const FormContainer = ({ children, className = '' }) => {
  return (
    <div className={`form-container ${className}`}>
      {children}
    </div>
  );
};

export default FormContainer;