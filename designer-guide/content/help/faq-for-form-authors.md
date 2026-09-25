---
title: "FAQ for form authors"
description: "Answers to common questions about building forms in FormEngine Designer: preview, export, validation, and where to get help."
---

# FAQ for form authors

Quick answers for people who design forms in Designer. For developer setup,
see [FormEngine Designer getting started](docs:formengine-designer/getting-started/overview).

## How do I get the form JSON for my developer?

<img src="/assets/guide/manage-forms/highlight-header-menu-download.png" alt="Header menu open with Download highlighted." />

Use **Download** from the header menu to save the current form as `form.json`. Share the file securely.
See [Export and share your form](/preview-and-handoff/export-and-share-your-form)
and [Forms JSON (developers)](docs:formengine-designer/features/forms-json).

## How do I print or save a PDF?

<img src="/assets/guide/manage-forms/highlight-header-menu-print.png" alt="Header menu open with Print highlighted." />

Open **Menu** → **Print**, or press <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> /
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span>. Pick a printer or **Save as PDF** in the browser dialog.
See [Print your form](/preview-and-handoff/print-your-form).

## Why does Preview look different from Edit?

<img src="/assets/guide/help/faq-preview-mode-plain.png" alt="Preview mode with the Edit button and Data and Validate tools." />

**Preview** hides authoring panels and runs the form like the embedded viewer. You cannot drag new components in Preview.
See [Preview and Edit](/meet-the-designer/preview-and-edit).

## Why won't a field delete, and why don't shortcuts work?

Most shortcuts need focus on the page background, not inside a text box. Click the canvas margin first.
**Print** (<span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> /
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span>) still works inside a field.
See [Keyboard shortcuts](/help/keyboard-shortcuts).

## Validation does not run on the canvas

<img src="/assets/guide/first-form/canvas-plain.png" alt="Form canvas in the center." />

Validation messages usually appear in **Preview** or when **Auto Validate** is on. Test with **Preview** and the **Validate** tool.

## Components look broken after import

<img src="/assets/guide/help/highlight-component-library.png" alt="Red arrow pointing to the Component library dropdown in the header." />

The form may target a different **Component library**. Switch the header dropdown to match the library used when the form was exported.

## Where is the full developer documentation?

- [FormEngine Designer features](docs:formengine-designer/features)
- [API and integration](docs:formengine-core/) (outside this guide)

## I need hands-on practice

Open the live demo at [https://demo.formengine.io/](https://demo.formengine.io/) and
follow [Your first form](/your-first-form/create-your-first-form).

## Where is the full guide index?

See [Form Author Guide](/), [Common problems](/help/common-problems-and-fixes), and [Get more help](/help/get-more-help).
