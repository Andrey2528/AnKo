import React, { useEffect, useState } from 'react';
import { Container, SectionTitle } from '../components/ui';
import './Process.scss';

/**
 * Services Section
 * 
 * Секція з послугами компанії
 */
const Process = () => {

  return (
    <section id="process" className="process">
      <Container>
        <div className="process__header">
            <SectionTitle title="04. Our Process" />
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

export default Process;
