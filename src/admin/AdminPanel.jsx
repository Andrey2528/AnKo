import React, { useState } from 'react';
import { AdminSidebar, DashboardTab, ProjectsTab, PagesTab, HomeTab, MigrationTab } from './components';
import './AdminPanel.scss';

/**
 * Admin Panel - Content Management System
 * 
 * Main admin dashboard with sidebar navigation and content tabs
 */
export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="admin-root">
      <AdminSidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="admin-content">
        {activeTab === 'dashboard' && <DashboardTab />}
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'pages' && <PagesTab />}
        {activeTab === 'migration' && <MigrationTab />}
      </main>
    </div>
  );
}
