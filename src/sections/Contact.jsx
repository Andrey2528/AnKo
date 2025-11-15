import React, { useEffect, useState } from 'react';
import { Container, Button } from '../components/ui';
import './Contact.scss';
import { loadHomeSections } from '../api/firestore/homeSections';

/**
 * Contact Section
 * 
 * Секція з контактною формою
 */
const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const sections = await loadHomeSections();
        setContactData(sections.contact);
      } catch (error) {
        console.error('Error loading contact data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Обробка форми
    console.log('Form submitted');
  };

  if (loading || !contactData) return null;

  const fields = contactData.formFields || {};

  return (
    <section id="contact" className="contact">
      <Container size="narrow">
        <div className="contact__header">
          <h2 className="contact__title">{contactData.title}</h2>
          <p className="contact__subtitle">
            {contactData.subtitle}
          </p>
        </div>

        <form className="contact__form" onSubmit={handleSubmit}>
          <div className="contact__form-group">
            <label htmlFor="name">{fields.nameLabel}</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              placeholder={fields.namePlaceholder}
              required 
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="email">{fields.emailLabel}</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              placeholder={fields.emailPlaceholder}
              required 
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="phone">{fields.phoneLabel}</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              placeholder={fields.phonePlaceholder} 
            />
          </div>

          <div className="contact__form-group">
            <label htmlFor="message">{fields.messageLabel}</label>
            <textarea 
              id="message" 
              name="message" 
              rows="5" 
              placeholder={fields.messagePlaceholder}
              required
            ></textarea>
          </div>

          <Button type="submit" variant="primary" size="large" fullWidth>
            {contactData.submitButtonText}
          </Button>
        </form>
      </Container>
    </section>
  );
};

export default Contact;
