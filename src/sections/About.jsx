import React from 'react';
import { Container, Card } from '../components/ui';
import './About.scss';

/**
 * About Section
 * 
 * Секція "Про компанію"
 */
const About = () => {
  const stats = [
    { value: '100+', label: 'Проектів' },
    { value: '50+', label: 'Клієнтів' },
    { value: '5+', label: 'Років досвіду' },
    { value: '24/7', label: 'Підтримка' }
  ];

  return (
    <section id="about" className="about">
      <Container>
        <div className="about__header">
          <h2 className="about__title">Про нас</h2>
          <p className="about__subtitle">
            Ми команда професіоналів, які створюють цифрові рішення
          </p>
        </div>

        <div className="about__content">
          <div className="about__text">
            <h3>Наша місія</h3>
            <p>
              Ми прагнемо допомагати бізнесу досягати своїх цілей через інноваційні 
              технологічні рішення. Наша команда спеціалізується на розробці веб-додатків, 
              дизайні та цифровому маркетингу.
            </p>
            <p>
              З роками досвіду ми навчилися розуміти потреби наших клієнтів і 
              створювати продукти, які приносять реальну цінність.
            </p>
          </div>

          <div className="about__stats">
            {stats.map((stat, index) => (
              <Card key={index} className="about__stat-card">
                <div className="about__stat-value">{stat.value}</div>
                <div className="about__stat-label">{stat.label}</div>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default About;
