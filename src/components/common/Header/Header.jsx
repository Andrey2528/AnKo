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

  const navItems = [
    { label: 'Головна', href: '#hero' },
    { label: 'Про нас', href: '#about' },
    { label: 'Послуги', href: '#services' },
    { label: 'Портфоліо', href: '#portfolio' },
    { label: 'Команда', href: '#team' },
    { label: 'Контакти', href: '#contact' }
  ];

  return (
    <header className={`header ${isScrolled ? 'header--scrolled' : ''}`}>
      <Container>
        <div className="header__content">
          <div className="header__logo">
            <a href="#hero">AnKo</a>
          </div>

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

          <div className="header__actions">
            <Button variant="primary" size="small">
              Зв'язатися
            </Button>
          </div>

          <button 
            className="header__mobile-toggle"
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
