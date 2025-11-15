import React, { useEffect, useState } from 'react';
import { Container } from '../../components/ui';
import './Services.scss';
import { loadHomeSections } from '../../api/firestore/homeSections';
import SectionTitle from '../../components/ui/SectionTitle/SectionTitle';

/**
 * Services Section
 * 
 * Секція з послугами компанії
 */
const Services = () => {
  const [servicesData, setServicesData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const sections = await loadHomeSections();
        setServicesData(sections.services);
      } catch (error) {
        console.error('Error loading services data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading || !servicesData) return null;

  return (
    <section id="services" className="services">
      <Container>
        <div className="services__header">
          <SectionTitle title={servicesData.title} theme='white'/>
        </div>

        <div className="services__list">
          {servicesData.items.map((service, index) => (
            <div key={service.id || index} className="services__item">
              <h3 className="services__item-title">{service.title}</h3>
              <p className="services__item-description">{service.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Services;
