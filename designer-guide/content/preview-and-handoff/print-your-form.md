---
title: "Print your form"
description: "Print or save a PDF from Designer. Use Page break and Print settings for headers, footers, and page numbers."
---

# Print your form

**Print** opens the browser print dialog. Designer hides the editing tools first and shows the form the way users see it, so the printout
tracks Preview more closely than Edit.

## Print from the menu

<img src="/assets/guide/manage-forms/highlight-header-menu-print.png" alt="Header menu open with Print highlighted and Ctrl+P shortcut shown." />

1. Open the header **Menu** (hamburger).
2. Click **Print**. The row shows <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> or
   <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span>.
3. In the browser dialog, pick a printer or **Save as PDF**.
4. Close the dialog when you finish. Designer returns to Edit or Preview, whichever you were in.

## Print with the keyboard

Press <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> (Windows/Linux) or
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span> (macOS). This shortcut still works with the cursor in a field; **Save** does
not.

## Page break and Print settings

In **Components**, under **Structure**:

| Component          | What it does                                                           |
| ------------------ | ---------------------------------------------------------------------- |
| **Page break**     | Starts a new printed page at that place on the canvas                  |
| **Print settings** | Sets the printed header and footer (one per form; lives off the canvas) |

<img
  src="/assets/guide/preview-and-handoff/print-page-break-and-settings.png"
  alt="Form with a Page break on the canvas and Print settings selected in the non-visual bar."
/>

1. Add **Page break** where a new paper page should start. In **Edit** it shows as a placeholder on the canvas.
2. Add **Print settings** once. It shows in the **non-visual bar** under the canvas and in the **Non-visual** Tree group, not as a canvas
   block.
3. Select **Print settings** (bar chip or Tree). On **Main**, set **Header**, **Footer**, and alignment.
4. In **Header** or **Footer**, type the text you want on every printed page. Use these placeholders for page numbers:

   | Placeholder | Meaning              |
   | ----------- | -------------------- |
   | `{page}`    | Current page number  |
   | `{pages}`   | Total number of pages |

   Example: `Page {page} of {pages}` prints as "Page 1 of 3" on the first sheet.

:::tip
**Print settings** allows only one instance. If the palette item is disabled, one is already on the form. See
[Special components](/components-by-task/special-components).
:::

Then use **Menu** → **Print** and check the browser preview.

Property details: [Page break](docs:components-library/structure-components/page-break) and
[Print settings](docs:components-library/structure-components/print-settings).

## Print vs Download

| Action       | Result                                        |
| ------------ | --------------------------------------------- |
| **Print**    | Paper or PDF through the browser print dialog |
| **Download** | A `.json` form file for developers or backup  |

## Summary

**Menu** → **Print** (or <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> /
<span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span>) sends the form to the browser print dialog. Use **Page break** on the canvas
and **Print settings** in the non-visual bar when you need control over printed pages.

## See also

- [Special components](/components-by-task/special-components)
- [Save, export, and import forms](/manage-forms/save-export-and-import-forms)
- [Testing checklist before handoff](/preview-and-handoff/testing-checklist-before-handoff)
- [Keyboard shortcuts](/help/keyboard-shortcuts)
- [Page break (developers)](docs:components-library/structure-components/page-break)
- [Print settings (developers)](docs:components-library/structure-components/print-settings)
