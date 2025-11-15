import React, { useEffect, useState } from 'react';
import { Container, Button } from '../components/ui';
import './Hero.scss';
import './top_bg.scss';
import { Header } from '@/components/common';
import { loadHomeSections, onHomeSectionsChange, offHomeSectionsChange } from '../api/homeSections';

/**
 * Hero Section
 * 
 * Головна секція лендінгу з основним закликом до дії
 */
const Hero = () => {
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const sections = loadHomeSections();
    setHeroData(sections.hero);

    function handleChange() {
      const sections = loadHomeSections();
      setHeroData(sections.hero);
    }

    onHomeSectionsChange(handleChange);
    return () => offHomeSectionsChange(handleChange);
  }, []);

  if (!heroData) return null;

  return (
    <div className='top_bg'>

    <Header/>

    <section id="hero" className="hero">
      {/* Animated gradient background */}
      <div className="hero__bg">
        <div className="hero__bg-orb hero__bg-orb--blue"></div>
        <div className="hero__bg-orb hero__bg-orb--cyan"></div>
        <div className="hero__bg-orb hero__bg-orb--yellow"></div>
      </div>

      <Container>
        <div className="hero__content">
          <h1 className="hero__title">
            We’re not your
<span className="hero__highlight"> ordinary </span> digital
studio.

          </h1>

        </div>
        <a href={heroData.buttonLink} className='hero__btn'>
          {heroData.buttonText}
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_384_344)">
            <path d="M6.65513 28.639L35.2942 0L40 4.70591L11.361 33.3448H36.6032V39.9999H0V3.39685H6.65513V28.639Z" fill="#F1F4FF" fill-opacity="0.8"/>
            </g>
            <defs>
            <clipPath id="clip0_384_344">
            <rect width="40" height="40" fill="white"/>
            </clipPath>
            </defs>
            </svg>

          </a>
      </Container>
    </section>
    </div>
  );
};

export default Hero;
