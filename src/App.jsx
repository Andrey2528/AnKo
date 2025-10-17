import React from 'react';
import { Header, Footer } from './components/common';
import { Hero, About, Services, Contact } from './sections';
import './styles/globals.css';

/**
 * Main App Component
 * 
 * Головний компонент додатку з усіма секціями лендінгу
 */
function App() {
  return (
    <div className="app">
      <Header />
      
      <main>
        <Hero />
        <About />
        <Services />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
