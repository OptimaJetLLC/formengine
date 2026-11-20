---
title: "Choice fields"
description: "Choose components for single, multiple, and yes/no answers, and configure their options."
---

# Choice fields

**Choice** inputs let users pick from options you define or load from data.

## Pick a component

<img src="/assets/guide/workspace/components-search-plain.png" alt="Components palette filtered for choice fields." />

| Need                              | Typical component               |
| --------------------------------- | ------------------------------- |
| One choice from many              | **Select** / dropdown           |
| One choice from a few             | **Radio group**                 |
| Several visible choices           | **Checkbox group**              |
| Several choices in a compact list | **MultiSelect** / **TagPicker** |
| Yes/no                            | **Checkbox** / **Switch**       |

The available components depend on how your Designer is set up. Mantine provides **MultiSelect** and **Checkbox group**, while React
Suite provides **TagPicker**. The current Material UI set does not include a ready-made field for selecting several options.

## Add static options

<img src="/assets/guide/workspace/main-tab-plain.png" alt="Main tab where static options are configured." />

1. Drag a component for a list of options from **Components**, such as **Select**, **Radio group**, **MultiSelect**, **Checkbox group**,
   or **TagPicker**.
2. Select it → **Main**.
3. Add options (label and value columns depend on component).
4. **Preview** and try selecting one or several options, as applicable.

## Dynamic options

When options come from an API, see [Load options from external data](/simple-data-driven-screens/load-options-from-external-data).

## Summary

Match the component type to the number of choices. Configure static options on **Main**; dynamic lists need developer wiring.

## See also

- [Common field types](/fields-and-data/common-field-types)
- [Components library](docs:components-library)
