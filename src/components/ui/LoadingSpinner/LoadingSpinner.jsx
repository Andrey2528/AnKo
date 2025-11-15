import React from 'react';
import './LoadingSpinner.scss';
import logoWhite from '../../../assets/images/Main logo white.svg';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner">
      <div className="loading-spinner__content">
        <img 
          src={logoWhite} 
          alt="Loading..." 
          className="loading-spinner__logo"
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
