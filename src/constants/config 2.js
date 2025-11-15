/**
 * Site Configuration
 * Основні налаштування сайту
 */

export const SITE_CONFIG = {
  name: 'AnKo',
  title: 'AnKo - Професійні веб-рішення',
  description: 'Ми створюємо сучасні веб-рішення для вашого бізнесу',
  author: 'Andrey Zhukov',
  email: 'info@anko.com',
  phone: '+380 XX XXX XX XX',
  address: 'м. Київ, Україна',
  
  social: {
    facebook: '#',
    instagram: '#',
    linkedin: '#',
    twitter: '#'
  },

  // Навігаційні секції
  sections: [
    { id: 'hero', label: 'Головна' },
    { id: 'about', label: 'Про нас' },
    { id: 'services', label: 'Послуги' },
    { id: 'portfolio', label: 'Портфоліо' },
    { id: 'team', label: 'Команда' },
    { id: 'contact', label: 'Контакти' }
  ]
};

export default SITE_CONFIG;
