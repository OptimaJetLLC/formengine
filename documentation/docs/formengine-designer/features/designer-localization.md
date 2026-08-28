---
sidebar_position: 12
title: Designer localization
slug: /formengine-designer/features/designer-localization
description: Using custom languages in Designer can greatly enhance your project by allowing you to target a specific audience or customize the user experience
---

:::info For form authors

This page is for **designer menu** language (integrators). For **form field** languages, see
[Localization for form authors](designer-guide:appearance-and-readability/localization-for-form-authors/).
:::

Using custom languages in Designer can greatly enhance your project by allowing you to target a specific audience or customize the user
experience. You can localize elements such as menu names, component names, property names, and so on. By using custom languages, you can
ensure that these elements are displayed in the desired language.

To provide localization for Designer, it is required to
use [i18n](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#i18n)
property. This will ensure that the interface is displayed in the desired language, providing users with a more customized experience. Below
is an example of how to configure and manage custom languages for Designer.

Let's provide custom localization for the left static menu to French and Turkish by using the following snippet:

```tsx
import {frFR, trTR} from 'rsuite/esm/locales/index.js'

const builderLanguages: FormBuilderI18n = {
  languages: [
    new Language('fr', 'FR', 'French', 'Français'),
    new Language('tr', 'TR', 'Turkish', 'Türkçe'),
  ],
  getData: async languageFullCode => {
    if (languageFullCode === 'tr-TR') {
      return {
        data: {leftMenu: {menu: 'Menü'}},
        componentsLocale: trTR
      }
    }
    return {
      data: {leftMenu: {menu: 'Menu'}},
      componentsLocale: frFR
    }
  }
}

<FormBuilder
  i18n={builderLanguages}
  {...otherProps}
/>
```

Therefore, the left menu should be localized to French and Turkish. Use similar logic to customize other elements of the Designer.

The translation files can be found in the `@react-form-builder/designer/dist/locales/` folder (inside your `node_modules` directory):

![Translation files](/assets/features/designer-localization/designer-localization-01.png "Translation files")
