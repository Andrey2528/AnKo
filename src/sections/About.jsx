import React, { useEffect, useState } from 'react';
import { Container, Card } from '../components/ui';
import './About.scss';
import { loadHomeSections } from '../api/firestore/homeSections';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';

/**
 * About Section
 *
 * Секція "Про компанію"
 */
const About = () => {
    const [aboutData, setAboutData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const sections = await loadHomeSections();
                setAboutData(sections.about);
            } catch (error) {
                console.error('Error loading about data:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, []);

    if (loading || !aboutData) return null;

    return (
        <section id="about" className="about">
            <Container>
                <div className="about__header">
                    <SectionTitle title={aboutData.title} theme='white'/>
                </div>
                <div className="about__content">
                    <div className="about__text">
                        {aboutData.mainText}
                    </div>
                    <div className="about__text-wrapper">
                        <div className="about__text-small">
                            {aboutData.secondaryText}
                        </div>
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default About;
