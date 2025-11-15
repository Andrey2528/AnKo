// Local projects API using localStorage + small event emitter
const STORAGE_KEY = 'anko_projects_v1';

const emitter = new EventTarget();

const seed = [
  {
    id: 'p-' + Date.now(),
    title: 'Example Project',
    description: 'This is a seeded example project. Edit or remove it from Admin.',
    tags: ['web', 'design'],
    img: '',
    link: '#'
  }
];

function ensureSeed() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
  }
}

export function loadProjects() {
  ensureSeed();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(raw) || [];
  } catch (e) {
    console.error('Failed to parse projects from localStorage', e);
    return [];
  }
}

export function saveProjects(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  // notify listeners
  emitter.dispatchEvent(new Event('change'));
}

export function addProject(project) {
  const projects = loadProjects();
  const p = { ...project, id: 'p-' + Date.now() };
  projects.unshift(p);
  saveProjects(projects);
  return p;
}

export function updateProject(id, changes) {
  const projects = loadProjects().map((p) => (p.id === id ? { ...p, ...changes } : p));
  saveProjects(projects);
  return projects;
}

export function removeProject(id) {
  const projects = loadProjects().filter((p) => p.id !== id);
  saveProjects(projects);
  return projects;
}

export function onProjectsChange(cb) {
  emitter.addEventListener('change', cb);
}

export function offProjectsChange(cb) {
  emitter.removeEventListener('change', cb);
}

export const __TEST_ONLY = { STORAGE_KEY };
