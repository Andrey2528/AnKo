import React, { useState } from 'react';
import { migrateFromLocalStorage, clearOldLocalStorage, exportToLocalStorage } from '../../utils/migration';
import './MigrationTab.scss';

/**
 * Migration Tab Component
 * 
 * Дозволяє мігрувати дані з localStorage в Firestore
 */
const MigrationTab = () => {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleMigrate = async () => {
    if (!confirm('Почати міграцію з localStorage в Firestore?\n\nЦе скопіює всі дані в Firebase.')) {
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
        message: 'Дані експортовано в localStorage як резервну копію' 
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
        message: 'Старі дані localStorage очищено' 
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
        <h2>Міграція Даних</h2>
        <p>Перенесення даних з localStorage в Firebase Firestore</p>
      </div>

      <div className="migration-tab__status">
        <h3>Статус LocalStorage</h3>
        <div className="migration-tab__checks">
          <div className={`check ${localData.hasHomeSections ? 'check--found' : 'check--empty'}`}>
            <span className="check__icon">{localData.hasHomeSections ? '✓' : '○'}</span>
            <span className="check__label">Секції головної</span>
          </div>
          <div className={`check ${localData.hasProjects ? 'check--found' : 'check--empty'}`}>
            <span className="check__icon">{localData.hasProjects ? '✓' : '○'}</span>
            <span className="check__label">Проєкти</span>
          </div>
          <div className={`check ${localData.hasPages ? 'check--found' : 'check--empty'}`}>
            <span className="check__icon">{localData.hasPages ? '✓' : '○'}</span>
            <span className="check__label">Сторінки</span>
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
          {loading ? 'Міграція...' : '🚀 Мігрувати в Firestore'}
        </button>

        <button
          onClick={handleExport}
          disabled={loading}
          className="migration-tab__button migration-tab__button--secondary"
        >
          💾 Експортувати Firestore в Backup
        </button>

        <button
          onClick={handleClear}
          disabled={loading || localData.isEmpty}
          className="migration-tab__button migration-tab__button--danger"
        >
          🗑️ Очистити Старий LocalStorage
        </button>
      </div>

      <div className="migration-tab__info">
        <h3>Кроки міграції</h3>
        <ol>
          <li>
            <strong>Мігрувати в Firestore:</strong> Копіює всі дані з localStorage в Firebase
          </li>
          <li>
            <strong>Перевірити:</strong> Переконайтесь, що дані правильно відображаються в адмін панелях
          </li>
          <li>
            <strong>Експортувати Backup:</strong> (Опціонально) Зберегти дані Firestore в localStorage як резервну копію
          </li>
          <li>
            <strong>Очистити Старі Дані:</strong> Видалити старі записи localStorage
          </li>
        </ol>

        <div className="migration-tab__warning">
          ⚠️ <strong>Важливо:</strong> Переконайтесь, що Firebase правильно налаштовано перед міграцією!
        </div>
      </div>
    </div>
  );
};

export default MigrationTab;
