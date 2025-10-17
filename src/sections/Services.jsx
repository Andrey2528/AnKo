import React from 'react';
import { Container, Card, Button } from '../components/ui';
import './Services.scss';

/**
 * Services Section
 * 
 * Секція з послугами компанії
 */
const Services = () => {
  const services = [
    {
      title: 'Веб-розробка',
      description: 'Створення сучасних та функціональних веб-додатків на React, Vue, Angular',
      icon: '💻'
    },
    {
      title: 'UI/UX Дизайн',
      description: 'Розробка інтуїтивних інтерфейсів, що покращують користувацький досвід',
      icon: '🎨'
    },
    {
      title: 'Мобільні додатки',
      description: 'Нативні та крос-платформні мобільні додатки для iOS та Android',
      icon: '📱'
    },
    {
      title: 'SEO та Маркетинг',
      description: 'Просування сайтів у пошукових системах та цифровий маркетинг',
      icon: '📈'
    },
    {
      title: 'E-commerce',
      description: 'Розробка онлайн-магазинів та систем електронної комерції',
      icon: '🛒'
    },
    {
      title: 'Консалтинг',
      description: 'Технічне консультування та аудит існуючих систем',
      icon: '💡'
    }
  ];

  return (
    <section id="services" className="services">
      <Container>
        <div className="services__header">
          <h2 className="services__title">Наші послуги</h2>
          <p className="services__subtitle">
            Комплексні рішення для вашого бізнесу
          </p>
        </div>

        <div className="services__grid">
          {services.map((service, index) => (
            <Card key={index} hover className="services__card">
              <div className="services__icon">{service.icon}</div>
              <h3 className="services__card-title">{service.title}</h3>
              <p className="services__card-description">{service.description}</p>
              <Button variant="ghost" size="small">
                Детальніше →
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
