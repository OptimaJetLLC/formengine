---
title: "Show or hide fields"
description: "Conditionally show fields when users answer a question: overview with link to conditional rendering for developers."
---

# Show or hide fields

You can hide fields until they are relevant (for example, show "Company name" only when "Business account" is checked). In Designer,
this is **conditional visibility**, often a **Render When** property on **Main**.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Plain-language example

<img src="/assets/guide/data-driven/highlight-show-hide-canvas.png" alt="Account type and Tax ID fields on the canvas." />

- If **Account type** = Personal → hide **Tax ID**
- If **Account type** = Business → show **Tax ID**

## In Designer

<img src="/assets/guide/data-driven/highlight-render-when-editor.png" alt="Render When editor open for the Tax ID field with a Business account condition." />

1. Select the field to show or hide (for example **Tax ID**).
2. On **Main**, find **Render When** and click the **edit** icon.
3. Choose **Calculable value** in the bottom panel and enter the condition your team documents.

Developers: Full conditional rendering is documented in [Conditional rendering](docs:formengine-designer/features/conditional-rendering).

## Test in Preview

<img src="/assets/guide/data-driven/highlight-show-hide-preview.png" alt="Preview mode with Business selected and Tax ID field visible." />

1. Change the controlling field value (for example select **Business** under **Account type**).
2. Confirm the dependent field appears or disappears.
3. Run **Validate** and confirm that hidden required fields do not block submission.

## Summary

Conditional visibility can keep forms shorter. Start with **Render When** on **Main**. Escalate complex rules to developers.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJ2ZXJzaW9uIjoiMSIsImVycm9yVHlwZSI6Ik11aUVycm9yV3JhcHBlciIsImZvcm0iOnsia2V5Ijoic2NyZWVuMSIsInR5cGUiOiJTY3JlZW4iLCJwcm9wcyI6e30sImNoaWxkcmVuIjpbeyJrZXkiOiJhY2NvdW50VHlwZSIsInR5cGUiOiJNdWlSYWRpb0dyb3VwIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJBY2NvdW50IHR5cGUifSwibmFtZSI6eyJ2YWx1ZSI6ImFjY291bnRUeXBlIn19LCJjaGlsZHJlbiI6W3sia2V5IjoicGVyc29uYWwiLCJ0eXBlIjoiTXVpUmFkaW9JdGVtIiwicHJvcHMiOnsidmFsdWUiOnsidmFsdWUiOiJQZXJzb25hbCJ9LCJsYWJlbCI6eyJ2YWx1ZSI6IlBlcnNvbmFsIn19fSx7ImtleSI6ImJ1c2luZXNzIiwidHlwZSI6Ik11aVJhZGlvSXRlbSIsInByb3BzIjp7InZhbHVlIjp7InZhbHVlIjoiQnVzaW5lc3MifSwibGFiZWwiOnsidmFsdWUiOiJCdXNpbmVzcyJ9fX1dfSx7ImtleSI6InRheElkIiwidHlwZSI6Ik11aVRleHRGaWVsZCIsInByb3BzIjp7ImxhYmVsIjp7InZhbHVlIjoiVGF4IElEIn19LCJyZW5kZXJXaGVuIjp7ImNvbXB1dGVUeXBlIjoiZnVuY3Rpb24iLCJmblNvdXJjZSI6InJldHVybiBmb3JtLmRhdGEuYWNjb3VudFR5cGUgPT09ICdCdXNpbmVzcycifX1dfSwibGFuZ3VhZ2VzIjpbeyJjb2RlIjoiZW4iLCJkaWFsZWN0IjoiVVMiLCJuYW1lIjoiRW5nbGlzaCIsImRlc2NyaXB0aW9uIjoiQW1lcmljYW4gRW5nbGlzaCIsImJpZGkiOiJsdHIifV0sImRlZmF1bHRMYW5ndWFnZSI6ImVuLVVTIn0&formName=show-hide-fields&view=mui'); return false;">Open finished form in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Conditional rendering (developers)](docs:formengine-designer/features/conditional-rendering)
- [Calculated fields overview](/simple-data-driven-screens/calculated-fields-overview)
