import React from 'react';
import { Container } from '../../ui';
import './Footer.scss';

/**
 * Footer Component
 * 
 * Підвал сайту з контактною інформацією та посиланнями
 */
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <Container>
        <div className="footer__content">
          <div className="footer__section">
            <h3 className="footer__title">AnKo</h3>
            <p className="footer__description">
              Професійні рішення для вашого бізнесу
            </p>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Навігація</h4>
            <ul className="footer__links">
              <li><a href="#about">Про нас</a></li>
              <li><a href="#services">Послуги</a></li>
              <li><a href="#portfolio">Портфоліо</a></li>
              <li><a href="#contact">Контакти</a></li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Контакти</h4>
            <ul className="footer__links">
              <li>Email: info@anko.com</li>
              <li>Телефон: +380 XX XXX XX XX</li>
              <li>Адреса: м. Київ, Україна</li>
            </ul>
          </div>

          <div className="footer__section">
            <h4 className="footer__subtitle">Соціальні мережі</h4>
            <div className="footer__socials">
              <a href="#" aria-label="Facebook">FB</a>
              <a href="#" aria-label="Instagram">IG</a>
              <a href="#" aria-label="LinkedIn">LI</a>
            </div>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {currentYear} AnKo. Всі права захищені.</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
