---
sidebar_position: 10
title: Theme manipulation
description: How to set a designer theme (light, dark, or system theme).
slug: /formengine-designer/faq/theme-manipulation
---

# Theme manipulation

You can control the theme (light, dark, or system default) in your application by passing
the [theme](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#theme) prop to the `FormBuilder` component or
by directly modifying `theme` value in `localStorage`.

## Setting the theme

### Using the theme property in FormBuilder component

To set the theme in [FormBuilder](/api-reference/@react-form-builder/designer/variables/FormBuilder), simply pass one of the following
values to the [theme](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#theme) property:

- `light` - forces the application to use the light theme.
- `dark` - forces the application to use the dark theme.
- `system` - adapts to the user's system theme preference (light or dark).

#### Example

```tsx
<FormBuilder
  theme="light"
  {...otherProps}
/>
```

### Setting the theme via localStorage

Alternatively, you can control the theme by directly setting the `theme` value in `localStorage`.

#### Example

```typescript
localStorage.setItem('theme', 'light');
```
