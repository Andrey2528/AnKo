import React, { useEffect, useState } from 'react';
import {
  loadProjects,
  addProject,
  updateProject,
  removeProject,
  onProjectsChange,
  offProjectsChange,
} from '../../api/projects';
import ProjectForm from './forms/ProjectForm';
import { Toast } from '../../components/ui';

export default function ProjectsTab() {
  const [projects, setProjects] = useState([]);
  const [editing, setEditing] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setProjects(loadProjects());
    function onChange() {
      setProjects(loadProjects());
    }
    onProjectsChange(onChange);
    return () => offProjectsChange(onChange);
  }, []);

  function handleAdd(payload) {
    addProject(payload);
    setEditing(null);
    setShowForm(false);
    setToast({ message: 'Проект успішно додано!', type: 'success' });
  }

  function handleEditSave(payload) {
    updateProject(editing.id, payload);
    setEditing(null);
    setShowForm(false);
    setToast({ message: 'Проект успішно оновлено!', type: 'success' });
  }

  function handleDelete(id) {
    if (!confirm('Delete this project?')) return;
    removeProject(id);
    setToast({ message: 'Проект успішно видалено!', type: 'success' });
  }

  function handleEdit(project) {
    setEditing(project);
    setShowForm(true);
  }

  function handleNewProject() {
    setEditing(null);
    setShowForm(true);
  }

  function handleCancel() {
    setEditing(null);
    setShowForm(false);
  }

  function handleVisit(link) {
    if (link && link !== '#') {
      window.open(link, '_blank');
    }
  }

  return (
    <>
      <h2>Projects</h2>
      <p className="admin-subtitle">Manage portfolio projects displayed in the Work section</p>

      {!showForm ? (
        <div className="admin-list-view">
          <div className="admin-list-header">
            <h3>All Projects ({projects.length})</h3>
            <button className="btn-primary" onClick={handleNewProject}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="12" y1="5" x2="12" y2="19"></line>
                <line x1="5" y1="12" x2="19" y2="12"></line>
              </svg>
              Add New Project
            </button>
          </div>

          {projects.length === 0 ? (
            <div className="admin-empty-state">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              <p>No projects yet. Add your first portfolio project!</p>
              <button className="btn-primary" onClick={handleNewProject}>Create Project</button>
            </div>
          ) : (
            <div className="admin-table">
              <table>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Link</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project) => (
                    <tr key={project.id}>
                      <td>
                        <strong>{project.title}</strong>
                        {project.description && <p className="table-description">{project.description.substring(0, 80)}...</p>}
                      </td>
                      <td>
                        {(project.tags || []).map((tag, idx) => (
                          <span key={idx} className="badge" style={{ marginRight: '4px' }}>{tag}</span>
                        ))}
                      </td>
                      <td>
                        {project.link && project.link !== '#' ? (
                          <code>{project.link.substring(0, 30)}...</code>
                        ) : (
                          <span style={{ color: '#555' }}>—</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          {project.link && project.link !== '#' && (
                            <button className="btn-icon" onClick={() => handleVisit(project.link)} title="Visit link">
                              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                                <polyline points="15 3 21 3 21 9"></polyline>
                                <line x1="10" y1="14" x2="21" y2="3"></line>
                              </svg>
                            </button>
                          )}
                          <button className="btn-icon" onClick={() => handleEdit(project)} title="Edit project">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                            </svg>
                          </button>
                          <button className="btn-icon btn-danger" onClick={() => handleDelete(project.id)} title="Delete project">
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
            <h3>{editing ? 'Edit Project' : 'Add New Project'}</h3>
            <button className="btn-ghost" onClick={handleCancel}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
              Cancel
            </button>
          </div>
          <div className="admin-panel">
            <ProjectForm editing={editing} onCancel={handleCancel} onSave={(payload) => (editing ? handleEditSave(payload) : handleAdd(payload))} />
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
