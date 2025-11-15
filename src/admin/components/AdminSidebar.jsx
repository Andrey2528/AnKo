import React from 'react';

export default function AdminSidebar({ activeTab, onTabChange }) {
  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__header">
        <h2>Адмін Панель</h2>
        <p>Керування контентом</p>
      </div>

      <nav className="admin-sidebar__nav">
        <div
          className={`admin-sidebar__item ${activeTab === 'dashboard' ? 'active' : ''}`}
          onClick={() => onTabChange('dashboard')}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="7"></rect>
            <rect x="14" y="3" width="7" height="7"></rect>
            <rect x="14" y="14" width="7" height="7"></rect>
            <rect x="3" y="14" width="7" height="7"></rect>
          </svg>
          <span>Dashboard</span>
        </div>

        <div
          className={`admin-sidebar__item ${activeTab === 'home' ? 'active' : ''}`}
          onClick={() => onTabChange('home')}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
            <polyline points="9 22 9 12 15 12 15 22"></polyline>
          </svg>
          <span>Головна сторінка</span>
        </div>

        <div
          className={`admin-sidebar__item ${activeTab === 'pages' ? 'active' : ''}`}
          onClick={() => onTabChange('pages')}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
          </svg>
          <span>Сторінки</span>
        </div>

        <div
          className={`admin-sidebar__item ${activeTab === 'migration' ? 'active' : ''}`}
          onClick={() => onTabChange('migration')}
        >
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
            <line x1="12" y1="22.08" x2="12" y2="12"></line>
          </svg>
          <span>Міграція</span>
        </div>

        <div className="admin-sidebar__item" onClick={() => (window.location.href = '/')}>
          <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          <span>Назад на сайт</span>
        </div>
      </nav>

      <div className="admin-sidebar__footer">AnKo CMS v1.0</div>
    </aside>
  );
}
