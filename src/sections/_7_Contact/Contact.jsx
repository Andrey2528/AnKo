import React, { useEffect, useState } from 'react';
import { Container, Button, Marquee, FormContainer } from '../../components/ui';
import './Contact.scss';
import { loadHomeSections } from '../../api/firestore/homeSections';
import { Footer } from '@/components/common';

/**
 * Contact Section
 * 
 * Секція з контактною формою
 */
const Contact = () => {
  const [contactData, setContactData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    project: '',
    email: '',
    acceptPolicy: false
  });

  const marqueContactText = "Let's reach out and work together. Let's reach out and work together.";

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.acceptPolicy) {
      alert('Please accept the privacy policy');
      return;
    }
    console.log('Form submitted:', formData);
    // TODO: Додати відправку форми
  };

  if (loading || !contactData) return null;

  return (
    <>
      <section id="contact" className="contact">
        <Marquee direction="left" speed={60} pauseOnHover={false}>
          {marqueContactText}
        </Marquee>
        <Container size="narrow">
          <FormContainer>
            <form className="contact__form" onSubmit={handleSubmit}>
              {/* Name Field */}
              <div className="contact__field">
                <div className="contact__label-wrapper">
                  <label htmlFor="name" className="option-button active ">HELLO, I'M</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="option-button contact__input"
                    placeholder="YOUR NAME"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              {/* Company Field */}
              <div className="contact__field">
                <div className="contact__label-wrapper">
                  <label htmlFor="company" className="option-button active ">FROM</label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    className="option-button contact__input "
                    placeholder="COMPANY NAME"
                    value={formData.company}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Project Field */}
              <div className="contact__field contact__field--wide">
                <div className="option-button active ">
                  I BELIEVE WE COULD DO AN AMAZING
                </div>
                <div className="contact__combined">
                  <input
                    type="text"
                    id="project"
                    name="project"
                    className="option-button contact__input "
                    placeholder="PROJECT"
                    value={formData.project}
                    onChange={handleChange}
                    required
                  />
                  <span className="option-button active ">TOGETHER.</span>
                </div>
              </div>

              {/* Email Field */}
              <div className="contact__field">
                <div className="option-button active ">
                  CAN YOU PLEASE CONTACT ME AT
                </div>
                <div className="contact__email-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="option-button contact__input"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  <button type="button" className="contact__help-button">
                    ?
                  </button>
                </div>
              </div>

              {/* Privacy Policy */}
              <div className="contact__footer">
                <div className="contact__policy">
                  <span className="contact__policy-text">
                    HERE YOU CAN READ UOR PRIVACY POLICY
                  </span>
                  <div className="contact__row">
                    <label className="contact__checkbox-wrapper">
                      <input
                        type="checkbox"
                        name="acceptPolicy"
                        className="contact__checkbox"
                        checked={formData.acceptPolicy}
                        onChange={handleChange}
                        required
                      />
                      <span className="contact__checkbox-custom"></span>
                    </label>

                    <button type="button" className="contact__policy-button">
                      I ACCEPT
                    </button>
                  </div>
                </div>

                <Button type="submit" className="contact__submit">
                  SEND <span className="contact__arrow">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.0069 6.81661L2.82353 24L0 21.1765L17.1834 3.99308H2.03811V0H24V21.9619H20.0069V6.81661Z" fill="#EAF5F5"/>
</svg>

                  </span>
                </Button>
              </div>
            </form>
          </FormContainer>
        </Container>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
