---
title: "Glossary"
description: "Plain-language definitions for Form Author Guide terms: canvas, palette, preview, keys, validation, and more."
---

# Glossary

Terms used across the [Form Author Guide](/). Link here when you introduce jargon on another page.

## Actions

Behaviors that run when something happens on the form, often when a user clicks a **Button**. Configure on the **Actions** tab.

**Related:** [Actions basics](/behavior-and-validation/actions-basics)

## Auto Validate

Setting on the **Rules** tab that validates a field as the user interacts with it.

**Related:** [Validation basics](/behavior-and-validation/validation-basics)

## Canvas

The main center area where you build the form in **Edit** mode.

**Related:** [The Designer workspace](/meet-the-designer/the-designer-workspace)

## Component

A building block you add from the **Components** tab, such as a text field, button, or container.

**Related:** [Add components from the palette](/meet-the-designer/add-components-from-the-palette)

## Component library

The UI kit for controls (for example Material UI or RSuite), chosen in the header **Component library** dropdown.

**Related:** [Common field types](/fields-and-data/common-field-types)

## Components tab

Left panel tab listing draggable controls you add to the form.

**Related:** [Left panel](/meet-the-designer/use-the-left-panel-tabs)

## Container

A layout component that groups other components (stack, box, grid).

**Related:** [Form structure and containers](/form-structure-and-layout/form-structure-and-containers)

## Data key

The name used for a field's value in form data. It can differ from the field's **Key**. Multiple components can use the same data key to
share a value. If **Data key** is empty, a field uses its **Key**.

**Related:** [What is form data?](/fields-and-data/what-is-form-data)

## Edit mode

Design mode: palette, properties, and drag-and-drop are available. Header shows **Preview** to switch away.

**Related:** [Preview and Edit](/meet-the-designer/preview-and-edit)

## Event

An occurrence, such as a click or value change, that can trigger **Actions**.

**Related:** [Events and actions concept](/behavior-and-validation/events-and-actions-concept)

## Form data

The collection of keys and values your form holds when users fill it in.

**Related:** [What is form data?](/fields-and-data/what-is-form-data)

## Key (field name)

A unique name that identifies a component in the form. For fields, it is also used in form data unless you set a separate **Data key**.

**Related:** [Name fields for data capture](/your-first-form/name-fields-for-data-capture)

## Preset

A reusable group of components saved from a canvas selection. On the floating toolbar, open the actions if needed,
then click the :toolbar-icon[preset]: **preset** (bookmark) button. Add the saved group from **Components**; you can
edit the copied components afterward.

**Related:** [Preset components](/manage-forms/preset-components)

## Preview

A mode that lets authors interact with the form from a user's perspective. The header button toggles **Preview** and **Edit**.

**Related:** [Preview your first form](/your-first-form/preview-your-first-form)

## Print

**Menu** → **Print** (or <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> /
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span>) opens the browser print dialog. Designer shows the form without the editing
tools first. Use **Page break** and **Print settings** for printed pages. **Print settings** is non-visual (bottom bar and Tree) and
allows only one instance. In **Header** and **Footer**, `{page}` is the current page and `{pages}` is the total.

**Related:** [Print your form](/preview-and-handoff/print-your-form), [Special components](/components-by-task/special-components)

## Properties panel

Right-hand panel with **Main**, **Style**, **Actions**, and **Rules** for the selected component.

**Related:** [Right panel](/meet-the-designer/use-the-right-properties-panel)

## Property

A setting for the selected component, edited on the right in **Main**, **Style**, **Actions**, or **Rules**.

**Related:** [Use the right properties panel](/meet-the-designer/use-the-right-properties-panel)

## Rules

Validation settings for the selected field, including **Add a validation rule**.

**Related:** [Add validation on your first form](/your-first-form/add-validation-on-your-first-form)

## Screen

The root level of your form design in **Tree**, usually keyed `screen1`.

**Related:** [Use the left panel tabs](/meet-the-designer/use-the-left-panel-tabs)

## Template

A saved form used inside another form. For example, **Modal template** selects the saved form displayed inside a modal.

**Related:** [Nested components (developers)](docs:formengine-designer/features/nested-components#templates)

## Tree

The left-panel tab that lists components in their hierarchy. Use **Expand all** to find nested fields.

**Related:** [Use the component tree](/meet-the-designer/use-the-component-tree)

## Validation

Checks whether user input meets your requirements before submission.

**Related:** [Validation basics](/behavior-and-validation/validation-basics)
