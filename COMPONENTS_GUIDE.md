# 🎓 Посібник по використанню компонентів

## 📋 Зміст
- [Button](#button)
- [Card](#card)
- [Container](#container)
- [Header](#header)
- [Footer](#footer)
- [Custom Hooks](#custom-hooks)

---

## Button

### Базове використання
```jsx
import { Button } from './components/ui';

<Button>Натисни мене</Button>
```

### Всі варіанти
```jsx
// Primary (за замовчуванням)
<Button variant="primary">Primary</Button>

// Secondary
<Button variant="secondary">Secondary</Button>

// Outline
<Button variant="outline">Outline</Button>

// Ghost
<Button variant="ghost">Ghost</Button>
```

### Розміри
```jsx
<Button size="small">Small</Button>
<Button size="medium">Medium</Button> {/* за замовчуванням */}
<Button size="large">Large</Button>
```

### З обробником подій
```jsx
const handleClick = () => {
  console.log('Clicked!');
};

<Button onClick={handleClick}>
  Click me
</Button>
```

### Вимкнена кнопка
```jsx
<Button disabled>Disabled</Button>
```

### Кнопка на всю ширину
```jsx
<Button fullWidth>Full Width Button</Button>
```

---

## Card

### Базове використання
```jsx
import { Card } from './components/ui';

<Card>
  <p>Some content</p>
</Card>
```

### З ефектом hover
```jsx
<Card hover>
  <p>Hover over me!</p>
</Card>
```

### Варіанти
```jsx
// За замовчуванням
<Card>Default Card</Card>

// З рамкою
<Card variant="bordered">Bordered Card</Card>

// Піднята картка
<Card variant="elevated">Elevated Card</Card>
```

### Структурована картка
```jsx
<Card hover>
  <div className="card__header">
    <h3>Заголовок картки</h3>
  </div>
  <div className="card__content">
    <p>Основний контент картки з описом.</p>
  </div>
  <div className="card__footer">
    <Button size="small">Детальніше</Button>
  </div>
</Card>
```

---

## Container

### Базове використання
```jsx
import { Container } from './components/ui';

<Container>
  <h1>Centered content</h1>
</Container>
```

### Розміри
```jsx
// За замовчуванням (1200px)
<Container>
  <p>Default width</p>
</Container>

// Вузький контейнер (800px)
<Container size="narrow">
  <p>Narrow content</p>
</Container>

// Широкий контейнер (1400px)
<Container size="wide">
  <p>Wide content</p>
</Container>

// Fluid контейнер (100%)
<Container size="fluid">
  <p>Full width</p>
</Container>
```

---

## Header

### Використання
Компонент Header вже інтегрований в `App.jsx` та не потребує додаткового налаштування.

### Налаштування навігації
Відредагуйте масив `navItems` в `Header.jsx`:

```jsx
const navItems = [
  { label: 'Головна', href: '#hero' },
  { label: 'Про нас', href: '#about' },
  { label: 'Послуги', href: '#services' },
  { label: 'Контакти', href: '#contact' }
];
```

### Зміна логотипу
```jsx
<div className="header__logo">
  <a href="#hero">Ваш логотип</a>
</div>
```

---

## Footer

### Налаштування контактів
Відредагуйте секції в `Footer.jsx`:

```jsx
<div className="footer__section">
  <h4>Контакти</h4>
  <ul className="footer__links">
    <li>Email: your@email.com</li>
    <li>Телефон: +380 XX XXX XX XX</li>
    <li>Адреса: Ваша адреса</li>
  </ul>
</div>
```

---

## Custom Hooks

### useIntersectionObserver

Відстеження видимості елемента для анімацій.

```jsx
import { useIntersectionObserver } from './hooks';

function AnimatedSection() {
  const [ref, isVisible] = useIntersectionObserver({ 
    threshold: 0.1 
  });

  return (
    <div 
      ref={ref} 
      className={isVisible ? 'fade-in' : ''}
    >
      Цей контент з'явиться з анімацією
    </div>
  );
}
```

### useScrollSpy

Відстеження активної секції при скролі для навігації.

```jsx
import { useScrollSpy } from './hooks';

function Navigation() {
  const activeSection = useScrollSpy(
    ['hero', 'about', 'services', 'contact'], 
    100
  );

  return (
    <nav>
      <a 
        href="#hero"
        className={activeSection === 'hero' ? 'active' : ''}
      >
        Home
      </a>
      <a 
        href="#about"
        className={activeSection === 'about' ? 'active' : ''}
      >
        About
      </a>
    </nav>
  );
}
```

---

## Приклади комбінування

### Карточка з кнопкою
```jsx
<Card hover variant="elevated">
  <div className="card__header">
    <h3>Веб-розробка</h3>
  </div>
  <div className="card__content">
    <p>Створюємо сучасні веб-додатки</p>
  </div>
  <div className="card__footer">
    <Button variant="primary" size="small">
      Дізнатися більше →
    </Button>
  </div>
</Card>
```

### Секція з контейнером
```jsx
<section className="services">
  <Container>
    <h2>Наші послуги</h2>
    <div className="services__grid">
      <Card hover>
        <h3>Послуга 1</h3>
        <p>Опис послуги</p>
      </Card>
      <Card hover>
        <h3>Послуга 2</h3>
        <p>Опис послуги</p>
      </Card>
    </div>
  </Container>
</section>
```

### Анімована секція
```jsx
function AnimatedServices() {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className={isVisible ? 'slide-in-left' : ''}>
      <Container>
        <h2>Наші послуги</h2>
        {/* Content */}
      </Container>
    </section>
  );
}
```

---

## 🎨 Корисні CSS класи

### Анімації
```jsx
<div className="fade-in">Плавна поява</div>
<div className="slide-in-left">Виїзд зліва</div>
<div className="slide-in-right">Виїзд справа</div>
```

### Текст
```jsx
<p className="text-center">Центрований текст</p>
<p className="text-left">Текст зліва</p>
<p className="text-right">Текст справа</p>
```

### Відступи
```jsx
<div className="mb-sm">Margin bottom small</div>
<div className="mb-md">Margin bottom medium</div>
<div className="mb-lg">Margin bottom large</div>
<div className="mt-xl">Margin top extra large</div>
```

---

## 📝 Поради

### 1. Використовуйте константи
```jsx
import { SITE_CONFIG } from './constants/config';

<a href={`mailto:${SITE_CONFIG.email}`}>
  {SITE_CONFIG.email}
</a>
```

### 2. Імпортуйте групами
```jsx
// ✅ Добре
import { Button, Card, Container } from './components/ui';
import { Hero, About, Services } from './sections';

// ❌ Погано
import Button from './components/ui/Button';
import Card from './components/ui/Card';
```

### 3. Використовуйте PropTypes (опціонально)
```jsx
import PropTypes from 'prop-types';

Button.propTypes = {
  variant: PropTypes.oneOf(['primary', 'secondary', 'outline']),
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  onClick: PropTypes.func,
  disabled: PropTypes.bool
};
```

### 4. Документуйте компоненти
```jsx
/**
 * CustomComponent
 * 
 * Опис компонента
 * 
 * @param {Object} props - Властивості
 * @example
 * <CustomComponent prop="value" />
 */
```

---

**Більше інформації в [ARCHITECTURE.md](./ARCHITECTURE.md)**
