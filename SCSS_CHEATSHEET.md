# 📝 SCSS Variables Cheat Sheet

Швидкий довідник всіх доступних SCSS змінних та міксінів.

## 🎨 Кольори

### Primary
```scss
$color-primary: #667eea;
$color-primary-dark: #764ba2;
$color-primary-light: #7c8eef;
```

### Secondary & Accent
```scss
$color-secondary: #f59e0b;
$color-accent: #fbbf24;
```

### Text
```scss
$color-text: #1f2937;
$color-text-light: #6b7280;
$color-text-lighter: #9ca3af;
$color-text-white: #ffffff;
```

### Background
```scss
$color-bg: #ffffff;
$color-bg-alt: #f9fafb;
$color-bg-dark: #1f2937;
```

### Border
```scss
$color-border: #e5e7eb;
$color-border-light: #f3f4f6;
```

### State
```scss
$color-success: #10b981;
$color-warning: #f59e0b;
$color-error: #ef4444;
$color-info: #3b82f6;
```

---

## 📏 Відступи

```scss
$spacing-xs: 0.5rem;    // 8px
$spacing-sm: 1rem;      // 16px
$spacing-md: 1.5rem;    // 24px
$spacing-lg: 2rem;      // 32px
$spacing-xl: 3rem;      // 48px
$spacing-2xl: 4rem;     // 64px
$spacing-3xl: 6rem;     // 96px
```

---

## 📝 Типографіка

### Font Sizes
```scss
$font-size-xs: 0.75rem;    // 12px
$font-size-sm: 0.875rem;   // 14px
$font-size-base: 1rem;     // 16px
$font-size-lg: 1.125rem;   // 18px
$font-size-xl: 1.25rem;    // 20px
$font-size-2xl: 1.5rem;    // 24px
$font-size-3xl: 2rem;      // 32px
$font-size-4xl: 2.5rem;    // 40px
$font-size-5xl: 3rem;      // 48px
```

### Font Weights
```scss
$font-weight-light: 300;
$font-weight-normal: 400;
$font-weight-medium: 500;
$font-weight-semibold: 600;
$font-weight-bold: 700;
$font-weight-extrabold: 800;
```

### Line Heights
```scss
$line-height-tight: 1.2;
$line-height-normal: 1.5;
$line-height-relaxed: 1.6;
$line-height-loose: 1.8;
```

---

## 🔲 Border Radius

```scss
$radius-sm: 4px;
$radius-md: 8px;
$radius-lg: 12px;
$radius-xl: 16px;
$radius-2xl: 24px;
$radius-full: 9999px;
```

---

## 🌑 Shadows

```scss
$shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
$shadow-xl: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
$shadow-2xl: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
```

---

## ⏱️ Transitions

```scss
$transition-fast: 150ms ease-in-out;
$transition-base: 300ms ease-in-out;
$transition-slow: 500ms ease-in-out;

// Готові переходи
$transition-all: all $transition-base;
$transition-colors: color $transition-base, background-color $transition-base;
$transition-transform: transform $transition-base;
$transition-opacity: opacity $transition-base;
```

---

## 📱 Breakpoints

```scss
$breakpoint-xs: 480px;
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
$breakpoint-2xl: 1536px;
```

---

## 🎨 Gradients

```scss
$gradient-primary: linear-gradient(135deg, $color-primary 0%, $color-primary-dark 100%);
$gradient-secondary: linear-gradient(to right, $color-secondary, $color-accent);
$gradient-overlay: linear-gradient(to bottom, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7));
```

---

## 📦 Layout

```scss
$container-max-width: 1200px;
$container-narrow: 800px;
$container-wide: 1400px;
$container-padding: 2rem;
$container-padding-mobile: 1rem;
```

---

## 🎯 Міксіни

### Responsive
```scss
@include mobile { ... }                    // < 768px
@include tablet { ... }                    // 768px - 1024px
@include desktop { ... }                   // > 1024px
@include respond-to(1200px) { ... }        // Custom breakpoint
```

### Flexbox
```scss
@include flex-center;                      // Центрування по обох осях
@include flex-column-center;               // Вертикальний flex center
@include flex-between;                     // Space-between
```

### Typography
```scss
@include text-ellipsis;                    // Обрізка тексту з ...
@include line-clamp(2);                    // Багаторядковий ellipsis
@include gradient-text($gradient);         // Градієнтний текст
```

### Effects
```scss
@include box-shadow($shadow-md);           // Тінь
@include hover-lift(-5px);                 // Піднімається при hover
@include focus-ring($color-primary);       // Focus outline
```

### Layout
```scss
@include absolute-center;                  // Абсолютне центрування
@include overlay(rgba(0, 0, 0, 0.5));     // Напівпрозорий overlay
@include cover-image;                      // Full cover image
```

### Buttons
```scss
@include button-reset;                     // Скидання стилів кнопки
@include button-base;                      // Базові стилі кнопки
```

### Animations
```scss
@include fade-in(0.6s);                    // Fade in анімація
@include slide-in('left', 0.6s);          // Slide in анімація
```

### Utility
```scss
@include clearfix;                         // Clearfix
@include visually-hidden;                  // Візуально приховати
@include custom-scrollbar(8px, $color);    // Кастомний scrollbar
```

---

## 💡 Швидкі приклади

### Картка з тінню
```scss
.card {
  background: $color-bg;
  padding: $spacing-lg;
  border-radius: $radius-lg;
  box-shadow: $shadow-md;
  
  @include mobile {
    padding: $spacing-md;
  }
}
```

### Кнопка з градієнтом
```scss
.button {
  background: $gradient-primary;
  color: $color-text-white;
  padding: $spacing-sm $spacing-md;
  border-radius: $radius-md;
  transition: $transition-all;
  
  @include hover-lift(-3px);
}
```

### Заголовок з градієнтом
```scss
.title {
  font-size: $font-size-3xl;
  font-weight: $font-weight-bold;
  @include gradient-text($gradient-primary);
}
```

### Responsive контейнер
```scss
.container {
  max-width: $container-max-width;
  padding: 0 $container-padding;
  
  @include mobile {
    padding: 0 $container-padding-mobile;
  }
}
```

### Модальне вікно
```scss
.modal {
  @include absolute-center;
  background: $color-bg;
  padding: $spacing-xl;
  border-radius: $radius-xl;
  box-shadow: $shadow-2xl;
}

.modal-backdrop {
  @include overlay(rgba(0, 0, 0, 0.5));
}
```

---

## 📌 Найчастіше використовувані

### Top 10 змінних:
1. `$color-primary`
2. `$spacing-md`
3. `$spacing-lg`
4. `$font-size-base`
5. `$radius-md`
6. `$shadow-md`
7. `$transition-base`
8. `$color-text`
9. `$color-bg`
10. `$font-weight-semibold`

### Top 5 міксінів:
1. `@include mobile`
2. `@include flex-between`
3. `@include hover-lift()`
4. `@include fade-in()`
5. `@include gradient-text()`

---

**Використання:**
```scss
@import '@/styles/abstracts';

.my-component {
  // Ваші стилі тут
}
```
