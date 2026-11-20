---
title: "Preview and Edit"
description: "Edit the layout, then Preview to fill fields, run Validate, and inspect Data. Going live is a separate step in your app."
sidebar_label: "Preview and Edit"
---

# Preview and Edit

**Edit** is where you change the layout. **Preview** is where you fill fields, run validation, and click buttons. You cannot drag
components in Preview. The **canvas** is the center of the screen. The **header** above it has **Preview**, undo, and the menu.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkV2ZW50IHJlZ2lzdHJhdGlvbiIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY29udGFjdFNlY3Rpb24iLCJ0eXBlIjoiTXVpQ2FyZCIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImNvbnRhY3RTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiY29udGFjdEhlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkNvbnRhY3QgZGV0YWlscyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJwaG9uZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlBob25lIn19fV19XX0seyJrZXkiOiJ0aWNrZXRTZWN0aW9uIiwidHlwZSI6Ik11aUNhcmQiLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJ0aWNrZXRTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoidGlja2V0SGVhZGluZyIsInR5cGUiOiJNdWlUeXBvZ3JhcGh5IiwicHJvcHMiOnsidmFyaWFudCI6eyJ2YWx1ZSI6Img2In0sImNoaWxkcmVuIjp7InZhbHVlIjoiVGlja2V0IG9wdGlvbnMiLCJlZGl0b3JUeXBlIjoic3RyaW5nIn19fSx7ImtleSI6InRpY2tldFR5cGUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJUaWNrZXQgdHlwZSJ9fX0seyJrZXkiOiJxdWFudGl0eSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlF1YW50aXR5In0sInR5cGUiOnsidmFsdWUiOiJudW1iZXIifX19XX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=event-registration&view=mui'); return false;">Open Event registration in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Canvas

<img src="/assets/guide/structure/containers-canvas-plain.png" alt="Event registration form on the center canvas." />

- Click components to select them.
- Drag from the **Components** tab to add new fields.
- Scroll for long forms, or use the **Tree** tab if selections are difficult.

## Header toolbar

<img src="/assets/guide/workspace/highlight-central-header.png" alt="Central header toolbar with numbered controls: menu, undo/redo, component library, preview, device icons, and language." />

| #   | Control                       | Purpose                                                                                                                               |
| --- | ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Menu (hamburger)              | **Add a new form**, **Download**, **Upload**, **Translation**, **Save**, **Save as...**, export/import, **Clear**, **Print**, version |
| 2   | Undo / Redo                   | Reverse recent layout edits                                                                                                           |
| 3   | **Component library**         | Switch UI kit (for example Material UI, RSuite UI). **Demo only.**                                                                    |
| 4   | **Preview**                   | Test the form. Becomes **Edit** in Preview mode                                                                                       |
| 5   | Device icons                  | Approximate phone/tablet/desktop width                                                                                                |
| 6   | Language (for example **EN**) | Switch localized form content in Edit and Preview                                                                                     |

The two language controls are separate. The header picker switches the form's localized labels and other content in **Edit** and
**Preview**. **Menu** → **Translation** changes the language of Designer's menus, panels, and other interface text.

## Edit vs Preview

| **Edit**                                               | **Preview**                                      |
| ------------------------------------------------------ | ------------------------------------------------ |
| Authoring panels stay open (library, tree, properties) | The form runs like an end-user screen            |
| You can drag components and use undo/redo              | Editing tools are reduced or hidden              |
| Selection outlines show what you are editing           | You focus on values, errors, and button behavior |

### Preview your layout

1. Click **Preview** in the header.
2. Interact with fields as a user would.
3. Open **Data** on the left to inspect values. Click **Validate** to run validation.
4. Click **Edit** to return to layout mode.

<img src="/assets/guide/workspace/highlight-preview.png" alt="Preview button in the top bar." />

Run **Preview** before you hand the form off. Going live is still a separate step in your app. See
[Save and share](/meet-the-designer/save-and-share).

## Print a draft

1. Open **Menu** → **Print**, or press <span class="fe-key-combo"><kbd>Ctrl</kbd>+<kbd>P</kbd></span> /
   <span class="fe-key-combo"><kbd>⌘</kbd>+<kbd>P</kbd></span>.
2. Glance at the browser print preview for clipped fields or bad page breaks.
3. Print or **Save as PDF**, then close the dialog to get back to Designer.

More detail: [Print your form](/preview-and-handoff/print-your-form).

## Check the result

- In **Preview**, side authoring panels give way to testing tools on the left (**Data** and **Validate**).
- In **Edit**, the component library returns.

## Summary

Use the canvas to lay out the form. Use **Preview** to try it. **Edit** brings the library back.

## See also

- [Save and share](/meet-the-designer/save-and-share)
- [Preview your first form](/your-first-form/preview-your-first-form)
- [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset)
- [Print your form](/preview-and-handoff/print-your-form)
