import React, { useState } from 'react';
import { Container, SectionTitle } from '../../components/ui';
import './Faq.scss';
import { useData } from '../../contexts/DataContext';

/**
 * FAQ Section
 * 
 * Секція з часто задаваними питаннями (акордеон)
 */
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const { homeSections, loading } = useData();

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (loading || !homeSections?.faq) return null;

  const faqData = homeSections.faq;

  return (
    <section id="faq" className="faq">
      <Container>
        <div className="faq__header">
          <SectionTitle title={faqData.title || "06. FREQUENTLY ASKED QUESTIONS"} theme='white'/>
        </div>

        <div className="faq__list">
          {faqData.items && faqData.items.map((item, index) => (
            <div 
              key={item.id || index} 
              className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''}`}
            >
              <button 
                className="faq__question"
                onClick={() => toggleAccordion(index)}
                aria-expanded={activeIndex === index}
              >
                <span className="faq__question-text">{item.question}</span>
                <span className={`faq__icon ${activeIndex === index ? 'faq__icon--active' : ''}`}>
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M11.2856 15.2145L18.1818 8.5095L20 10.2773L9.99999 20L0 10.2773L1.81819 8.5095L8.71434 15.2145V0H11.2856V15.2145Z" fill="#EAF5F5"/>
                  </svg>
                </span>
              </button>
              
              <div className="faq__answer-wrapper">
                <div className="faq__answer">
                  {item.answer}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Faq;
