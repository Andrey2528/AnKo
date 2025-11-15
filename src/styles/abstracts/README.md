# 🎨 SCSS Abstracts

Ця папка містить всі SCSS змінні, міксіни та функції для проекту.

## 📦 Файли

- **`_variables.scss`** - Всі глобальні SCSS змінні
- **`_mixins.scss`** - Переміщувані міксіни
- **`index.scss`** - Головний файл для імпорту

## 🚀 Використання

### В будь-якому .scss файлі:

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

## 📝 Приклади

### Кольори
```scss
.element {
  color: $color-primary;              // #667eea
  background: $color-bg-alt;          // #f9fafb
  border-color: $color-border;        // #e5e7eb
}
```

### Відступи
```scss
.container {
  padding: $spacing-lg;               // 2rem
  margin-bottom: $spacing-xl;         // 3rem
}
```

### Responsive
```scss
.card {
  padding: $spacing-lg;
  
  @include mobile {
    padding: $spacing-sm;
  }
  
  @include tablet {
    padding: $spacing-md;
  }
}
```

### Flexbox
```scss
.header {
  @include flex-between;              // display: flex; justify-content: space-between
}

.modal {
  @include flex-center;               // Центрування по обох осях
}
```

### Effects
```scss
.button {
  @include hover-lift(-5px);          // Піднімається при hover
}

.input {
  @include focus-ring($color-primary); // Focus outline
}

.title {
  @include gradient-text($gradient-primary); // Градієнтний текст
}
```

### Animations
```scss
.fade-element {
  @include fade-in(0.6s);
}

.slide-element {
  @include slide-in('left', 0.6s);
}
```

## 🎯 Найчастіше використовувані

### Top 10 змінних:
1. `$color-primary` - Основний колір
2. `$spacing-md` - Середній відступ (1.5rem)
3. `$font-size-base` - Базовий розмір шрифту (1rem)
4. `$radius-md` - Середній border-radius (8px)
5. `$shadow-md` - Середня тінь
6. `$transition-base` - Базова transition (300ms)
7. `$color-text` - Колір тексту
8. `$color-bg` - Колір фону
9. `$spacing-lg` - Великий відступ (2rem)
10. `$font-weight-semibold` - Жирність шрифту (600)

### Top 5 міксінів:
1. `@include mobile { ... }` - Media query для мобільних
2. `@include flex-between` - Flexbox space-between
3. `@include hover-lift()` - Hover ефект
4. `@include fade-in()` - Анімація появи
5. `@include gradient-text()` - Градієнтний текст

## 💡 Поради

1. **Завжди імпортуйте abstracts** в .scss файлах компонентів
2. **Використовуйте змінні** замість hardcoded значень
3. **Міксіни** для повторюваних паттернів
4. **Responsive міксіни** замість @media queries
5. **Не змінюйте змінні** напряму, створюйте нові

## 🔧 Як додати нову змінну

1. Відкрийте `_variables.scss`
2. Знайдіть відповідну секцію
3. Додайте змінну з описом:

```scss
// Нова змінна
$my-new-variable: value;
```

## 🎨 Як додати новий міксін

1. Відкрийте `_mixins.scss`
2. Додайте міксін з коментарем:

```scss
// Опис міксіну
@mixin my-mixin($param) {
  // Код
}
```

---

**Дивіться також:**
- [ARCHITECTURE.md](../../../ARCHITECTURE.md)
- [COMPONENTS_GUIDE.md](../../../COMPONENTS_GUIDE.md)
