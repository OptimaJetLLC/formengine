---
title: "Light and dark theme"
description: "Toggle the Designer theme in the header and check your form in both light and dark before handoff."
---

# Light and dark theme

Designer supports **light** and **dark** themes (and may follow system theme). Toggle theme to see whether your form remains readable.

## Toggle theme

<img src="/assets/guide/workspace/highlight-theme-toggle.png" alt="Red arrow pointing to the Toggle theme button in the header." />

1. Find the **theme** toggle in the header (sun/moon icon, tooltip **Toggle theme**).
2. Switch themes and review the canvas and **Preview**.

## What theme affects

- Designer panels, menus, and theme colors
- May affect default field appearance on the canvas depending on component library

End-user theme in production is controlled by your host application, not only this toggle.

## Author checklist

- Labels readable in both themes
- Error states visible on fields
- Buttons have enough contrast

Developers: Theme APIs for embedded apps: [FAQ: theme manipulation](docs:formengine-designer/faq/theme-manipulation).

## Summary

Use header theme toggle to sanity-check contrast. Production theming is configured in your app.

## See also

- [Style tab basics](/appearance-and-readability/style-tab-basics)
- [The Designer workspace](/meet-the-designer/the-designer-workspace)
