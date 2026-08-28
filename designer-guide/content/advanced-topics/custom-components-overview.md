---
title: "Custom components overview"
description: "Ask your developer when you need controls not in the palette: custom components are built in code, not in Designer."
---

# Custom components overview

The **Components** tab lists controls registered by your organization. If you need a control that is not available, such as a specialized
map or proprietary widget, developers can add a **custom component** in code.

## What you see

<img src="/assets/guide/workspace/components-tab-plain.png" alt="Components palette including custom components." />

- Custom entries appear in **Components** like built-in fields.
- You drag them to the canvas and set **Main** / **Style** / **Rules** properties the developer exposed.

## What to request

1. Purpose (what users enter or see)
2. Required properties (label, key, validation)
3. Sample screenshot or sketch
4. Whether data is stored in form **Data** like other fields

## What authors do not do

- Write TypeScript/React component code
- Register npm packages; developers handle this through [Custom components](docs:formengine-designer/features/custom-components)

## Summary

If a control is missing from the palette, ask developers to add it. Avoid workarounds unless your team approves them. After delivery,
configure the custom component like any other component.

## See also

- [When to involve developers](/advanced-topics/when-to-involve-developers)
- [Custom components (developers)](docs:formengine-designer/features/custom-components)
- [Installation](docs:formengine-designer/getting-started/installation)
