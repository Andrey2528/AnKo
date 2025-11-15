// Local pages API using localStorage + small event emitter
const STORAGE_KEY = 'anko_pages_v1';

const emitter = new EventTarget();

const seed = [
  {
    id: 'page-' + Date.now(),
    title: 'Example Project',
    slug: 'example-project',
    description: 'This is a comprehensive project page example. You can edit or remove this from Admin.',
    content: '<h2>About this project</h2><p>Detailed information about the project goes here. You can use HTML formatting.</p>',
    images: ['https://via.placeholder.com/800x600'],
    techStack: ['React', 'Vite', 'SCSS'],
    projectUrl: '#',
    githubUrl: '#',
    category: 'web',
  },
];

function ensureSeed() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}

export function loadPages() {
  ensureSeed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(raw) || [];
  } catch (e) {
    console.error('Failed to parse pages from localStorage', e);
    return [];
  }
}

export function savePages(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  emitter.dispatchEvent(new Event('change'));
}

export function addPage(page) {
  const pages = loadPages();
  const p = { ...page, id: 'page-' + Date.now() };
  pages.unshift(p);
  savePages(pages);
  return p;
}

export function updatePage(id, changes) {
  const pages = loadPages().map((p) => (p.id === id ? { ...p, ...changes } : p));
  savePages(pages);
  return pages;
}

export function removePage(id) {
  const pages = loadPages().filter((p) => p.id !== id);
  savePages(pages);
  return pages;
}

export function onPagesChange(cb) {
  emitter.addEventListener('change', cb);
}

export function offPagesChange(cb) {
  emitter.removeEventListener('change', cb);
}

export const __TEST_ONLY = { STORAGE_KEY };
