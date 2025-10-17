# 📐 Оновлена структура проекту

## ✅ Зміни в архітектурі

### 🎨 Додано папку для SCSS змінних

```
src/styles/abstracts/
├── _variables.scss    # Всі SCSS змінні
├── _mixins.scss       # Переміщувані міксіни
└── index.scss         # Головний файл для імпорту
```

**Використання:**
```scss
@import '@/styles/abstracts';

.my-component {
  color: $color-primary;
  padding: $spacing-md;
  @include mobile {
    padding: $spacing-sm;
  }
}
```

### 📦 Компоненти розбито по папках

**До:**
```
components/ui/
├── Button.jsx
├── Button.scss
├── Card.jsx
├── Card.scss
└── index.js
```

**Після:**
```
components/ui/
├── Button/
│   ├── Button.jsx
│   ├── Button.scss
│   └── index.js
├── Card/
│   ├── Card.jsx
│   ├── Card.scss
│   └── index.js
└── index.js
```

## 📁 Повна оновлена структура

```
src/
├── assets/
│   ├── fonts/
│   ├── icons/
│   └── images/
│
├── components/
│   ├── ui/
│   │   ├── Button/
│   │   │   ├── Button.jsx
│   │   │   ├── Button.scss
│   │   │   └── index.js
│   │   ├── Card/
│   │   │   ├── Card.jsx
│   │   │   ├── Card.scss
│   │   │   └── index.js
│   │   ├── Container/
│   │   │   ├── Container.jsx
│   │   │   ├── Container.scss
│   │   │   └── index.js
│   │   └── index.js
│   │
│   └── common/
│       ├── Header/
│       │   ├── Header.jsx
│       │   ├── Header.scss
│       │   └── index.js
│       ├── Footer/
│       │   ├── Footer.jsx
│       │   ├── Footer.scss
│       │   └── index.js
│       └── index.js
│
├── sections/
│   ├── Hero.jsx
│   ├── Hero.scss
│   ├── About.jsx
│   ├── About.scss
│   ├── Services.jsx
│   ├── Services.scss
│   ├── Contact.jsx
│   ├── Contact.scss
│   └── index.js
│
├── hooks/
│   ├── useIntersectionObserver.js
│   ├── useScrollSpy.js
│   └── index.js
│
├── utils/
│   ├── scroll.js
│   ├── validation.js
│   └── index.js
│
├── constants/
│   └── config.js
│
├── styles/
│   ├── abstracts/
│   │   ├── _variables.scss    ⭐ НОВИЙ
│   │   ├── _mixins.scss        ⭐ НОВИЙ
│   │   └── index.scss          ⭐ НОВИЙ
│   └── globals.css
│
├── App.jsx
└── main.jsx
```

## 🎨 SCSS змінні та міксіни

### Доступні змінні:

**Кольори:**
- `$color-primary`, `$color-primary-dark`, `$color-primary-light`
- `$color-secondary`, `$color-accent`
- `$color-text`, `$color-text-light`, `$color-text-lighter`
- `$color-bg`, `$color-bg-alt`, `$color-bg-dark`

**Відступи:**
- `$spacing-xs`, `$spacing-sm`, `$spacing-md`
- `$spacing-lg`, `$spacing-xl`, `$spacing-2xl`, `$spacing-3xl`

**Типографіка:**
- `$font-size-xs` до `$font-size-5xl`
- `$font-weight-light` до `$font-weight-extrabold`
- `$line-height-tight`, `$line-height-normal`, etc.

**Інше:**
- `$radius-sm` до `$radius-full`
- `$shadow-sm` до `$shadow-2xl`
- `$transition-fast`, `$transition-base`, `$transition-slow`
- `$gradient-primary`, `$gradient-secondary`

### Доступні міксіни:

**Responsive:**
```scss
@include mobile { ... }
@include tablet { ... }
@include desktop { ... }
@include respond-to(1024px) { ... }
```

**Flexbox:**
```scss
@include flex-center;
@include flex-column-center;
@include flex-between;
```

**Effects:**
```scss
@include hover-lift(-5px);
@include focus-ring($color-primary);
@include gradient-text($gradient-primary);
```

**Layout:**
```scss
@include absolute-center;
@include overlay(rgba(0, 0, 0, 0.5));
@include cover-image;
```

**Animations:**
```scss
@include fade-in(0.6s);
@include slide-in('left', 0.6s);
```

## 🔄 Як працювати з новою структурою

### Додати новий UI компонент:

1. Створіть папку в `src/components/ui/NewComponent/`
2. Додайте файли:
   ```
   NewComponent/
   ├── NewComponent.jsx
   ├── NewComponent.scss
   └── index.js
   ```
3. В `NewComponent.scss`:
   ```scss
   @import '@/styles/abstracts';
   
   .new-component {
     color: $color-primary;
     padding: $spacing-md;
   }
   ```
4. В `index.js`:
   ```js
   export { default } from './NewComponent';
   ```
5. Додайте експорт в `components/ui/index.js`:
   ```js
   export { default as NewComponent } from './NewComponent';
   ```

### Використовувати змінні:

```scss
// В будь-якому .scss файлі
@import '@/styles/abstracts';

.my-class {
  // Кольори
  color: $color-primary;
  background: $color-bg-alt;
  
  // Відступи
  padding: $spacing-lg;
  margin-bottom: $spacing-md;
  
  // Типографіка
  font-size: $font-size-lg;
  font-weight: $font-weight-semibold;
  
  // Інше
  border-radius: $radius-md;
  box-shadow: $shadow-md;
  transition: $transition-all;
  
  // Міксіни
  @include mobile {
    padding: $spacing-sm;
  }
}
```

## ✨ Переваги нової структури

1. **Організованість** - Кожен компонент в окремій папці
2. **Масштабованість** - Легко додавати нові компоненти
3. **Консистентність** - Всі змінні в одному місці
4. **DRY принцип** - Переміщувані міксіни
5. **Легкість підтримки** - Зрозуміла структура

## 📚 Документація

Дивіться:
- [ARCHITECTURE.md](./ARCHITECTURE.md) - Повна документація
- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Посібник по компонентам
- [QUICK_START.md](./QUICK_START.md) - Швидкий старт

---

**Оновлено:** 17.10.2025
