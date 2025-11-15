import React, { useEffect, useState } from 'react';
import { Container } from '../components/ui';
import './Services.scss';
import { loadHomeSections, onHomeSectionsChange, offHomeSectionsChange } from '../api/homeSections';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';

/**
 * Services Section
 * 
 * Секція з послугами компанії
 */
const Services = () => {
  const [servicesData, setServicesData] = useState(null);

  useEffect(() => {
    const sections = loadHomeSections();
    setServicesData(sections.services);

    function handleChange() {
      const sections = loadHomeSections();
      setServicesData(sections.services);
    }

    onHomeSectionsChange(handleChange);
    return () => offHomeSectionsChange(handleChange);
  }, []);

  if (!servicesData) return null;

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
