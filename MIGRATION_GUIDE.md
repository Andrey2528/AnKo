# 🔄 Міграція на нову структуру - Інструкції

## ✅ Що було зроблено

### 1. 📁 Створено папку для SCSS змінних
- `src/styles/abstracts/_variables.scss` - 150+ змінних
- `src/styles/abstracts/_mixins.scss` - 20+ міксінів
- `src/styles/abstracts/index.scss` - головний файл
- `src/styles/abstracts/README.md` - документація

### 2. 🗂️ Реорганізовано UI компоненти

**Було:**
```
components/ui/
├── Button.jsx
├── Button.scss
└── index.js
```

**Стало:**
```
components/ui/
├── Button/
│   ├── Button.jsx
│   ├── Button.scss
│   └── index.js
└── index.js
```

### 3. 🗂️ Реорганізовано common компоненти

**Було:**
```
components/common/
├── Header.jsx
├── Header.scss
└── index.js
```

**Стало:**
```
components/common/
├── Header/
│   ├── Header.jsx
│   ├── Header.scss
│   └── index.js
└── index.js
```

### 4. ✨ Оновлено SCSS файли

Всі компоненти тепер використовують змінні:
- ✅ Button.scss
- ✅ Card.scss
- ✅ Container.scss

## 📚 Нова документація

Створено файли:
- ✅ `STRUCTURE_UPDATE.md` - Опис змін
- ✅ `src/styles/abstracts/README.md` - Документація змінних

## 🚀 Що потрібно зробити далі

### 1. Оновити секції (sections/)

Кожна секція має використовувати змінні:

```scss
// Hero.scss, About.scss, Services.scss, Contact.scss
@import '@/styles/abstracts';

.hero {
  padding: $spacing-3xl 0;
  background: $gradient-primary;
  
  @include mobile {
    padding: $spacing-2xl 0;
  }
}
```

### 2. Оновити common компоненти

```scss
// Header.scss, Footer.scss
@import '@/styles/abstracts';

.header {
  background: $color-bg;
  padding: $spacing-md 0;
  
  @include mobile {
    padding: $spacing-sm 0;
  }
}
```

### 3. Перевірити імпорти

Переконайтеся, що всі імпорти працюють:
```jsx
// Імпорти залишаються без змін
import { Button, Card, Container } from './components/ui';
import { Header, Footer } from './components/common';
```

## 📖 Як використовувати нову систему

### В компонентах (.jsx файли):

Імпорти **НЕ змінилися**:
```jsx
import { Button } from '../components/ui';
import { Card } from '../components/ui';
// або
import { Button, Card } from '../components/ui';
```

### В стилях (.scss файли):

**Завжди додавайте** на початку файлу:
```scss
@import '@/styles/abstracts';
```

Потім використовуйте змінні та міксіни:
```scss
.my-component {
  // Замість: color: #667eea;
  color: $color-primary;
  
  // Замість: padding: 1.5rem;
  padding: $spacing-md;
  
  // Замість: @media (max-width: 768px)
  @include mobile {
    padding: $spacing-sm;
  }
}
```

## 🎨 Приклади використання

### Кольори
```scss
// ❌ Погано
background: #667eea;
color: #1f2937;

// ✅ Добре
background: $color-primary;
color: $color-text;
```

### Відступи
```scss
// ❌ Погано
padding: 1.5rem;
margin-bottom: 2rem;

// ✅ Добре
padding: $spacing-md;
margin-bottom: $spacing-lg;
```

### Responsive
```scss
// ❌ Погано
@media (max-width: 768px) {
  padding: 1rem;
}

// ✅ Добре
@include mobile {
  padding: $spacing-sm;
}
```

### Тіні та радіуси
```scss
// ❌ Погано
box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
border-radius: 8px;

// ✅ Добре
box-shadow: $shadow-md;
border-radius: $radius-md;
```

## 🔍 Перевірка

Після оновлення перевірте:

1. **Імпорти працюють:**
   ```bash
   npm run dev
   ```

2. **Немає помилок** в консолі браузера

3. **Стилі застосовуються** правильно

4. **Responsive** працює на всіх екранах

## 📋 Checklist

- [ ] Всі секції оновлено на використання змінних
- [ ] Header та Footer використовують змінні
- [ ] Проект запускається без помилок
- [ ] Стилі виглядають правильно
- [ ] Responsive працює
- [ ] Документація прочитана

## 🆘 Troubleshooting

### Проблема: Імпорт не знаходить файл

**Рішення:**
```scss
// Замість:
@import '../../styles/abstracts';

// Використовуйте:
@import '@/styles/abstracts';
```

### Проблема: Змінна не визначена

**Рішення:**
Переконайтеся, що ви імпортували abstracts:
```scss
@import '@/styles/abstracts'; // Це повинно бути на початку файлу
```

### Проблема: Компонент не імпортується

**Рішення:**
Імпорти залишилися без змін:
```jsx
import { Button } from '../components/ui'; // ✅ Правильно
```

## 📚 Додаткова інформація

- [STRUCTURE_UPDATE.md](./STRUCTURE_UPDATE.md) - Детальний опис змін
- [src/styles/abstracts/README.md](./src/styles/abstracts/README.md) - Документація змінних
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Повна архітектура
- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Посібник компонентів

---

**Успішної міграції! 🚀**
