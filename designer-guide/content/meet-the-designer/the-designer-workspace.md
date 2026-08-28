---
title: "The Designer workspace"
description: "Tour FormEngine Designer: top bar, left panel, canvas, and properties on a real form, with screenshots and a live demo."
sidebar_label: "The Designer workspace"
---

# The Designer workspace

The Designer screen has four parts: a **top bar**, a **left panel**, a **canvas** in the center, and a **properties** panel on the right.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJmb3JtVGl0bGUiLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNSJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkV2ZW50IHJlZ2lzdHJhdGlvbiIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiY29udGFjdFNlY3Rpb24iLCJ0eXBlIjoiTXVpQ2FyZCIsInByb3BzIjp7fSwiY2hpbGRyZW4iOlt7ImtleSI6ImNvbnRhY3RTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoiY29udGFjdEhlYWRpbmciLCJ0eXBlIjoiTXVpVHlwb2dyYXBoeSIsInByb3BzIjp7InZhcmlhbnQiOnsidmFsdWUiOiJoNiJ9LCJjaGlsZHJlbiI6eyJ2YWx1ZSI6IkNvbnRhY3QgZGV0YWlscyIsImVkaXRvclR5cGUiOiJzdHJpbmcifX19LHsia2V5IjoiZnVsbE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJGdWxsIG5hbWUifX19LHsia2V5IjoiZW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJFbWFpbCJ9fX0seyJrZXkiOiJwaG9uZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlBob25lIn19fV19XX0seyJrZXkiOiJ0aWNrZXRTZWN0aW9uIiwidHlwZSI6Ik11aUNhcmQiLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJ0aWNrZXRTdGFjayIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7InNwYWNpbmciOnsidmFsdWUiOiIxMnB4In19LCJjaGlsZHJlbiI6W3sia2V5IjoidGlja2V0SGVhZGluZyIsInR5cGUiOiJNdWlUeXBvZ3JhcGh5IiwicHJvcHMiOnsidmFyaWFudCI6eyJ2YWx1ZSI6Img2In0sImNoaWxkcmVuIjp7InZhbHVlIjoiVGlja2V0IG9wdGlvbnMiLCJlZGl0b3JUeXBlIjoic3RyaW5nIn19fSx7ImtleSI6InRpY2tldFR5cGUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJUaWNrZXQgdHlwZSJ9fX0seyJrZXkiOiJxdWFudGl0eSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IlF1YW50aXR5In0sInR5cGUiOnsidmFsdWUiOiJudW1iZXIifX19XX1dfV19LCJsYW5ndWFnZXMiOlt7ImNvZGUiOiJlbiIsImRpYWxlY3QiOiJVUyIsIm5hbWUiOiJFbmdsaXNoIiwiZGVzY3JpcHRpb24iOiJBbWVyaWNhbiBFbmdsaXNoIiwiYmlkaSI6Imx0ciJ9XSwiZGVmYXVsdExhbmd1YWdlIjoiZW4tVVMifQ&formName=event-registration&view=mui'); return false;">Open Event registration in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## The four regions

<img src="/assets/guide/workspace/overview-zones.png" alt="Numbered zones: 1 Top bar, 2 Left panel, 3 Canvas, 4 Properties." />

1. **Top bar** - menu, undo/redo, **Component library picker** (available in the public demo), **Preview**, device sizes, language.
2. **Left panel** - **Components** (the library), **Tree**, **Settings**, **Forms**.
3. **Canvas** - the form layout you are building.
4. **Properties** - **Main**, **Style**, **Actions**, **Rules** for the selected component.

## Name the regions on a real form

1. Open the Event registration demo above.
2. Find the four regions: top bar, left panel, canvas, properties.
3. Click **Preview**, fill a field, then click **Edit** to return.

You edit on the canvas. You test in **Preview**.

## Screen, form, and page

| Term       | In Designer                                                                          |
| ---------- | ------------------------------------------------------------------------------------ |
| **Screen** | The Tree root (usually keyed `screen1`). Everything you add sits inside it.          |
| **Form**   | The named design you save, download, or export.                                      |
| **Page**   | Where your application shows the form to users. Authors do not build that page here. |

The **Forms** tab lists saved designs when storage is enabled. See [Left panel tabs](/meet-the-designer/use-the-left-panel-tabs).

## How you move between regions

- Add from the **left**. Arrange on the **canvas**. Change settings on the **right**.
- Click **Preview** in the **top bar** to try the form.
- Whole-form options are on the left **Settings** tab, not the right panel.

## Next

| Next page                                                            | What you do                                     |
| -------------------------------------------------------------------- | ----------------------------------------------- |
| [Add components](/meet-the-designer/add-components-from-the-palette) | Search the palette, drag or double-click        |
| [Select and edit](/meet-the-designer/select-and-edit-components)     | Select on canvas or Tree and edit on the right  |
| [Preview and Edit](/meet-the-designer/preview-and-edit)              | Test like a user, then return to layout         |
| [Save and share](/meet-the-designer/save-and-share)                  | Save, download, export; publish is the host app |

After that, [create your first form](/your-first-form/create-your-first-form). More samples:
[Examples and use cases](/meet-the-designer/examples-and-use-cases).

## Summary

Find the four regions on Event registration. Then add a component and open **Preview**.

## See also

- [What is FormEngine Designer?](/meet-the-designer/what-is-formengine-designer)
- [Add components from the palette](/meet-the-designer/add-components-from-the-palette)
- [Create your first form](/your-first-form/create-your-first-form)
