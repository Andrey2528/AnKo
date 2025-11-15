import React, { useEffect, useState } from 'react';

export default function ProjectForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState({ title: '', description: '', tags: '', link: '', img: '' });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        description: editing.description || '',
        tags: (editing.tags || []).join(', '),
        link: editing.link || '',
        img: editing.img || '',
      });
    } else {
      setForm({ title: '', description: '', tags: '', link: '', img: '' });
    }
  }, [editing]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function submit(e) {
    e.preventDefault();
    const payload = {
      title: form.title.trim(),
      description: form.description.trim(),
      tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
      link: form.link.trim(),
      img: form.img.trim(),
    };
    onSave(payload);
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="admin-form-row">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required />
      </div>

      <div className="admin-form-row">
        <label>Tags (comma separated)</label>
        <input name="tags" value={form.tags} onChange={handleChange} placeholder="web, design, react" />
      </div>

      <div className="admin-form-row">
        <label>Link (optional)</label>
        <input name="link" value={form.link} onChange={handleChange} placeholder="https://example.com" />
      </div>

      <div className="admin-form-row">
        <label>Image URL (optional)</label>
        <input name="img" value={form.img} onChange={handleChange} placeholder="https://example.com/image.jpg" />
      </div>

      <div className="admin-form-row">
        <label>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Brief project description..." />
      </div>

      <div className="admin-form-actions">
        <button type="submit">{editing ? 'Update Project' : 'Add Project'}</button>
        {editing && (
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
