  import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Card, Marquee } from '../components/ui';
import './Work.scss';
import { loadProjects, onProjectsChange, offProjectsChange } from '../api/projects';
import { loadPages } from '../api/pages';
import { loadHomeSections, onHomeSectionsChange, offHomeSectionsChange } from '../api/homeSections';
import SectionTitle from '../components/ui/SectionTitle/SectionTitle';

/**
 * Work Section — projects are loaded from localStorage via projects API
 */
const Work = () => {
    const [projects, setProjects] = useState([]);
    const [pages, setPages] = useState([]);
    const [workData, setWorkData] = useState(null);

    useEffect(() => {
        setProjects(loadProjects());
        setPages(loadPages());
        
        const sections = loadHomeSections();
        setWorkData(sections.work);
        
        function handleChange() {
            setProjects(loadProjects());
            setPages(loadPages());
            const sections = loadHomeSections();
            setWorkData(sections.work);
        }
        onProjectsChange(handleChange);
        onHomeSectionsChange(handleChange);
        return () => {
            offProjectsChange(handleChange);
            offHomeSectionsChange(handleChange);
        };
    }, []);

    // Helper to find if project has a dedicated page
    const getProjectPage = (project) => {
        // Try to match by title or find page with matching slug
        const slug = project.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        return pages.find(p => p.slug === slug || p.title === project.title);
    };

    // Default values if workData is not available
    const marqueeText = workData?.marqueeText || 'Design Faster. Save More. Design Faster. Save More.';
    const sectionTitle = workData?.title || '02. Work';

    return (
        <section id="work" className="work">
            <Marquee direction="left" speed={80} pauseOnHover={false}>
                {marqueeText}
            </Marquee>
            <Container>
                <div className="work__header">
                    <SectionTitle title={sectionTitle} />
                </div>

                <div className="work__list">
                    {projects.map((service) => {
                        const projectPage = getProjectPage(service);
                        const linkUrl = projectPage ? `/pages/${projectPage.slug}` : (service.link || '#');
                        const isInternalLink = !!projectPage;

                        return (
                            <Card key={service.id} hover className="work__card">
                                <div className="work__card-left">
                                    <h3 className="work__card-title">{service.title}</h3>
                                    <p className="work__card-description">{service.description}</p>
                                </div>

                                <div className="work__card-item__wrapper">
                                    <ul className="work__card-list">
                                        {(service.tags || []).slice(0, 2).map((t, i) => (
                                            <li className="work__card-list_item" key={i}>
                                                {t}
                                            </li>
                                        ))}
                                    </ul>
                                    {isInternalLink ? (
                                        <Link className="card__link" to={linkUrl}>
                                            Details
                                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0035 3.9083L1.41176 12.5L0 11.0882L8.5917 2.49654H1.01905V0.5H12V11.481H10.0035V3.9083Z" fill="#EAF5F5" />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <a className="card__link" href={linkUrl} target="_blank" rel="noreferrer">
                                            Visit
                                            <svg width="12" height="13" viewBox="0 0 12 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M10.0035 3.9083L1.41176 12.5L0 11.0882L8.5917 2.49654H1.01905V0.5H12V11.481H10.0035V3.9083Z" fill="#EAF5F5" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </Card>
                        );
                    })}
                </div>
            </Container>
        </section>
    );
};

export default Work;
