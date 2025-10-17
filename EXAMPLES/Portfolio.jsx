import React, { useState } from 'react';
import { Container, Card, Button } from '../components/ui';
import './Portfolio.scss';

const Portfolio = () => {
  const [filter, setFilter] = useState('all');

  const projects = [
    {
      id: 1,
      title: 'E-commerce платформа',
      category: 'web',
      image: '/images/project1.jpg',
      description: 'Сучасний інтернет-магазин'
    },
    {
      id: 2,
      title: 'Мобільний додаток',
      category: 'mobile',
      image: '/images/project2.jpg',
      description: 'iOS/Android додаток'
    },
    // Додайте більше проектів
  ];

  const filteredProjects = filter === 'all' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="portfolio">
      <Container>
        <div className="portfolio__header">
          <h2>Наші проекти</h2>
          <div className="portfolio__filters">
            <Button 
              variant={filter === 'all' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setFilter('all')}
            >
              Всі
            </Button>
            <Button 
              variant={filter === 'web' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setFilter('web')}
            >
              Веб
            </Button>
            <Button 
              variant={filter === 'mobile' ? 'primary' : 'ghost'}
              size="small"
              onClick={() => setFilter('mobile')}
            >
              Мобільні
            </Button>
          </div>
        </div>

        <div className="portfolio__grid">
          {filteredProjects.map(project => (
            <Card key={project.id} hover className="portfolio__card">
              <div className="portfolio__image">
                <img src={project.image} alt={project.title} />
              </div>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <Button variant="ghost" size="small">
                Детальніше →
              </Button>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Portfolio;
