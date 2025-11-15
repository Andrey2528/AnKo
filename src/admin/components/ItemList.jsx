import React from 'react';

export default function ItemList({ items, type, onEdit, onDelete }) {
  return (
    <div className="admin-list">
      <h3>
        Existing {type} ({items.length})
      </h3>
      {items.length === 0 && <p>No {type} yet. Create your first one!</p>}
      <ul>
        {items.map((item) => (
          <li key={item.id} className="admin-list-item">
            <div className="admin-list-left">
              <strong>{item.title}</strong>
              <div className="admin-tags">
                {type === 'projects' && (item.tags || []).join(', ')}
                {type === 'pages' && `/pages/${item.slug}`}
              </div>
            </div>
            <div className="admin-list-actions">
              <button onClick={() => onEdit(item)}>Edit</button>
              <button className="btn-danger" onClick={() => onDelete(item.id)}>
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
