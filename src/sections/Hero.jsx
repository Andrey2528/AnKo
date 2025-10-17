import React from 'react';
import { Container, Button } from '../components/ui';
import './Hero.scss';

/**
 * Hero Section
 * 
 * Головна секція лендінгу з основним закликом до дії
 */
const Hero = () => {
  return (
    <section id="hero" className="hero">
      <Container>
        <div className="hero__content">
          <h1 className="hero__title">
            Ваш надійний партнер у <span className="hero__highlight">цифровому світі</span>
          </h1>
          <p className="hero__description">
            Ми створюємо сучасні веб-рішення, які допомагають вашому бізнесу рости та розвиватися
          </p>
          <div className="hero__actions">
            <Button variant="primary" size="large">
              Почати проект
            </Button>
            <Button variant="outline" size="large">
              Дізнатися більше
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Hero;
