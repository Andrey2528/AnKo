import React from 'react';
import './Container.scss';

/**
 * Container Component
 * 
 * Контейнер для центрування контенту з обмеженням максимальної ширини
 * 
 * @param {Object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст контейнера
 * @param {string} props.size - Розмір: 'default' | 'narrow' | 'wide' | 'fluid'
 * @param {string} props.className - Додаткові CSS класи
 * 
 * @example
 * <Container size="narrow">
 *   <h1>Заголовок</h1>
 *   <p>Контент</p>
 * </Container>
 */
const Container = ({ 
  children, 
  className = '', 
  size = 'default',
  ...props 
}) => {
  const containerClasses = [
    'container',
    size !== 'default' && `container--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses} {...props}>
      {children}
    </div>
  );
};

export default Container;
