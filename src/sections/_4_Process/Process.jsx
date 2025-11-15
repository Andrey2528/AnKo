import React, { useEffect, useState } from 'react';
import { Container, SectionTitle } from '../../components/ui';
import './Process.scss';
import { loadHomeSections } from '../../api/firestore/homeSections';

/**
 * Process Section
 * 
 * Секція з процесом роботи
 */
const Process = () => {
  const [processData, setProcessData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const sections = await loadHomeSections();
        setProcessData(sections.process);
      } catch (error) {
        console.error('Error loading process data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !processData) return null;

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
