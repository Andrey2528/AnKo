import React from 'react';
import { Container, Button } from '../components/ui';
import './Contact.scss';

/**
 * Contact Section
 * 
 * Секція з контактною формою
 */
const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Обробка форми
    console.log('Form submitted');
  };

  return (
    <section id="contact" className="contact">
      <Container size="narrow">
        <div className="contact__header">
          <h2 className="contact__title">Зв'яжіться з нами</h2>
          <p className="contact__subtitle">
            Готові почати ваш проект? Напишіть нам!
          </p>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-group">
            <label htmlFor="name">Ім'я</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder="Ваше ім'я"
              required 
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder="your@email.com"
              required 
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="phone">Телефон</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder="+380 XX XXX XX XX" 
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="message">Повідомлення</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              placeholder="Розкажіть про ваш проект..."
              required
            ></textarea>
          </div>

          <Button type="submit" variant="primary" size="large" fullWidth>
            Відправити повідомлення
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default Contact;
