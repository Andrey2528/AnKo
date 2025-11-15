// Home sections API - управління контентом секцій головної сторінки
const STORAGE_KEY = 'anko_home_sections_v1';

const emitter = new EventTarget();

// Початкові дані для секцій
const defaultSections = {
  hero: {
    title: "We're not your ordinary digital studio.",
    buttonText: 'About Us',
    buttonLink: '#about',
  },
  about: {
    title: '01. Why we exist',
    mainText: 'We recognized that there was a gap in the creative industry - small businesses were often faced with long deadlines and high costs for quality creative services. This is why we exist.',
    secondaryText: 'We offer a curated suite of services specifically tailored for the small business owner. From complete branding, including logo design and cohesive brand identities, to comprehensive website development.',
    stats: [
      { value: '100+', label: 'Проектів' },
      { value: '50+', label: 'Клієнтів' },
      { value: '5+', label: 'Років досвіду' },
      { value: '24/7', label: 'Підтримка' },
    ],
  },
  services: {
    title: 'Наші послуги',
    subtitle: 'Комплексні рішення для вашого бізнесу',
    items: [
      {
        id: 's1',
        icon: '💻',
        title: 'Веб-розробка',
        description: 'Створення сучасних та функціональних веб-додатків на React, Vue, Angular',
      },
      {
        id: 's2',
        icon: '🎨',
        title: 'UI/UX Дизайн',
        description: 'Розробка інтуїтивних інтерфейсів, що покращують користувацький досвід',
      },
      {
        id: 's3',
        icon: '📱',
        title: 'Мобільні додатки',
        description: 'Нативні та крос-платформні мобільні додатки для iOS та Android',
      },
      {
        id: 's4',
        icon: '📈',
        title: 'SEO та Маркетинг',
        description: 'Просування сайтів у пошукових системах та цифровий маркетинг',
      },
      {
        id: 's5',
        icon: '�',
        title: 'E-commerce',
        description: 'Розробка онлайн-магазинів та систем електронної комерції',
      },
      {
        id: 's6',
        icon: '💡',
        title: 'Консалтинг',
        description: 'Технічне консультування та аудит існуючих систем',
      },
    ],
  },
  contact: {
    title: "Зв'яжіться з нами",
    subtitle: 'Готові почати ваш проект? Напишіть нам!',
    formFields: {
      nameLabel: "Ім'я",
      namePlaceholder: 'Ваше ім\'я',
      emailLabel: 'Email',
      emailPlaceholder: 'your@email.com',
      phoneLabel: 'Телефон',
      phonePlaceholder: '+380 XX XXX XX XX',
      messageLabel: 'Повідомлення',
      messagePlaceholder: 'Розкажіть про ваш проект...',
    },
    submitButtonText: 'Відправити повідомлення',
  },
  work: {
    marqueeText: 'Design Faster. Save More. Design Faster. Save More.',
    title: '02. Work',
  },
};

function ensureDefaults() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultSections));
  }
}

export function loadHomeSections() {
  ensureDefaults();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return JSON.parse(raw) || defaultSections;
  } catch (e) {
    console.error('Failed to parse home sections from localStorage', e);
    return defaultSections;
  }
}

export function saveHomeSections(sections) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(sections));
  emitter.dispatchEvent(new Event('change'));
}

export function updateSection(sectionName, data) {
  const sections = loadHomeSections();
  sections[sectionName] = { ...sections[sectionName], ...data };
  saveHomeSections(sections);
  return sections;
}

export function onHomeSectionsChange(cb) {
  emitter.addEventListener('change', cb);
}

export function offHomeSectionsChange(cb) {
  emitter.removeEventListener('change', cb);
}

export const __TEST_ONLY = { STORAGE_KEY };
