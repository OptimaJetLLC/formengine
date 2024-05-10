---
sidebar_position: 4
title: Storing user-defined data
slug: /storing-user-defined-data
---

# Storing user-defined data

Each component that implements [IFormData](/api-reference/interfaces/react_form_builder_core.IFormData) can maintain a user-defined data
object of any shape. This functionality is not confined to forms; it can be applied to any component. When you exceed the capabilities of
the FormEngine's core features, you can extend the behavior with this custom storage.

By placing it at the form level, it becomes accessible to all dependent components and is updated in the same way the FormEngine updates.

The example below illustrates how to fetch data and store it at the form level:

```tsx
async function Action(e, args) {
  fetch('https://gist.githubusercontent.com/rogargon/5534902/raw/434445021e155240ca78e378f10f70391dd594ea/countries.json')
    .then(data => data.json())
    .then(data => {
      const preparedData = data.map(value => ({value, label: value}))

      e.store.formData.state.items = preparedData
    })
}
```

As a result, any component downstream in the hierarchy can utilize this data for tasks such as populating fields or executing calculations.

```tsx
function Calculation(form) {
  return form.state.items
}
```
