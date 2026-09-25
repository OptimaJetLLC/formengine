---
title: "Localization for form authors"
description: "Work with multiple languages: form content language in the header and language settings on the Settings tab."
---

# Localization for form authors

If your organization ships forms in more than one language, you can enter translated labels directly in Designer. This example creates a
text field with an English label, adds a German translation, and checks both languages on the canvas and in **Preview**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Create a form in English and German

### Step 1: Add a field

1. Add a **Text field** to the form.
2. Set its **Key** to `companyName`.
3. Keep the field selected and open **Main**.

### Step 2: Enter the English label

<img src="/assets/guide/appearance/highlight-localization-editor.png" alt="Localization editor open for a field Label property with language entries." />

1. Click the **edit** icon beside **Label**.
2. Select **Localization** in the bottom panel.
3. Select **EN** in the language dropdown below the editor.
4. Leave the generated `companyName_label` identifier unchanged and enter the English text after `=`:

   ```text
   companyName_label = Company name
   ```

5. Click **Save**. Localization values are saved separately for each language.

### Step 3: Add the German label

1. In the same bottom panel, select **DE** in the language dropdown.
2. Replace the label text after `=`:

   ```text
   companyName_label = Firmenname
   ```

3. Click **Save** before switching languages or closing the editor.

German is now part of the form because it has at least one saved localized value. Repeat these steps for every user-facing property that
needs translation, such as **Placeholder**, **Helper text**, and validation **Message**.

### Step 4: Choose the fallback language

<img src="/assets/guide/appearance/highlight-language-settings.png" alt="Settings tab with the Language settings block highlighted." />

1. Open **Settings** → **Language settings**.
2. Set **Default Language** to **English**.

The default language is the fallback when a translation is missing. If German is not listed here, return to the localized property and
save its **DE** value first.

### Step 5: Check both languages

<img src="/assets/guide/appearance/highlight-header-language.png" alt="Header language picker with arrow pointing to the EN language selector." />

1. Close the bottom editor.
2. Select **EN** in the language dropdown in the header. The field label must be **Company name**.
3. Select **DE** in the same dropdown. The field label must change to **Firmenname**.
4. Click **Preview** and repeat the **EN** and **DE** checks.

| Header language | Expected field label |
| --------------- | -------------------- |
| **EN**          | Company name         |
| **DE**          | Firmenname           |

The header dropdown changes the language of the **form content**. It does not change the language of Designer controls.

## Author workflow

1. Add and save a value for every required language on each localizable property.
2. Set the fallback language under **Settings** → **Language settings**.
3. Switch every language on the canvas and in **Preview**; verify labels, hints, options, and validation messages.
4. Export or save the form when your process requires a handoff to translators or developers.

Developers: Full localization setup is in [Localization](docs:formengine-designer/features/localization). Designer interface language is
in [Designer localization](docs:formengine-designer/features/designer-localization).

## Summary

Use the property editor to save an English and German value separately, set English as the fallback, and verify both languages with the
header language picker on the canvas and in **Preview**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJjb21wYW55TmFtZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJjb21wdXRlVHlwZSI6ImxvY2FsaXphdGlvbiJ9fX1dfSwibG9jYWxpemF0aW9uIjp7ImVuLVVTIjp7ImNvbXBhbnlOYW1lIjp7ImNvbXBvbmVudCI6eyJsYWJlbCI6IkNvbXBhbnkgbmFtZSJ9fX0sImRlLURFIjp7ImNvbXBhbnlOYW1lIjp7ImNvbXBvbmVudCI6eyJsYWJlbCI6IkZpcm1lbm5hbWUifX19fSwibGFuZ3VhZ2VzIjpbeyJjb2RlIjoiZW4iLCJkaWFsZWN0IjoiVVMiLCJuYW1lIjoiRW5nbGlzaCIsImRlc2NyaXB0aW9uIjoiQW1lcmljYW4gRW5nbGlzaCIsImJpZGkiOiJsdHIifSx7ImNvZGUiOiJkZSIsImRpYWxlY3QiOiJERSIsIm5hbWUiOiJEZXV0c2NoIiwiZGVzY3JpcHRpb24iOiJHZXJtYW4iLCJiaWRpIjoibHRyIn1dLCJkZWZhdWx0TGFuZ3VhZ2UiOiJlbi1VUyJ9&formName=localization-authors&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Labels and help text](/fields-and-data/labels-and-help-text)
- [Localization (developers)](docs:formengine-designer/features/localization)
