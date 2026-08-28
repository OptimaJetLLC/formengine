---
title: "Labels and help text"
description: "Set field labels, placeholders, and helper text on the Main tab so users understand what to enter."
---

# Labels and help text

Clear **labels** and **help text** reduce errors. Most text fields expose these settings on **Main** when the field is selected.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Example: work email field

### Step 1: Select the field

<img
  src="/assets/guide/fields-and-data/highlight-labels-select.png"
  alt="workEmail selected in Tree and the Business email field selected on the canvas."
/>

1. Click the field on the canvas, or select it in **Tree** (key `workEmail` in the finished example).

### Step 2: Edit on Main

<img src="/assets/guide/fields-and-data/highlight-labels-main.png" alt="Main tab with Label and Helper text set to Business email and Use your work address." />

1. Open **Main** on the right.
2. Update **Label** (or **Title**) to the text users should see (for example **Business email**).
3. Set **Placeholder** for gray hint text inside empty inputs (for example `name@company.com`).
4. Set **Helper text** or **Description** when the component offers it (for example **Use your work address.**).

### Step 3: Check in Preview

<img src="/assets/guide/fields-and-data/highlight-labels-preview.png" alt="Preview mode showing the updated Business email label and helper text." />

1. Click **Preview**.
2. Confirm the label and helper text read naturally and are not cut off on narrow widths.

## Multiple languages

If your project enables **localization**, labels may come from translation files. Depending on the configuration, authors may also be able
to edit localized strings in Designer. Ask your administrator how your team manages translations.

## Summary

Labels and hints live on **Main** for the selected field. Verify the wording in **Preview**, and coordinate with your team for non-English
locales.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJ3b3JrRW1haWwiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJCdXNpbmVzcyBlbWFpbCJ9LCJwbGFjZWhvbGRlciI6eyJ2YWx1ZSI6Im5hbWVAY29tcGFueS5jb20ifSwiaGVscGVyVGV4dCI6eyJ2YWx1ZSI6IlVzZSB5b3VyIHdvcmsgYWRkcmVzcy4ifX19XX0sImxhbmd1YWdlcyI6W3siY29kZSI6ImVuIiwiZGlhbGVjdCI6IlVTIiwibmFtZSI6IkVuZ2xpc2giLCJkZXNjcmlwdGlvbiI6IkFtZXJpY2FuIEVuZ2xpc2giLCJiaWRpIjoibHRyIn1dLCJkZWZhdWx0TGFuZ3VhZ2UiOiJlbi1VUyJ9&formName=labels-demo&view=mui'); return false;">Open Business email field in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [What is form data?](/fields-and-data/what-is-form-data)
- [Localization (developers)](docs:formengine-designer/features/localization)
