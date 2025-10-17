# 📐 Архітектура проекту AnKo

## 🎯 Огляд

Це корпоративний лендінг на React з модульною архітектурою, що забезпечує легку підтримку, масштабованість та швидку розробку.

## 📁 Структура проекту

```
ANKO/
├── public/                 # Статичні файли
│   ├── manifest.json      # PWA manifest
│   └── robots.txt         # SEO robots file
│
├── src/
│   ├── assets/            # Медіа-ресурси
│   │   ├── fonts/        # Шрифти
│   │   ├── icons/        # SVG іконки
│   │   └── images/       # Зображення
│   │
│   ├── components/        # React компоненти
│   │   ├── ui/           # Базові UI компоненти
│   │   │   ├── Button.jsx
│   │   │   ├── Button.scss
│   │   │   ├── Card.jsx
│   │   │   ├── Card.scss
│   │   │   ├── Container.jsx
│   │   │   ├── Container.scss
│   │   │   └── index.js
│   │   │
│   │   └── common/       # Спільні компоненти
│   │       ├── Header.jsx
│   │       ├── Header.scss
│   │       ├── Footer.jsx
│   │       ├── Footer.scss
│   │       └── index.js
│   │
│   ├── sections/          # Секції лендінгу
│   │   ├── Hero.jsx
│   │   ├── Hero.scss
│   │   ├── About.jsx
│   │   ├── About.scss
│   │   ├── Services.jsx
│   │   ├── Services.scss
│   │   ├── Contact.jsx
│   │   ├── Contact.scss
│   │   └── index.js
│   │
│   ├── hooks/             # Custom React hooks
│   │   ├── useIntersectionObserver.js
│   │   ├── useScrollSpy.js
│   │   └── index.js
│   │
│   ├── utils/             # Утилітарні функції
│   │   ├── scroll.js
│   │   ├── validation.js
│   │   └── index.js
│   │
│   ├── constants/         # Константи та конфігурація
│   │   └── config.js
│   │
│   ├── styles/            # Глобальні стилі
│   │   └── globals.css
│   │
│   ├── App.jsx           # Головний компонент
│   └── main.jsx          # Entry point
│
├── index.html            # HTML template
├── package.json          # Dependencies
├── vite.config.js        # Vite configuration
└── jsconfig.json         # JS configuration
```

## 🏗️ Архітектурні принципи

### 1. **Модульність**
- Кожен компонент має свою папку або файл
- Стилі розміщені поруч з компонентами (SCSS)
- Експорт через `index.js` для зручного імпорту

### 2. **Компонентний підхід**
```
components/
├── ui/         → Переміщувані базові елементи
└── common/     → Загальні компоненти для всього сайту
```

### 3. **Секційна структура**
```
sections/       → Великі блоки сторінки (Hero, About, Services)
```

### 4. **Розділення відповідальності**
- **Components**: Візуальне представлення
- **Hooks**: Логіка та стани
- **Utils**: Допоміжні функції
- **Constants**: Налаштування та константи

## 🎨 Компоненти UI

### Button
Універсальний компонент кнопки з варіантами:
- `primary`, `secondary`, `outline`, `ghost`
- Розміри: `small`, `medium`, `large`

```jsx
import { Button } from './components/ui';

<Button variant="primary" size="medium" onClick={handleClick}>
  Click me
</Button>
```

### Card
Контейнер для контенту з ефектами:
```jsx
import { Card } from './components/ui';

<Card hover variant="elevated">
  <div className="card__header">
    <h3>Title</h3>
  </div>
  <div className="card__content">
    <p>Content</p>
  </div>
</Card>
```

### Container
Контейнер для центрування контенту:
```jsx
import { Container } from './components/ui';

<Container size="narrow">
  <h1>Content</h1>
</Container>
```

## 🎣 Custom Hooks

### useIntersectionObserver
Відстеження видимості елементів для анімацій:
```jsx
import { useIntersectionObserver } from './hooks';

const [ref, isVisible] = useIntersectionObserver({ threshold: 0.1 });

<div ref={ref} className={isVisible ? 'fade-in' : ''}>
  Animated content
</div>
```

### useScrollSpy
Відстеження активної секції при скролі:
```jsx
import { useScrollSpy } from './hooks';

const activeSection = useScrollSpy(['hero', 'about', 'services']);

<a className={activeSection === 'hero' ? 'active' : ''}>Home</a>
```

