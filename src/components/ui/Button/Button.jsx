import React from 'react';
import './Button.scss';

/**
 * Button Component
 * 
 * Універсальний компонент кнопки з різними варіантами стилізації
 * 
 * @param {Object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст кнопки
 * @param {string} props.variant - Варіант стилю: 'primary' | 'secondary' | 'outline' | 'ghost'
 * @param {string} props.size - Розмір: 'small' | 'medium' | 'large'
 * @param {Function} props.onClick - Обробник кліку
 * @param {boolean} props.disabled - Чи вимкнена кнопка
 * @param {string} props.className - Додаткові CSS класи
 * 
 * @example
 * <Button variant="primary" size="medium" onClick={handleClick}>
 *   Натисни мене
 * </Button>
 */
const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  fullWidth = false,
  ...props 
}) => {
  return (
    <button
      className={`btn btn--${variant} btn--${size} ${fullWidth ? 'btn--full' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
