---
title: "Style tab basics"
description: "Change fonts, colors, and spacing on the Style tab for the selected component: keep forms readable and on-brand."
---

# Style tab basics

The **Style** tab on the right panel controls how a component looks: colors, typography, borders, and layout-related visual options.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Select a component

<img src="/assets/guide/appearance/highlight-style-bold.png" alt="Style tab with font-weight bold CSS applied to the Contact details heading." />

1. Click the heading or field on the canvas, or select `sectionTitle` or `email` in **Tree** (labeled **Contact details** and **Email** on
   the canvas).
2. Click **Style** on the right.
3. Enter CSS for the component (for example `font-weight: bold;` on a heading).
4. Adjust other visual properties as needed (names depend on component type).

Common groups:

- **Typography**, font size, weight
- **Colors**, text, background, border
- **Spacing**, margin, padding on layout components

## Preview

<img src="/assets/guide/appearance/style-bold-preview-plain.png" alt="Preview mode showing the bold Contact details heading and Email field." />

1. Click **Preview** and confirm contrast and size on **Mobile**.

Developers: Programmatic styling and the Definer API are in [Component styling](docs:formengine-designer/features/component-styling).

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJzZWN0aW9uVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkNvbnRhY3QgZGV0YWlscyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX0sImNzcyI6eyJhbnkiOnsic3RyaW5nIjoiZm9udC13ZWlnaHQ6IGJvbGQ7In19fSx7ImtleSI6ImVtYWlsIiwidHlwZSI6Ik11aVRleHRGaWVsZCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiRW1haWwifX19XX0sImxhbmd1YWdlcyI6W3siY29kZSI6ImVuIiwiZGlhbGVjdCI6IlVTIiwibmFtZSI6IkVuZ2xpc2giLCJkZXNjcmlwdGlvbiI6IkFtZXJpY2FuIEVuZ2xpc2giLCJiaWRpIjoibHRyIn1dLCJkZWZhdWx0TGFuZ3VhZ2UiOiJlbi1VUyJ9&formName=style-bold&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Light and dark theme](/meet-the-designer/light-and-dark-theme)
- [Spacing and alignment basics](/form-structure-and-layout/spacing-and-alignment-basics)
