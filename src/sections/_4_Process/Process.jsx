import React from 'react';
import { Container, SectionTitle } from '../../components/ui';
import './Process.scss';
import { useData } from '../../contexts/DataContext';

/**
 * Process Section
 * 
 * Секція з процесом роботи
 */
const Process = () => {
  const { homeSections, loading } = useData();

  if (loading || !homeSections?.process) return null;

  const processData = homeSections.process;

  return (
    <section id="process" className="process">
      <Container>
        <div className="process__header">
          <SectionTitle title={processData.title || "04. Our Process"} />
        </div>

        <div className="process__list">
          {processData.items && processData.items.map((item, index) => (
            <div key={item.id || index} className="process__item">
              <div className="process__item-content">
                <h3 className="process__item-title">{item.title}</h3>
                <p className="process__item-description">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Process;
