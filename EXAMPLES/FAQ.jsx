import React, { useState } from 'react';
import { Container, Card } from '../components/ui';
import './FAQ.scss';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: 'Скільки часу займає розробка сайту?',
      answer: 'Термін розробки залежить від складності проекту. Зазвичай лендінг займає 2-3 тижні, а повноцінний веб-додаток - від 1 до 3 місяців.'
    },
    {
      question: 'Чи надаєте ви підтримку після запуску?',
      answer: 'Так, ми надаємо технічну підтримку та супровід проектів. Умови підтримки обговорюються індивідуально.'
    },
    {
      question: 'Які технології ви використовуєте?',
      answer: 'Ми працюємо з сучасними технологіями: React, Vue, Node.js, Python, та іншими залежно від потреб проекту.'
    },
    {
      question: 'Чи можна подивитися приклади робіт?',
      answer: 'Звичайно! Ви можете ознайомитися з нашим портфоліо в секції "Наші проекти" або зв\'язатися з нами для отримання детальної інформації.'
    },
    {
      question: 'Яка вартість розробки?',
      answer: 'Вартість розраховується індивідуально залежно від вимог проекту. Зв\'яжіться з нами для отримання безкоштовної консультації та оцінки вартості.'
    }
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="faq">
      <Container size="narrow">
        <div className="faq__header">
          <h2>Часті запитання</h2>
          <p>Відповіді на найпопулярніші питання</p>
        </div>

        <div className="faq__list">
          {faqs.map((faq, index) => (
            <Card 
              key={index} 
              className={`faq__item ${activeIndex === index ? 'faq__item--active' : ''}`}
              onClick={() => toggleFAQ(index)}
            >
              <div className="faq__question">
                <h3>{faq.question}</h3>
                <span className="faq__icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </div>
              {activeIndex === index && (
                <p className="faq__answer">{faq.answer}</p>
              )}
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
