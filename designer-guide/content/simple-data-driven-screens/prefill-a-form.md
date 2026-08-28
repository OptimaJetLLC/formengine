---
title: "Prefill a form"
description: "Show starting values from defaults in Designer or from app data at runtime: verify keys match what developers send."
---

# Prefill a form

**Prefill** means the form opens with values already filled in, either from defaults you set or from runtime data such as a user record.
Fields without starting values are not prefilled.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Static defaults

<img src="/assets/guide/data-driven/highlight-prefill-static-value.png" alt="Main tab Value field filled with a static default email." />

1. Select the field.
2. On **Main**, set **Default value** or **Value** (for example `alex@example.com`).
3. **Preview** and confirm the field shows that value.

## Runtime prefill (with developers)

1. Agree on field **Keys** (for example `email`, `accountId`).
2. Developers pass an initial data object when embedding the viewer.
3. Test with sample JSON from your team. Use **Data** in
   [Preview mode tools](/preview-and-handoff/use-preview-mode-tools-data-validate-reset) to compare keys.

## Summary

Configure Designer defaults on the **Main** tab. Live prefill requires matching keys and developer integration. Check the **Data** panel in
**Preview**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJlbWFpbCIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkVtYWlsIn0sInZhbHVlIjp7InZhbHVlIjoiYWxleEBleGFtcGxlLmNvbSJ9fX1dfSwibGFuZ3VhZ2VzIjpbeyJjb2RlIjoiZW4iLCJkaWFsZWN0IjoiVVMiLCJuYW1lIjoiRW5nbGlzaCIsImRlc2NyaXB0aW9uIjoiQW1lcmljYW4gRW5nbGlzaCIsImJpZGkiOiJsdHIifV0sImRlZmF1bHRMYW5ndWFnZSI6ImVuLVVTIn0&formName=prefill-static&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [What is form data?](/fields-and-data/what-is-form-data)
- [Load options from external data](/simple-data-driven-screens/load-options-from-external-data)
