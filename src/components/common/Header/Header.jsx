import React, { useState, useEffect } from 'react';
import { Container, Button } from '../../ui';
import './Header.scss';

/**
 * Header Component
 * 
 * Шапка сайту з навігацією та логотипом
 */
const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Блокування прокрутки body коли меню відкрите
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Work', href: '#work' },
    { label: 'Services', href: '#services' },
    { label: 'How', href: '#how' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'F.A.Q.', href: '#faq' },
    { label: 'Contact', href: '#contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <Container>
        <div className="header__content">
          <a href="#hero" className="header__logo">
            <img src="/src/assets/images/Main logo white.svg" alt="AnKo Logo" />
          </a>

          {/* Backdrop для мобільного меню */}
          {isMobileMenuOpen && (
            <div 
              className="header__backdrop"
              onClick={() => setIsMobileMenuOpen(false)}
            />
          )}

          <nav className={`header__nav ${isMobileMenuOpen ? 'header__nav--open' : ''}`}>
            {navItems.map((item, index) => (
              <a 
                key={index}
                href={item.href} 
                className="header__nav-item"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button 
            className={`header__burger ${isMobileMenuOpen ? 'header__burger--active' : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </Container>
    </header>
  );
};

export default Header;
