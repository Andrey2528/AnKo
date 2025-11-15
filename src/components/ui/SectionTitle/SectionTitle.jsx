import React from 'react';
import './SectionTitle.scss';

const SectionTitle = ({ title, theme = 'dark' }) => {
  return (
    <h2 className={`section__title ${theme}`}>
      {title}
    </h2>
  );
};

export default SectionTitle;