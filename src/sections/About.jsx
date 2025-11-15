import React, { useEffect, useState } from 'react';
import { Container, Card } from '../components/ui';
import './About.scss';
import { loadHomeSections, onHomeSectionsChange, offHomeSectionsChange } from '../api/homeSections';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';

/**
 * About Section
 *
 * Секція "Про компанію"
 */
const About = () => {
    const [aboutData, setAboutData] = useState(null);

    useEffect(() => {
        const sections = loadHomeSections();
        setAboutData(sections.about);

        function handleChange() {
            const sections = loadHomeSections();
            setAboutData(sections.about);
        }

        onHomeSectionsChange(handleChange);
        return () => offHomeSectionsChange(handleChange);
    }, []);

    if (!aboutData) return null;

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
