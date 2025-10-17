import React from 'react';
import './Card.scss';

/**
 * Card Component
 * 
 * Компонент картки для відображення контенту з різними стилями
 * 
 * @param {Object} props - Властивості компонента
 * @param {React.ReactNode} props.children - Вміст картки
 * @param {boolean} props.hover - Чи має картка ефект при наведенні
 * @param {string} props.variant - Варіант стилю: 'default' | 'bordered' | 'elevated'
 * @param {string} props.className - Додаткові CSS класи
 * 
 * @example
 * <Card hover variant="elevated">
 *   <div className="card__header">
 *     <h3>Заголовок</h3>
 *   </div>
 *   <div className="card__content">
 *     <p>Контент картки</p>
 *   </div>
 * </Card>
 */
const Card = ({ 
  children, 
  className = '',
  hover = false,
  variant = 'default',
  ...props 
}) => {
  const cardClasses = [
    'card',
    hover && 'card--hover',
    variant !== 'default' && `card--${variant}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={cardClasses} {...props}>
      {children}
    </div>
  );
};

export default Card;
