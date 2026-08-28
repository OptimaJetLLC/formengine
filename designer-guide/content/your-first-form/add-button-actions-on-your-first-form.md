---
title: "Add button actions on your first form"
description: "Configure a Save button with an onClick code action so Preview shows an alert when users click."
---

# Add button actions on your first form

Buttons can run form actions when users click them. You configure actions on the **Actions** tab when a button is selected.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?form=empty&view=mui'); return false;">Open starting form in demo</a> - opens the FormEngine demo in a popup window with the form this article starts from.

:::

## Before you begin

- Start from an empty form (or clear the canvas).

## Add or select a button

<img src="/assets/guide/first-form/highlight-components-search-button.png" alt="Empty form with Components search set to Button and Button highlighted." />

1. Open **Components**.
2. Search for **Button**.
3. Drag **Button** onto the canvas.
4. Click the button to select it (set the label to **Save** if you want).

## Configure Actions

<img src="/assets/guide/first-form/highlight-button-onclick-code.png" alt="Save button Actions tab with onClick showAlert code action and alert in the editor." />

1. With the button selected, open **Actions**.
2. Under **onClick**, add a **Code** action (for example **showAlert**).
3. Open the code editor and put an alert in the action body, for example:

```javascript
alert('Button clicked');
```

4. Save the **Code** action.

You name a **Code** action when you create it in Designer. Its name and JavaScript body are stored with the form; it does not depend on
application registration. A simple `alert` is enough to prove the click path works.

An action supplied by the host application is a separate **Custom** action. Developers register **Custom** actions, and authors can attach
only the names that the application makes available under **Custom**.

## Test in Preview

<img src="/assets/guide/first-form/highlight-button-preview-alert.png" alt="Preview mode after clicking Save, with an alert dialog showing Button clicked." />

1. Click **Preview**.
2. Click the **Save** button.
3. Confirm the alert appears with your message.

## Check the result

- In **Edit**, **Actions** lists the **onClick** **Code** action.
- In **Preview**, clicking the button runs that code (here, an alert).

## Summary

Button behaviors live on **Actions** for the selected button. Start with a **Code** action and `alert` to verify the click path. Then add a
**Common** action such as `validate`, or use a **Custom** action registered by your application for submit or integration behavior.

:::tip Try it

<a href="#" onclick="openMinimalWindow('https://demo.formengine.io/?formBody=eyJhY3Rpb25zIjp7InNob3dBbGVydCI6eyJib2R5IjoiYWxlcnQoJ0J1dHRvbiBjbGlja2VkJyk7IiwicGFyYW1zIjp7fX19LCJlcnJvclR5cGUiOiJNdWlFcnJvcldyYXBwZXIiLCJmb3JtIjp7ImtleSI6InNjcmVlbjEiLCJ0eXBlIjoiU2NyZWVuIiwicHJvcHMiOnt9LCJjaGlsZHJlbiI6W3sia2V5Ijoic2F2ZSIsInR5cGUiOiJNdWlCdXR0b24iLCJwcm9wcyI6eyJ2YXJpYW50Ijp7InZhbHVlIjoiY29udGFpbmVkIn0sImNoaWxkcmVuIjp7InZhbHVlIjoiU2F2ZSJ9fSwiZXZlbnRzIjp7Im9uQ2xpY2siOlt7Im5hbWUiOiJzaG93QWxlcnQiLCJ0eXBlIjoiY29kZSJ9XX19XX19&formName=button-alert-action&view=mui'); return false;">Open form with Save button alert action in demo</a> - opens the FormEngine demo in a popup window with the completed form from this article.

:::

## See also

- [Actions basics](/behavior-and-validation/actions-basics)
- [Actions (developer depth)](docs:formengine-designer/features/actions)
