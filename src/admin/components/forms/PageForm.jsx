import React, { useEffect, useState } from 'react';

export default function PageForm({ onSave, editing, onCancel }) {
  const [form, setForm] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    images: '',
    techStack: '',
    projectUrl: '',
    githubUrl: '',
    category: 'web',
  });

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || '',
        slug: editing.slug || '',
        description: editing.description || '',
        content: editing.content || '',
        images: (editing.images || []).join('\n'),
        techStack: (editing.techStack || []).join(', '),
        projectUrl: editing.projectUrl || '',
        githubUrl: editing.githubUrl || '',
        category: editing.category || 'web',
      });
    } else {
      setForm({
        title: '',
        slug: '',
        description: '',
        content: '',
        images: '',
        techStack: '',
        projectUrl: '',
        githubUrl: '',
        category: 'web',
      });
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
      slug: form.slug.trim().replace(/[^a-zA-Z0-9-_]/g, '-').toLowerCase(),
      description: form.description.trim(),
      content: form.content,
      images: form.images
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      techStack: form.techStack
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      projectUrl: form.projectUrl.trim(),
      githubUrl: form.githubUrl.trim(),
      category: form.category,
    };
    onSave(payload);
  }

  return (
    <form className="admin-form" onSubmit={submit}>
      <div className="admin-form-row">
        <label>Title</label>
        <input name="title" value={form.title} onChange={handleChange} required placeholder="My Awesome Project" />
      </div>

      <div className="admin-form-row">
        <label>Slug (URL)</label>
        <input name="slug" value={form.slug} onChange={handleChange} required placeholder="my-awesome-project" />
      </div>

      <div className="admin-form-row">
        <label>Category</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="web">Web Development</option>
          <option value="mobile">Mobile App</option>
          <option value="design">Design</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div className="admin-form-row">
        <label>Short Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="A brief overview of the project..." />
      </div>

      <div className="admin-form-row">
        <label>Content (HTML)</label>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          rows={8}
          placeholder="<h2>About</h2><p>Detailed project description...</p>"
        />
      </div>

      <div className="admin-form-row">
        <label>Images (one URL per line)</label>
        <textarea
          name="images"
          value={form.images}
          onChange={handleChange}
          rows={4}
          placeholder="https://example.com/image1.jpg&#10;https://example.com/image2.jpg"
        />
      </div>

      <div className="admin-form-row">
        <label>Tech Stack (comma separated)</label>
        <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="React, Node.js, MongoDB" />
      </div>

      <div className="admin-form-row">
        <label>Project URL</label>
        <input name="projectUrl" value={form.projectUrl} onChange={handleChange} placeholder="https://project-demo.com" />
      </div>

      <div className="admin-form-row">
        <label>GitHub URL</label>
        <input name="githubUrl" value={form.githubUrl} onChange={handleChange} placeholder="https://github.com/user/repo" />
      </div>

      <div className="admin-form-actions">
        <button type="submit">{editing ? 'Update Page' : 'Add Page'}</button>
        {editing && (
          <button type="button" className="btn-ghost" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
