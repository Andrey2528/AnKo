import React, { useState } from 'react';
import { Container, SectionTitle } from '../../components/ui';
import './Faq.scss';

/**
 * FAQ Section
 * 
 * Секція з часто задаваними питаннями (акордеон)
 */
const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      question: 'How long does a typical project take?',
      answer: 'The timeline varies depending on the project scope and complexity. A typical website project takes 4-8 weeks, while branding projects usually require 2-4 weeks. We provide a detailed timeline during the initial consultation.'
    },
    {
      question: 'Do you offer ongoing support and maintenance?',
      answer: 'Yes, we offer various support and maintenance packages to ensure your website or brand materials stay up-to-date and function smoothly. We can discuss the best option for your needs.'
    },
    {
      question: 'Can I see examples of your previous work?',
      answer: 'Absolutely! You can view our portfolio showcasing a variety of projects we have completed. Each project demonstrates our commitment to quality and creativity.'
    },
    {
      question: 'What kind of support can I expect post-launch?',
      answer: 'Absolutely, at ANKO, we understand that budgeting is essential. We offer various payment plans to make our web design, branding, and visual identity services accessible to everyone, regardless of budget constraints.'
    },
    {
      question: 'Do you offer custom design, or do you use templates?',
      answer: 'We specialize in custom design tailored to your unique brand and business needs. While templates can be a starting point, we always customize them extensively to ensure your project stands out.'
    },
    {
      question: 'How will I be involved in the project?',
      answer: 'We believe in collaborative work. You will be involved at every stage of the project, from initial concept to final delivery. Regular check-ins and feedback sessions ensure the final product meets your vision.'
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <Container>
        <div className="faq__header">
          <SectionTitle title="06. FREQUENTLY ASKED QUESTIONS" theme='white'/>
        </div>

        <div className="faq__list">
          {faqData.map((item, index) => (
            <div 
              key={index} 
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
