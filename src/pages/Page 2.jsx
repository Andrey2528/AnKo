import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container } from '../components/ui';
import { loadPages, onPagesChange, offPagesChange } from '../api/pages';
import './Page.scss';

export default function Page() {
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  useEffect(() => {
    function refresh() {
      const pages = loadPages();
      const found = pages.find((p) => p.slug === slug);
      setPage(found || null);
    }

    refresh();
    onPagesChange(refresh);
    return () => offPagesChange(refresh);
  }, [slug]);

  if (!page) {
    return (
      <section className="page-not-found">
        <Container>
          <h2>Page not found</h2>
          <p>There is no page with slug <strong>{slug}</strong>.</p>
          <Link to="/" className="btn-back">← Back to Home</Link>
        </Container>
      </section>
    );
  }

  return (
    <section className="project-page">
      <Container>
        <Link to="/" className="btn-back">← Back to Home</Link>

        <div className="project-header">
          <h1 className="project-title">{page.title}</h1>
          {page.category && <span className="project-category">{page.category}</span>}
          {page.description && <p className="project-description">{page.description}</p>}
        </div>

        {page.images && page.images.length > 0 && (
          <div className="project-gallery">
            {page.images.map((img, idx) => (
              <img key={idx} src={img} alt={`${page.title} screenshot ${idx + 1}`} className="project-image" />
            ))}
          </div>
        )}

        {page.techStack && page.techStack.length > 0 && (
          <div className="project-tech">
            <h3>Tech Stack</h3>
            <ul className="tech-list">
              {page.techStack.map((tech, idx) => (
                <li key={idx} className="tech-item">{tech}</li>
              ))}
            </ul>
          </div>
        )}

        {page.content && (
          <div className="project-content" dangerouslySetInnerHTML={{ __html: page.content }} />
        )}

        <div className="project-links">
          {page.projectUrl && (
            <a href={page.projectUrl} target="_blank" rel="noreferrer" className="project-link">
              View Live Project →
            </a>
          )}
          {page.githubUrl && (
            <a href={page.githubUrl} target="_blank" rel="noreferrer" className="project-link">
              View on GitHub →
            </a>
          )}
        </div>
      </Container>
    </section>
  );
}
