---
sidebar_position: 300
sidebar_class_name: formengine-core-advanced
title: HTML attributes
description: Add custom HTML attributes to components for testing, accessibility, and integration.
slug: /formengine-core/html-attributes
---

# HTML attributes

HTML attributes let you add extra metadata and behavior to the underlying HTML elements of your form components. In FormEngine Core, you can
attach arbitrary HTML attributes through the [htmlAttributes](/api-reference/@react-form-builder/core/classes/ComponentStore#htmlattributes)
field on a component.

In this guide, you'll learn:

- How the `htmlAttributes` field works and which components support it
- Practical examples for testing, accessibility, and custom integration
- Best practices for using HTML attributes in your forms

## Overview

The [htmlAttributes](/api-reference/@react-form-builder/core/classes/ComponentStore#htmlattributes) field is an optional property on a
component that accepts an array of attribute objects. Each object is a key-value pair that FormEngine Core passes directly to the component
properties. HTML attributes are usually specified in the root HTML element of the component. But this may vary depending on the component.

HTML attributes are useful for:

- **Testing:** Add `data‑testid` or `data‑cy` selectors for automated tests.
- **Accessibility:** Provide `aria‑*` attributes for screen readers and assistive technologies.
- **Integration:** Attach custom attributes for third‑party scripts or CSS hooks.

:::info Important

HTML attributes work only for components that support them. A component supports HTML attributes when its React implementation spreads the
received props onto the underlying HTML element. Most built‑in input, button, and container components support HTML attributes; custom
components must explicitly spread props to enable this feature.

:::

## How HTML attributes work

The `htmlAttributes` field lives alongside `props`, `children`, and other component settings. Its value is an array of objects where each
object is a flat name‑value map.

```json title='ComponentWithAttributes.json'
{
  "key": "emailField",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email address"
    }
  },
  "htmlAttributes": [
    {
      "name": "data-testid",
      "value": "email-input"
    },
    {
      "name": "aria-label",
      "value": "Primary email"
    },
    {
      "name": "title",
      "value": "Enter your email address"
    }
  ]
}
```

## Which components support HTML attributes

A component supports HTML attributes if its implementation in React passes HTML attributes to the base element, for example via the spread
operator:

```tsx title='ButtonThatSupportsHtmlAttributes.tsx'
const MyButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return <button {...props} />;
};
```

Most components in the official view packages (Material‑UI, React Suite, etc.) support HTML attributes for their interactive elements.
To verify, check the component's source code or test by adding a `data‑testid` and inspecting the rendered HTML.

## Examples

### Adding test IDs for automation

Use `data‑testid` or `data‑cy` to give your testing framework stable selectors.

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'username',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Username'
            }
          },
          htmlAttributes: [
            {name: 'data-testid', value: 'username-field'},
            {name: 'aria-describedby', value: 'username-help'}
          ]
        },
        {
          key: 'submit',
          type: 'MuiButton',
          props: {
            children: {
              value: 'Submit'
            }
          },
          htmlAttributes: [
            {name: 'data-testid', value: 'submit-button'},
            {name: 'aria-label', value: 'Submit the form'}
          ]
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

### Improving accessibility with ARIA attributes

Add `aria‑*` attributes to make your forms more accessible to screen readers and keyboard navigation.

```json title='AccessibleTextField.json'
{
  "key": "search",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Search"
    },
    "helperText": {
      "value": "Type your query here"
    }
  },
  "htmlAttributes": [
    {
      "name": "aria-label",
      "value": "Submit the form"
    },
    {
      "name": "aria-required",
      "value": "true"
    },
    {
      "name": "role",
      "value": "searchbox"
    }
  ]
}
```

### Attaching custom attributes for integration

You can add any valid (or custom) HTML attribute. This is helpful for integrating with third‑party scripts that rely on specific attribute
patterns.

```json title='CustomIntegration.json'
{
  "key": "trackedButton",
  "type": "MuiButton",
  "props": {
    "children": {
      "value": "Track me"
    }
  },
  "htmlAttributes": [
    {
      "name": "data-analytics-event",
      "value": "click_main_cta"
    },
    {
      "name": "data-track-category",
      "value": "engagement"
    },
    {
      "name": "custom-action",
      "value": "special-handler"
    }
  ]
}
```

### Multiple attribute objects

When you provide several objects in the `htmlAttributes` array, they are merged left‑to‑right. Duplicate keys in later objects override
earlier ones.

```json {10-13,18-21} title='MergingExample.json'
{
  "key": "input",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Override example"
    }
  },
  "htmlAttributes": [
    {
      "name": "data-testid",
      "value": "first"
    },
    {
      "name": "title",
      "value": "Original title"
    },
    {
      "name": "data-testid",
      "value": "second"
    },
    {
      "name": "aria-label",
      "value": "New label"
    }
  ]
}
```

The resulting element will have `data‑testid="second"`, `title="Original title"`, and `aria‑label="New label"`.

## Best practices

- **Use semantic attributes first:** Prefer native HTML attributes (`disabled`, `readonly`, `required`) over custom `data‑*` attributes when
  they already convey the same meaning.
- **Keep keys lowercase:** HTML attribute names are case‑insensitive, but using lowercase ensures consistent behavior across browsers.
- **Test with your component set:** Verify that the component you are using actually spreads its props. If unsure, inspect the rendered HTML
  in the browser's developer tools.
- **Avoid overrides of critical props:** Do not override props that are essential for the component's functionality (e.g., `type` on an
  `<input>`). Use the component's own `props` for those settings.

## Troubleshooting

- **Attributes don't appear on the element:** The component likely does not spread its props. Check the component's source code or switch to
  a different component that is known to support HTML attributes.
- **Attributes appear but break functionality:** You may be overriding a prop that the component needs internally. Remove the conflicting
  attribute from `htmlAttributes` and set it through the component's own `props` instead.
- **Duplicate keys produce unexpected results:** Remember that later objects in the array override earlier ones. Simplify by using a single
  object if merging is not required.

## Summary

- The `htmlAttributes` field lets you attach arbitrary HTML attributes to a component's root element.
- It works only for components that spread their props onto the underlying HTML element.
- Use it for testing selectors (`data‑testid`), accessibility (`aria‑*`), and third‑party integration.
- Provide an array of objects; FormEngine Core merges them left‑to‑right.
- Always verify that your chosen component supports HTML attributes by inspecting the rendered output.

---

For more information:

- [Form JSON structure](/formengine-core/forms-json)
- [Creating custom components](/formengine-core/custom-components)
- [ComponentStore reference](/api-reference/@react-form-builder/core/classes/ComponentStore#htmlattributes)
- [HtmlAttribute type reference](/api-reference/@react-form-builder/core/type-aliases/HtmlAttribute)
