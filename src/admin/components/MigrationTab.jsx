import React, { useState } from 'react';
import { migrateFromLocalStorage, clearOldLocalStorage, exportToLocalStorage } from '../../utils/migration';
import './MigrationTab.scss';

/**
 * Migration Tab Component
 * 
 * Allows migrating data from localStorage to Firestore
 */
const MigrationTab = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMigrate = async () => {
    if (!confirm('Start migration from localStorage to Firestore?\n\nThis will copy all data to Firebase.')) {
      return;
    }

    setLoading(true);
    setStatus(null);

    try {
      const result = await migrateFromLocalStorage();
      setStatus(result);
    } catch (error) {
      setStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleExport = async () => {
    setLoading(true);
    setStatus(null);

    try {
      await exportToLocalStorage();
      setStatus({ 
        success: true, 
        message: 'Data exported to localStorage as backup' 
      });
    } catch (error) {
      setStatus({ success: false, message: error.message });
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    const cleared = clearOldLocalStorage();
    if (cleared) {
      setStatus({ 
        success: true, 
        message: 'Old localStorage data cleared' 
      });
    }
  };

  const checkLocalStorage = () => {
    const homeSections = localStorage.getItem('anko_home_sections_v1');
    const projects = localStorage.getItem('anko_projects_v1');
    const pages = localStorage.getItem('anko_pages_v1');

    return {
      hasHomeSections: !!homeSections,
      hasProjects: !!projects,
      hasPages: !!pages,
      isEmpty: !homeSections && !projects && !pages
    };
  };

  const localData = checkLocalStorage();

  return (
    <div className="migration-tab">
      <div className="migration-tab__header">
        <h2>Data Migration</h2>
        <p>Migrate data from localStorage to Firebase Firestore</p>
      </div>

      <div className="migration-tab__status">
        <h3>LocalStorage Status</h3>
        <div className="migration-tab__checks">
          <div className={`check ${localData.hasHomeSections ? 'check--found' : 'check--empty'}`}>
            <span className="check__icon">{localData.hasHomeSections ? '✓' : '○'}</span>
            <span className="check__label">Home Sections</span>
          </div>
          <div className={`check ${localData.hasProjects ? 'check--found' : 'check--empty'}`}>
            <span className="check__icon">{localData.hasProjects ? '✓' : '○'}</span>
            <span className="check__label">Projects</span>
          </div>
          <div className={`check ${localData.hasPages ? 'check--found' : 'check--empty'}`}>
            <span className="check__icon">{localData.hasPages ? '✓' : '○'}</span>
            <span className="check__label">Pages</span>
          </div>
        </div>
      </div>

      {status && (
        <div className={`migration-tab__message ${status.success ? 'migration-tab__message--success' : 'migration-tab__message--error'}`}>
          {status.message}
        </div>
      )}

      <div className="migration-tab__actions">
        <button
          onClick={handleMigrate}
          disabled={loading || localData.isEmpty}
          className="migration-tab__button migration-tab__button--primary"
        >
          {loading ? 'Migrating...' : '🚀 Migrate to Firestore'}
        </button>

        <button
          onClick={handleExport}
          disabled={loading}
          className="migration-tab__button migration-tab__button--secondary"
        >
          💾 Export Firestore to Backup
        </button>

        <button
          onClick={handleClear}
          disabled={loading || localData.isEmpty}
          className="migration-tab__button migration-tab__button--danger"
        >
          🗑️ Clear Old LocalStorage
        </button>
      </div>

      <div className="migration-tab__info">
        <h3>Migration Steps</h3>
        <ol>
          <li>
            <strong>Migrate to Firestore:</strong> Copies all localStorage data to Firebase
          </li>
          <li>
            <strong>Verify:</strong> Check that data appears correctly in admin panels
          </li>
          <li>
            <strong>Export Backup:</strong> (Optional) Save Firestore data to localStorage backup
          </li>
          <li>
            <strong>Clear Old Data:</strong> Remove old localStorage entries
          </li>
        </ol>

        <div className="migration-tab__warning">
          ⚠️ <strong>Important:</strong> Make sure Firebase is properly configured before migrating!
        </div>
      </div>
    </div>
  );
};

export default MigrationTab;
