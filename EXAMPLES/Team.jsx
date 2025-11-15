import React from 'react';
import { Container, Card } from '../components/ui';
import './Team.scss';

const Team = () => {
  const team = [
    {
      name: 'Іван Петренко',
      position: 'CEO & Founder',
      image: '/images/team1.jpg',
      social: {
        linkedin: '#',
        twitter: '#'
      }
    },
    {
      name: 'Марія Коваленко',
      position: 'Lead Developer',
      image: '/images/team2.jpg',
      social: {
        linkedin: '#',
        github: '#'
      }
    },
    {
      name: 'Олександр Сидоренко',
      position: 'UI/UX Designer',
      image: '/images/team3.jpg',
      social: {
        linkedin: '#',
        behance: '#'
      }
    }
  ];

  return (
    <section id="team" className="team">
      <Container>
        <div className="team__header">
          <h2>Наша команда</h2>
          <p>Професіонали, які втілюють ваші ідеї в життя</p>
        </div>

        <div className="team__grid">
          {team.map((member, index) => (
            <Card key={index} hover className="team__card">
              <div className="team__avatar">
                <img src={member.image} alt={member.name} />
              </div>
              <h3>{member.name}</h3>
              <p className="team__position">{member.position}</p>
              <div className="team__socials">
                {Object.entries(member.social).map(([platform, url]) => (
                  <a key={platform} href={url} aria-label={platform}>
                    {platform.substring(0, 2).toUpperCase()}
                  </a>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
};

export default Team;
