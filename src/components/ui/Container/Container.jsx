import React from 'react';
import './Container.css';

const Container = ({ children, className = '', fluid = false, ...rest }) => {
  const base = `container ${fluid ? 'container--fluid' : ''} ${className}`.trim();
  return (
    <div className={base} {...rest}>
      {children}
    </div>
  );
};

export default Container;
