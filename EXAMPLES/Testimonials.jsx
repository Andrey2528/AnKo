import React from 'react';
import { Container, Card } from '../components/ui';
import './Testimonials.scss';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Олена Іваненко',
      position: 'CEO, Tech Company',
      avatar: '/images/avatar1.jpg',
      text: 'Чудова робота! Команда AnKo створила для нас ідеальний сайт. Професіонали своєї справи.',
      rating: 5
    },
    {
      name: 'Дмитро Козак',
      position: 'Засновник стартапу',
      avatar: '/images/avatar2.jpg',
      text: 'Швидко, якісно та за розумну ціну. Рекомендую всім, хто шукає надійних розробників.',
      rating: 5
    },
    {
      name: 'Анна Мельник',
      position: 'Маркетинг-директор',
      avatar: '/images/avatar3.jpg',
      text: 'Перевершили всі наші очікування. Результат просто вражаючий!',
      rating: 5
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <Container>
        <div className="testimonials__header">
          <h2>Відгуки клієнтів</h2>
          <p>Що кажуть про нас наші клієнти</p>
        </div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="testimonials__card">
              <div className="testimonials__rating">
                {'★'.repeat(testimonial.rating)}
              </div>
              <p className="testimonials__text">"{testimonial.text}"</p>
              <div className="testimonials__author">
                <img src={testimonial.avatar} alt={testimonial.name} />
                <div>
                  <h4>{testimonial.name}</h4>
                  <p>{testimonial.position}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Testimonials;
