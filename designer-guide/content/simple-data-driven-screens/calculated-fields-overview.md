---
title: "Calculated fields overview"
description: "Create fields that update from other answers, with a copyable Full name calculation."
---

# Calculated fields overview

A **calculated** field derives its value from other form data, such as a full name, line total, or tax amount. A default value is only a
starting value; it is not a calculation.

Use **Main** → **Value** → **Calculable value** when the result should update as answers change. Use an action instead when the
calculation should run only after a specific event, such as a button click.

## Common examples

<img src="/assets/guide/data-driven/highlight-value-edit-icon.png" alt="Full name field below First name and Last name, with an arrow pointing to the edit icon beside Value." />

- Full name from `firstName` and `lastName`
- Line total from quantity and unit price
- Tax amount from a subtotal and tax rate

## Full name example

The example uses two editable source fields and a separate read-only result field beneath them. The **Calculable value** editor opens in the
bottom panel:

<img src="/assets/guide/data-driven/highlight-computed-property-example.png" alt="Full name Value calculation open below a form with First name, Last name, and a read-only Full name field." />

To create a reproducible Full name calculation, add three Text fields with the keys `firstName`, `lastName`, and `fullName`. Then configure
the Full name field:

1. Place the Full name field below First name and Last name.
2. Select Full name, open **Main**, and enable **Read only**.
3. Click the **edit** icon beside **Value**.
4. Choose **Calculable value** in the bottom panel.
5. The editor supplies the `Calculation` function declaration and closing brace. Replace the editable code between them with this complete
   formula, then save it:

```javascript
const firstName = form.data.firstName ?? '';
const lastName = form.data.lastName ?? '';
return `${firstName} ${lastName}`.trim();
```

FormEngine calculates `fullName` when the form loads and recalculates it automatically whenever `firstName` or `lastName` changes. It does
not wait for a button click or form submission. Make the Full name field read-only if users should not overwrite the calculated result.

Use **Read only** rather than **Disabled** for this example so the result remains easy to read and copy while manual editing is blocked.

Calculable values use a computed-property editor with a code panel. Authors should not change production formulas without review.

Developers: See [Computed properties](docs:formengine-designer/features/computed-properties).

## Test the result

1. Open **Preview**.
2. Enter `Ada` in First name and `Lovelace` in Last name.
3. Confirm that Full name changes to `Ada Lovelace` and cannot be edited directly.
4. Change either source field and confirm that Full name updates immediately.

<img src="/assets/guide/data-driven/highlight-calculated-full-name-preview.png" alt="Preview showing First name Ada, Last name Lovelace, and read-only Full name Ada Lovelace." />

## Handoff tip

Document:

- Source fields (keys)
- Formula in everyday terms
- Whether it should update automatically or only after a specific event

## Summary

Calculated fields can reduce manual entry. Ask developers to review production formulas before changing them.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5IjoibmFtZVJvdyIsInR5cGUiOiJNdWlTdGFjayIsInByb3BzIjp7ImRpcmVjdGlvbiI6eyJ2YWx1ZSI6InJvdyJ9LCJzcGFjaW5nIjp7InZhbHVlIjoiMTZweCJ9fSwiY2hpbGRyZW4iOlt7ImtleSI6ImZpcnN0TmFtZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkZpcnN0IG5hbWUifX19LHsia2V5IjoibGFzdE5hbWUiLCJ0eXBlIjoiTXVpVGV4dEZpZWxkIiwicHJvcHMiOnsibGFiZWwiOnsidmFsdWUiOiJMYXN0IG5hbWUifX19XX0seyJrZXkiOiJmdWxsTmFtZSIsInR5cGUiOiJNdWlUZXh0RmllbGQiLCJwcm9wcyI6eyJsYWJlbCI6eyJ2YWx1ZSI6IkZ1bGwgbmFtZSJ9LCJ2YWx1ZSI6eyJjb21wdXRlVHlwZSI6ImZ1bmN0aW9uIiwiZm5Tb3VyY2UiOiJjb25zdCBmaXJzdE5hbWUgPSBmb3JtLmRhdGEuZmlyc3ROYW1lID8_ICcnO1xuY29uc3QgbGFzdE5hbWUgPSBmb3JtLmRhdGEubGFzdE5hbWUgPz8gJyc7XG5yZXR1cm4gYCR7Zmlyc3ROYW1lfSAke2xhc3ROYW1lfWAudHJpbSgpOyJ9LCJyZWFkT25seSI6eyJ2YWx1ZSI6dHJ1ZX0sImhlbHBlclRleHQiOnsidmFsdWUiOiJDYWxjdWxhdGVkIGF1dG9tYXRpY2FsbHkgZnJvbSBGaXJzdCBuYW1lIGFuZCBMYXN0IG5hbWUuIn19fV19fQ&formName=calculated-full-name&view=mui'); return false;">Open calculated Full name in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [When to involve developers](/advanced-topics/when-to-involve-developers)
- [Computed properties (developers)](docs:formengine-designer/features/computed-properties)
