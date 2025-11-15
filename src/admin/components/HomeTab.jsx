import React, { useEffect, useState } from 'react';
import { loadHomeSections, saveHomeSection } from '../../api/firestore/homeSections';
import { Toast } from '../../components/ui';
import ProjectsTab from './ProjectsTab';

export default function HomeTab() {
  const [sections, setSections] = useState(null);
  const [activeSection, setActiveSection] = useState('hero');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    async function fetchSections() {
      try {
        const data = await loadHomeSections();
        
        // Ensure all sections exist with default values
        const completeData = {
          hero: data.hero || { title: '', buttonText: '', buttonLink: '' },
          about: data.about || { title: '', mainText: '', secondaryText: '', stats: [] },
          services: data.services || { title: '', subtitle: '', items: [] },
          process: data.process || { title: '04. Our Process', items: [] },
          pricing: data.pricing || { title: '05. Pricing', marqueeText: 'Fair & Transparent Pricing.', serviceTypes: [] },
          faq: data.faq || { title: '06. FREQUENTLY ASKED QUESTIONS', items: [] },
          work: data.work || { marqueeText: '', title: '' },
          contact: data.contact || { title: '', subtitle: '', formFields: [], submitButtonText: '' }
        };
        
        setSections(completeData);
      } catch (error) {
        console.error('Error loading sections:', error);
        setToast({ message: 'Помилка завантаження даних', type: 'error' });
      } finally {
        setLoading(false);
      }
    }
    fetchSections();
  }, []);

  async function handleSave(sectionName, data) {
    try {
      await saveHomeSection(sectionName, data);
      // Reload sections to get updated data
      const updatedSections = await loadHomeSections();
      setSections(updatedSections);
      setToast({ message: 'Зміни успішно збережено!', type: 'success' });
    } catch (error) {
      console.error('Error saving section:', error);
      setToast({ message: 'Помилка збереження даних', type: 'error' });
    }
  }

  if (loading) return <p>Loading...</p>;
  if (!sections) return <p>No data available</p>;

  const sectionTabs = [
    { id: 'hero', label: 'Hero Section', icon: '🚀' },
    { id: 'about', label: 'About Section', icon: '👥' },
    { id: 'services', label: 'Services', icon: '⚙️' },
    { id: 'process', label: 'Process', icon: '🔄' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'work', label: 'Work Projects', icon: '💼' },
    { id: 'contact', label: 'Contact', icon: '📧' },
  ];

  return (
    <>
      <h2>Home Page</h2>
      <p className="admin-subtitle">Manage content for all sections on the home page</p>

      <div className="home-editor">
        {/* Section Tabs */}
        <div className="section-tabs">
          {sectionTabs.map((tab) => (
            <button
              key={tab.id}
              className={`section-tab ${activeSection === tab.id ? 'active' : ''}`}
              onClick={() => setActiveSection(tab.id)}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="section-content">
          {activeSection === 'hero' && (
            <HeroEditor data={sections.hero} onSave={(data) => handleSave('hero', data)} />
          )}
          {activeSection === 'about' && (
            <AboutEditor data={sections.about} onSave={(data) => handleSave('about', data)} />
          )}
          {activeSection === 'services' && (
            <ServicesEditor data={sections.services} onSave={(data) => handleSave('services', data)} />
          )}
          {activeSection === 'process' && (
            <ProcessEditor data={sections.process} onSave={(data) => handleSave('process', data)} />
          )}
          {activeSection === 'faq' && (
            <FaqEditor data={sections.faq} onSave={(data) => handleSave('faq', data)} />
          )}
          {activeSection === 'contact' && (
            <ContactEditor data={sections.contact} onSave={(data) => handleSave('contact', data)} />
          )}
          {activeSection === 'work' && (
            <ProjectsTab />
          )}
        </div>
      </div>

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

// Hero Section Editor
function HeroEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>Hero Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Main Title</label>
          <textarea 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            rows={2}
            placeholder="We're not your ordinary digital studio." 
          />
        </div>

        <div className="admin-form-row">
          <label>Button Text</label>
          <input 
            name="buttonText" 
            value={form.buttonText || ''} 
            onChange={handleChange} 
            placeholder="About Us" 
          />
        </div>

        <div className="admin-form-row">
          <label>Button Link</label>
          <input 
            name="buttonLink" 
            value={form.buttonLink || ''} 
            onChange={handleChange} 
            placeholder="#about" 
          />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// About Section Editor
function AboutEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleStatChange(index, field, value) {
    const newStats = [...form.stats];
    newStats[index][field] = value;
    setForm((prev) => ({ ...prev, stats: newStats }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>About Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Title</label>
          <input 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            placeholder="01. Why we exist" 
          />
        </div>

        <div className="admin-form-row">
          <label>Main Text</label>
          <textarea 
            name="mainText" 
            value={form.mainText || ''} 
            onChange={handleChange} 
            rows={4} 
            placeholder="We recognized that there was a gap in the creative industry..."
          />
        </div>

        <div className="admin-form-row">
          <label>Secondary Text</label>
          <textarea 
            name="secondaryText" 
            value={form.secondaryText || ''} 
            onChange={handleChange} 
            rows={3}
            placeholder="We offer a curated suite of services..."
          />
        </div>

        <h4 style={{ marginTop: '24px', marginBottom: '16px', color: '#fff' }}>Statistics</h4>
        {form.stats?.map((stat, idx) => (
          <div key={idx} style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
            <div className="admin-form-row">
              <label>Stat {idx + 1} - Value</label>
              <input 
                value={stat.value} 
                onChange={(e) => handleStatChange(idx, 'value', e.target.value)} 
                placeholder="100+" 
              />
            </div>
            <div className="admin-form-row">
              <label>Stat {idx + 1} - Label</label>
              <input 
                value={stat.label} 
                onChange={(e) => handleStatChange(idx, 'label', e.target.value)} 
                placeholder="Проектів" 
              />
            </div>
          </div>
        ))}

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// Services Section Editor
function ServicesEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleServiceChange(index, field, value) {
    const newItems = [...form.items];
    newItems[index][field] = value;
    setForm((prev) => ({ ...prev, items: newItems }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>Services Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Title</label>
          <input name="title" value={form.title || ''} onChange={handleChange} placeholder="Наші послуги" />
        </div>

        <div className="admin-form-row">
          <label>Subtitle</label>
          <input name="subtitle" value={form.subtitle || ''} onChange={handleChange} placeholder="Комплексні рішення для вашого бізнесу" />
        </div>

        <h4 style={{ marginTop: '24px', marginBottom: '16px', color: '#fff' }}>Service Items</h4>
        {form.items?.map((service, idx) => (
          <div key={service.id} style={{ marginBottom: '20px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
            <div className="admin-form-row">
              <label>Service {idx + 1} - Title</label>
              <input value={service.title} onChange={(e) => handleServiceChange(idx, 'title', e.target.value)} placeholder="Веб-розробка" />
            </div>
            <div className="admin-form-row">
              <label>Service {idx + 1} - Description</label>
              <textarea value={service.description} onChange={(e) => handleServiceChange(idx, 'description', e.target.value)} rows={2} placeholder="Опис сервісу" />
            </div>
          </div>
        ))}

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// Contact Section Editor
function ContactEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleFormFieldChange(field, value) {
    setForm((prev) => ({
      ...prev,
      formFields: { ...prev.formFields, [field]: value },
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>Contact Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Title</label>
          <input 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            placeholder="Зв'яжіться з нами" 
          />
        </div>

        <div className="admin-form-row">
          <label>Subtitle</label>
          <input 
            name="subtitle" 
            value={form.subtitle || ''} 
            onChange={handleChange} 
            placeholder="Готові почати ваш проект? Напишіть нам!" 
          />
        </div>

        <div className="admin-form-row">
          <label>Submit Button Text</label>
          <input 
            name="submitButtonText" 
            value={form.submitButtonText || ''} 
            onChange={handleChange} 
            placeholder="Відправити повідомлення" 
          />
        </div>

        <h4 style={{ marginTop: '24px', marginBottom: '16px', color: '#fff' }}>Form Fields Labels & Placeholders</h4>
        
        <div style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
          <h5 style={{ color: '#4a9eff', marginBottom: '12px' }}>Name Field</h5>
          <div className="admin-form-row">
            <label>Label</label>
            <input 
              value={form.formFields?.nameLabel || ''} 
              onChange={(e) => handleFormFieldChange('nameLabel', e.target.value)} 
              placeholder="Ім'я" 
            />
          </div>
          <div className="admin-form-row">
            <label>Placeholder</label>
            <input 
              value={form.formFields?.namePlaceholder || ''} 
              onChange={(e) => handleFormFieldChange('namePlaceholder', e.target.value)} 
              placeholder="Ваше ім'я" 
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
          <h5 style={{ color: '#4a9eff', marginBottom: '12px' }}>Email Field</h5>
          <div className="admin-form-row">
            <label>Label</label>
            <input 
              value={form.formFields?.emailLabel || ''} 
              onChange={(e) => handleFormFieldChange('emailLabel', e.target.value)} 
              placeholder="Email" 
            />
          </div>
          <div className="admin-form-row">
            <label>Placeholder</label>
            <input 
              value={form.formFields?.emailPlaceholder || ''} 
              onChange={(e) => handleFormFieldChange('emailPlaceholder', e.target.value)} 
              placeholder="your@email.com" 
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
          <h5 style={{ color: '#4a9eff', marginBottom: '12px' }}>Phone Field</h5>
          <div className="admin-form-row">
            <label>Label</label>
            <input 
              value={form.formFields?.phoneLabel || ''} 
              onChange={(e) => handleFormFieldChange('phoneLabel', e.target.value)} 
              placeholder="Телефон" 
            />
          </div>
          <div className="admin-form-row">
            <label>Placeholder</label>
            <input 
              value={form.formFields?.phonePlaceholder || ''} 
              onChange={(e) => handleFormFieldChange('phonePlaceholder', e.target.value)} 
              placeholder="+380 XX XXX XX XX" 
            />
          </div>
        </div>

        <div style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
          <h5 style={{ color: '#4a9eff', marginBottom: '12px' }}>Message Field</h5>
          <div className="admin-form-row">
            <label>Label</label>
            <input 
              value={form.formFields?.messageLabel || ''} 
              onChange={(e) => handleFormFieldChange('messageLabel', e.target.value)} 
              placeholder="Повідомлення" 
            />
          </div>
          <div className="admin-form-row">
            <label>Placeholder</label>
            <input 
              value={form.formFields?.messagePlaceholder || ''} 
              onChange={(e) => handleFormFieldChange('messagePlaceholder', e.target.value)} 
              placeholder="Розкажіть про ваш проект..." 
            />
          </div>
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// Work Section Editor
function WorkEditor({ data, onSave }) {
  const [form, setForm] = useState(data);

  useEffect(() => {
    setForm(data);
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>Work Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Marquee Text</label>
          <input 
            name="marqueeText" 
            value={form.marqueeText || ''} 
            onChange={handleChange} 
            placeholder="Design Faster. Save More. Design Faster. Save More." 
          />
          <small style={{ color: '#888', marginTop: '4px', display: 'block' }}>
            This text will scroll horizontally above the projects section
          </small>
        </div>

        <div className="admin-form-row">
          <label>Section Title</label>
          <input 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            placeholder="02. Work" 
          />
        </div>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// Process Section Editor
function ProcessEditor({ data, onSave }) {
  const [form, setForm] = useState(data || { title: '04. Our Process', items: [] });

  useEffect(() => {
    setForm(data || { title: '04. Our Process', items: [] });
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleItemChange(index, field, value) {
    const newItems = [...(form.items || [])];
    newItems[index][field] = value;
    setForm((prev) => ({ ...prev, items: newItems }));
  }

  function addItem() {
    const newItem = {
      id: Date.now(),
      title: '',
      description: ''
    };
    setForm((prev) => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  }

  function removeItem(index) {
    const newItems = (form.items || []).filter((_, idx) => idx !== index);
    setForm((prev) => ({ ...prev, items: newItems }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>Process Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Section Title</label>
          <input 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            placeholder="04. Our Process" 
          />
        </div>

        <h4 style={{ marginTop: '24px', marginBottom: '16px', color: '#fff' }}>Process Steps</h4>
        {form.items?.map((item, idx) => (
          <div key={item.id || idx} style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h5 style={{ color: '#1e90ff', margin: 0 }}>Step {idx + 1}</h5>
              <button 
                type="button" 
                onClick={() => removeItem(idx)}
                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
            <div className="admin-form-row">
              <label>Title</label>
              <input 
                value={item.title} 
                onChange={(e) => handleItemChange(idx, 'title', e.target.value)} 
                placeholder="Idea Discussion" 
              />
            </div>
            <div className="admin-form-row">
              <label>Description</label>
              <textarea 
                value={item.description} 
                onChange={(e) => handleItemChange(idx, 'description', e.target.value)} 
                placeholder="We discuss your ideas and requirements in detail."
                rows={3}
              />
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={addItem}
          style={{ 
            background: '#28a745', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px', 
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          + Add Process Step
        </button>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}

// FAQ Section Editor
function FaqEditor({ data, onSave }) {
  const [form, setForm] = useState(data || { title: '06. FREQUENTLY ASKED QUESTIONS', items: [] });

  useEffect(() => {
    setForm(data || { title: '06. FREQUENTLY ASKED QUESTIONS', items: [] });
  }, [data]);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleItemChange(index, field, value) {
    const newItems = [...(form.items || [])];
    newItems[index][field] = value;
    setForm((prev) => ({ ...prev, items: newItems }));
  }

  function addItem() {
    const newItem = {
      id: Date.now(),
      question: '',
      answer: ''
    };
    setForm((prev) => ({
      ...prev,
      items: [...(prev.items || []), newItem]
    }));
  }

  function removeItem(index) {
    const newItems = (form.items || []).filter((_, idx) => idx !== index);
    setForm((prev) => ({ ...prev, items: newItems }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSave(form);
  }

  return (
    <div className="admin-panel">
      <h3>FAQ Section Settings</h3>
      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="admin-form-row">
          <label>Section Title</label>
          <input 
            name="title" 
            value={form.title || ''} 
            onChange={handleChange} 
            placeholder="06. FREQUENTLY ASKED QUESTIONS" 
          />
        </div>

        <h4 style={{ marginTop: '24px', marginBottom: '16px', color: '#fff' }}>FAQ Items</h4>
        {form.items?.map((item, idx) => (
          <div key={item.id || idx} style={{ marginBottom: '16px', padding: '16px', background: '#0f0f0f', borderRadius: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h5 style={{ color: '#1e90ff', margin: 0 }}>Question {idx + 1}</h5>
              <button 
                type="button" 
                onClick={() => removeItem(idx)}
                style={{ background: '#dc3545', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '4px', cursor: 'pointer' }}
              >
                Remove
              </button>
            </div>
            <div className="admin-form-row">
              <label>Question</label>
              <input 
                value={item.question} 
                onChange={(e) => handleItemChange(idx, 'question', e.target.value)} 
                placeholder="How long does a typical project take?" 
              />
            </div>
            <div className="admin-form-row">
              <label>Answer</label>
              <textarea 
                value={item.answer} 
                onChange={(e) => handleItemChange(idx, 'answer', e.target.value)} 
                placeholder="The timeline varies depending on the project scope..."
                rows={4}
              />
            </div>
          </div>
        ))}

        <button 
          type="button" 
          onClick={addItem}
          style={{ 
            background: '#28a745', 
            color: '#fff', 
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: '4px', 
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          + Add FAQ Item
        </button>

        <div className="admin-form-actions">
          <button type="submit" className="btn-primary">Save Changes</button>
        </div>
      </form>
    </div>
  );
}
