import React, { useEffect, useState } from 'react';
import { loadHomeSections } from '../../api/firestore/homeSections';
import { getProjects } from '../../api/firestore/projects';
import { getPages } from '../../api/firestore/pages';

/**
 * Dashboard Tab
 * 
 * Головна інформаційна панель адмінки з статистикою та швидким доступом
 */
export default function DashboardTab() {
  const [stats, setStats] = useState({
    sections: 0,
    projects: 0,
    pages: 0,
    lastUpdate: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const [sections, projects, pages] = await Promise.all([
          loadHomeSections(),
          getProjects(),
          getPages()
        ]);

        // Count active sections
        const activeSections = Object.keys(sections).filter(key => {
          const section = sections[key];
          if (Array.isArray(section?.items)) {
            return section.items.length > 0;
          }
          return section && Object.keys(section).length > 0;
        }).length;

        setStats({
          sections: activeSections,
          projects: projects.length,
          pages: pages.length,
          lastUpdate: new Date().toLocaleDateString('uk-UA')
        });
      } catch (error) {
        console.error('Error loading dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  if (loading) {
    return (
      <div className="dashboard">
        <h2>Dashboard</h2>
        <p className="admin-subtitle">Завантаження статистики...</p>
      </div>
    );
  }

  const quickLinks = [
    { 
      id: 'hero', 
      title: 'Hero Section', 
      description: 'Головний екран сайту',
      icon: '🚀',
      color: '#1e90ff'
    },
    { 
      id: 'about', 
      title: 'About Section', 
      description: 'Інформація про компанію',
      icon: '👥',
      color: '#32cd32'
    },
    { 
      id: 'services', 
      title: 'Services', 
      description: 'Послуги та сервіси',
      icon: '⚙️',
      color: '#ff6b6b'
    },
    { 
      id: 'faq', 
      title: 'FAQ', 
      description: 'Часті питання',
      icon: '❓',
      color: '#ffa500'
    }
  ];

  return (
    <div className="dashboard">
      <div className="dashboard__header">
        <div>
          <h2>Dashboard</h2>
          <p className="admin-subtitle">Загальна інформація про сайт</p>
        </div>
        <div className="dashboard__date">
          <span>Останнє оновлення: {stats.lastUpdate}</span>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="dashboard__stats">
        <div className="stat-card stat-card--primary">
          <div className="stat-card__icon">📄</div>
          <div className="stat-card__content">
            <div className="stat-card__value">{stats.sections}</div>
            <div className="stat-card__label">Активних секцій</div>
          </div>
        </div>

        <div className="stat-card stat-card--success">
          <div className="stat-card__icon">💼</div>
          <div className="stat-card__content">
            <div className="stat-card__value">{stats.projects}</div>
            <div className="stat-card__label">Проєктів</div>
          </div>
        </div>

        <div className="stat-card stat-card--warning">
          <div className="stat-card__icon">📋</div>
          <div className="stat-card__content">
            <div className="stat-card__value">{stats.pages}</div>
            <div className="stat-card__label">Сторінок</div>
          </div>
        </div>

        <div className="stat-card stat-card--info">
          <div className="stat-card__icon">🔥</div>
          <div className="stat-card__content">
            <div className="stat-card__value">100%</div>
            <div className="stat-card__label">Firestore</div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="dashboard__section">
        <h3 className="dashboard__section-title">Швидкий доступ</h3>
        <div className="dashboard__quick-links">
          {quickLinks.map((link) => (
            <div 
              key={link.id} 
              className="quick-link"
              style={{ borderLeftColor: link.color }}
            >
              <div className="quick-link__icon">{link.icon}</div>
              <div className="quick-link__content">
                <h4 className="quick-link__title">{link.title}</h4>
                <p className="quick-link__description">{link.description}</p>
              </div>
              <button className="quick-link__button">
                Редагувати →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* System Info */}
      <div className="dashboard__section">
        <h3 className="dashboard__section-title">Інформація про систему</h3>
        <div className="dashboard__info-grid">
          <div className="info-item">
            <div className="info-item__label">Framework</div>
            <div className="info-item__value">React 19.2.0</div>
          </div>
          <div className="info-item">
            <div className="info-item__label">Build Tool</div>
            <div className="info-item__value">Vite 7.1.10</div>
          </div>
          <div className="info-item">
            <div className="info-item__label">Database</div>
            <div className="info-item__value">Firebase Firestore</div>
          </div>
          <div className="info-item">
            <div className="info-item__label">Deployment</div>
            <div className="info-item__value">Vercel</div>
          </div>
          <div className="info-item">
            <div className="info-item__label">Images</div>
            <div className="info-item__value">GitHub API</div>
          </div>
          <div className="info-item">
            <div className="info-item__label">Styling</div>
            <div className="info-item__value">SCSS Modules</div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="dashboard__section">
        <h3 className="dashboard__section-title">Корисні посилання</h3>
        <div className="dashboard__links">
          <a href="https://firebase.google.com/docs/firestore" target="_blank" rel="noopener noreferrer" className="external-link">
            <span className="external-link__icon">📚</span>
            <span className="external-link__text">Firestore Documentation</span>
            <span className="external-link__arrow">↗</span>
          </a>
          <a href="https://vitejs.dev/guide/" target="_blank" rel="noopener noreferrer" className="external-link">
            <span className="external-link__icon">⚡</span>
            <span className="external-link__text">Vite Documentation</span>
            <span className="external-link__arrow">↗</span>
          </a>
          <a href="https://react.dev/" target="_blank" rel="noopener noreferrer" className="external-link">
            <span className="external-link__icon">⚛️</span>
            <span className="external-link__text">React Documentation</span>
            <span className="external-link__arrow">↗</span>
          </a>
          <a href="https://vercel.com/docs" target="_blank" rel="noopener noreferrer" className="external-link">
            <span className="external-link__icon">▲</span>
            <span className="external-link__text">Vercel Documentation</span>
            <span className="external-link__arrow">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
}
