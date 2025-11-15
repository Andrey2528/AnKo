import React, { useEffect, useState } from 'react';
import { Container, SectionTitle } from '../../components/ui';

/**
 * Services Section
 * 
 * Секція з послугами компанії
 */
const Faq = () => {

  return (
    <section id="faq" className="faq">
      <Container>
        <div className="faq__header">
            <SectionTitle title="06. FAQ" />
        </div>

        <div className="process__list">
            <div className="process__item">
              <h3 className="process__item-title">Idea Discussion</h3>
              <p className="process__item-description">We discuss your ideas and requirements in detail.</p>
            </div>
        </div>
      </Container>
    </section>
  );
};

export default Faq;
