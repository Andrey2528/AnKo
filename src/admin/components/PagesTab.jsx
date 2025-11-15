import React, { useEffect, useState } from 'react';
import { loadPages, addPage, updatePage, removePage, onPagesChange, offPagesChange } from '../../api/pages';
import PageForm from './forms/PageForm';
import { Toast } from '../../components/ui';

export default function PagesTab() {
  const [pages, setPages] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setPages(loadPages());
    function onChange() {
      setPages(loadPages());
    }
    onPagesChange(onChange);
    return () => offPagesChange(onChange);
  }, []);

  function handleAdd(payload) {
    // ensure slug uniqueness by appending timestamp if needed
    const existing = loadPages().find((p) => p.slug === payload.slug);
    if (existing && (!editing || existing.id !== editing.id)) {
      payload.slug = payload.slug + '-' + Date.now();
    }
    addPage(payload);
    setEditing(null);
    setShowForm(false);
    setToast({ message: 'Сторінку успішно додано!', type: 'success' });
  }

  function handleEditSave(payload) {
    updatePage(editing.id, payload);
    setEditing(null);
    setShowForm(false);
    setToast({ message: 'Сторінку успішно оновлено!', type: 'success' });
  }

  function handleDelete(id) {
    if (!confirm('Delete this page?')) return;
    removePage(id);
    setToast({ message: 'Сторінку успішно видалено!', type: 'success' });
  }

  function handleEdit(page) {
    setEditing(page);
    setShowForm(true);
  }

  function handleNewPage() {
    setEditing(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditing(null);
    setShowForm(false);
  }

  function handleVisit(slug) {
    window.open(`/pages/${slug}`, '_blank');
  }

  return (
    <>
      <h2>Pages</h2>
      <p className="admin-subtitle">Create and manage detailed project pages with rich content</p>

      {!showForm ? (
        <div className="admin-list-view">
          <div className="admin-list-header">
            <h3>All Pages ({pages.length})</h3>
            <button className="btn-primary" onClick={handleNewPage}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Page
            </button>
          </div>

          {pages.length === 0 ? (
            <div className="admin-empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                <polyline points="14 2 14 8 20 8"></polyline>
              </svg>
              <p>No pages yet. Create your first project page!</p>
              <button className="btn-primary" onClick={handleNewPage}>Create Page</button>
            </div>
          ) : (
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Slug</th>
                    <th>Category</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {pages.map((page) => (
                    <tr key={page.id}>
                      <td>
                        <strong>{page.title}</strong>
                        {page.description && <p className="table-description">{page.description.substring(0, 80)}...</p>}
                      </td>
                      <td>
                        <code>/pages/{page.slug}</code>
                      </td>
                      <td>
                        <span className="badge">{page.category || 'web'}</span>
                      </td>
                      <td>
                        <div className="table-actions">
                          <button className="btn-icon" onClick={() => handleVisit(page.slug)} title="Visit page">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                              <polyline points="15 3 21 3 21 9"></polyline>
                              <line x1="10" y1="14" x2="21" y2="3"></line>
                            </svg>
                          </button>
                          <button className="btn-icon" onClick={() => handleEdit(page)} title="Edit page">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button className="btn-icon btn-danger" onClick={() => handleDelete(page.id)} title="Delete page">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="3 6 5 6 21 6"></polyline>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <div className="admin-form-view">
          <div className="admin-form-header">
            <h3>{editing ? 'Edit Page' : 'Add New Page'}</h3>
            <button className="btn-ghost" onClick={handleCancel}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
          </div>
          <div className="admin-panel">
            <PageForm editing={editing} onCancel={handleCancel} onSave={(payload) => (editing ? handleEditSave(payload) : handleAdd(payload))} />
          </div>
        </div>
      )}

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </>
  );
}