## 🛠️ Utilities

### Scroll Utils
```js
import { scrollToElement } from './utils';

scrollToElement('about', 80); // Плавний скрол до секції
```

### Validation Utils
```js
import { isValidEmail, isValidPhone } from './utils';

const valid = isValidEmail('test@example.com');
```

## 🎨 Стилізація

### SCSS архітектура
- **BEM методологія** для класів
- **Вкладені селектори** для структури
- **CSS змінні** в `globals.css` для консистентності

```scss
.component {
  &__element {
    // styles
  }
  
  &--modifier {
    // styles
  }
}
```

### Глобальні CSS змінні
```css
:root {
  --color-primary: #667eea;
  --color-primary-dark: #764ba2;
  --spacing-md: 1.5rem;
  --transition-base: 300ms ease-in-out;
}
```

## 📱 Адаптивність

Брейкпоінти:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

```scss
@media (max-width: 768px) {
  .component {
    // mobile styles
  }
}
```

## 🚀 Як додати нову секцію

1. Створіть компонент в `src/sections/`:
```jsx
// src/sections/NewSection.jsx
import React from 'react';
import { Container } from '../components/ui';
import './NewSection.scss';

const NewSection = () => {
  return (
    <section id="new-section" className="new-section">
      <Container>
        <h2>New Section</h2>
      </Container>
    </section>
  );
};

export default NewSection;
```

2. Створіть стилі:
```scss
// src/sections/NewSection.scss
.new-section {
  padding: 6rem 0;
  // styles
}
```

3. Додайте експорт в `src/sections/index.js`:
```js
export { default as NewSection } from './NewSection';
```

4. Додайте в `App.jsx`:
```jsx
import { NewSection } from './sections';

<NewSection />
```

## 🎯 Як додати новий UI компонент

1. Створіть компонент:
```jsx
// src/components/ui/Input.jsx
import React from 'react';
import './Input.scss';

/**
 * Input Component
 * @param {Object} props
 */
const Input = ({ type = 'text', placeholder, ...props }) => {
  return (
    <input 
      className="input" 
      type={type} 
      placeholder={placeholder}
      {...props}
    />
  );
};

export default Input;
```

2. Створіть стилі:
```scss
// src/components/ui/Input.scss
.input {
  // styles
}
```

3. Додайте експорт:
```js
// src/components/ui/index.js
export { default as Input } from './Input';
```

## 🔧 Налаштування

Всі налаштування в `src/constants/config.js`:
```js
export const SITE_CONFIG = {
  name: 'AnKo',
  email: 'info@anko.com',
  social: {
    facebook: '#',
    instagram: '#'
  }
};
```

## 📦 Залежності

### Основні
- **React 19.2.0** - UI бібліотека
- **Vite** - Швидка збірка
- **React Router** - Маршрутизація (якщо потрібна)

### Рекомендовані доповнення
- **Framer Motion** - Анімації
- **React Hook Form** - Форми
- **Axios** - HTTP запити
- **React Helmet** - SEO

## 🎨 Дизайн-система

### Кольори
- Primary: `#667eea` → `#764ba2`
- Secondary: `#f59e0b`
- Accent: `#fbbf24`

### Типографіка
- Font Family: System fonts
- Sizes: xs, sm, base, lg, xl, 2xl, 3xl, 4xl

### Відступи
- xs: 0.5rem
- sm: 1rem
- md: 1.5rem
- lg: 2rem
- xl: 3rem
- 2xl: 4rem

## ✅ Best Practices

1. **Компоненти**
   - Один компонент = один файл
   - JSDoc коментарі для документації
   - Props validation (опціонально PropTypes)

2. **Стилі**
   - BEM методологія
   - SCSS файл поруч з компонентом
   - Використання CSS змінних

3. **Код**
   - ES6+ синтаксис
   - Functional components + hooks
   - Деструктуризація props

4. **Іменування**
   - Components: PascalCase (`Button.jsx`)
   - Files: camelCase (`useScrollSpy.js`)
   - CSS classes: kebab-case (`card__header`)

## 🚀 Команди

```bash
# Розробка
npm run dev

# Збірка
npm run build

# Перегляд збірки
npm run preview
```

## 📝 Ліцензія

MIT - Andrey Zhukov

---

**Версія документації:** 1.0.0  
**Остання оновлення:** 17.10.2025
