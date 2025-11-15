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
        <div className="footer__container">
          <div className="mail">
            <a href="mailto:hello.anko@gmail.com" className="footer__link">hello.anko@gmail.com</a>
          </div>
          <div className="footer__links">
            <a href="/privacy" className="footer__link">LinkedIn</a>
            <a href="/terms" className="footer__link">Dribbble</a>
            <a href="/contact" className="footer__link">Instagram</a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
