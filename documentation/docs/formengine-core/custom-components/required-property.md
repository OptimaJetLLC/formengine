---
sidebar_position: 25
title: Required Property
description: The required property in FormEngine Core is a special boolean property that indicates whether a form field is mandatory
---

# Required Property

The [required](/api-reference/@react-form-builder/core/variables/required) property in FormEngine Core is a special boolean property that
indicates whether a form field is mandatory. When a component has the `required` property set to `true`, it typically displays visual
indicators (like asterisks) and participates in form validation to ensure the field is not left empty.

## Understanding the Required Property

The [required](/api-reference/@react-form-builder/core/variables/required) property is different from standard boolean properties because
it's automatically managed by the validation system. When a component has a `required` validation rule enabled, the component automatically
receives `required: true` as a prop. This allows your custom components to adapt their appearance and behavior based on whether they're
mandatory fields.

## The Required Annotation

FormEngine Core provides a special `required` annotation that you can use when defining custom component properties:

```tsx
import {define, required} from '@react-form-builder/core'

const RequiredInput = ({required, ...props}: any) => {
  const label = required ? 'Required' : 'Optional'
  return <label>
    {label} <input required={required} aria-required={required} {...props} />
  </label>
}

export const requiredInput = define(RequiredInput, 'RequiredInput')
  .props({
    required: required,
  })
  .build()
```

The `required` annotation is a special annotation builder for boolean properties that tells FormEngine this property should be automatically
managed based on validation rules.

## Relationship Between Required Property and Validation

The `required` property gets its value from the component's validation configuration. When a component has the `required` validation rule
enabled, the component automatically receives `required: true` as a prop.

Here's how it works:

1. **Component Definition**: You define a component with a `required` property using the `required` annotation
2. **Form Configuration**: In your form JSON, you add a `required` validation rule to the component
3. **Runtime Behavior**: FormEngine automatically sets `required: true` on the component when it has the `required` validation rule
4. **Visual Feedback**: Your component can use the `required` prop to display visual indicators

### Example Form Configuration

```json
{
  "key": "requiredInput",
  "type": "RequiredInput",
  "schema": {
    "validations": [
      {
        "key": "required"
      }
    ]
  }
}
```

#### Live Example

```jsx live
function App() {
  const RequiredInput = ({required, ...props}) => {
    const label = required ? 'Required' : 'Optional'
    return <label>
      {label} <input required={required} aria-required={required} {...props} />
    </label>
  }

  const requiredInput = define(RequiredInput, 'RequiredInput')
    .props({
      required: required,
    })
    .build()

  const view = createView([requiredInput.model])

  const formJson = {
    "form": {
      "key": "Screen",
      "type": "Screen",
      "children": [
        {
          "key": "requiredInput",
          "type": "RequiredInput",
          "schema": {
            "validations": [
              {
                "key": "required"
              }
            ]
          }
        },
        {
          "key": "optionalInput",
          "type": "RequiredInput"
        }
      ]
    }
  }

  return (
    <FormViewer
      view={view}
      getForm={() => JSON.stringify(formJson)}
    />
  )
}
```

In this configuration, the `RequiredInput` component will automatically receive `required: true` as a prop because it has the `required`
validation rule.

## Automatic ClassName Addition

FormEngine Core automatically adds the `required` CSS class to components that have required validation. You can leverage this automatic
className addition in your custom components

## Best Practices

1. **Always Use the Required Annotation**: Use the `required` annotation instead of the regular `boolean` annotation for required properties
   to ensure proper integration with FormEngine's validation system.
2. **Provide Visual Feedback**: Always provide clear visual indicators when a field is required. Common patterns include:

   - Asterisk (*) next to the label
   - Different border colors for required fields
   - Optional text indicating the field is required

3. **Use Semantic HTML Attributes**: When implementing your component, use the appropriate HTML attributes:

   ```jsx
   <input required={required} aria-required={required} />

   ```
4. **Leverage Automatic ClassName**: Use the automatically added `required` className for styling instead of relying only on the prop value:
   ```css
   &.required {
     /* Your styles for required fields */
   }
   ```
5. **Test with Validation**: Always test your components with both enabled and disabled required validation to ensure they behave correctly.
6. **Consider Accessibility**: Ensure your required indicators are accessible to screen readers by using appropriate ARIA attributes and
   providing text alternatives.

## Troubleshooting

### Issue: Required Prop is Not Being Passed

**Solution**: Ensure that:

1. You're using the `required` annotation from `@react-form-builder/core`
2. The component has a `required` validation rule in the form JSON
3. You're accessing the prop correctly in your component implementation

### Issue: Required сlassName is Not Being Added

**Solution**: Check that:

1. Your component uses the `className` property correctly
2. You're not overriding the `className` property manually
3. The component has the `required` validation rule enabled

### Issue: Required Indicator Shows When Field Has Value

**Solution**: Remember that the `required` property indicates whether a field is mandatory, not whether it's currently empty. The validation
system handles checking if required fields are filled.

## Summary

The `required` property in FormEngine Core is a powerful feature that allows your custom components to:

1. **Integrate with validation**: Automatically receive `required: true` when configured with required validation
2. **Provide visual feedback**: Display indicators to users about mandatory fields
3. **Maintain consistency**: Work seamlessly with FormEngine's state management and validation systems

By using the `required` annotation and following the patterns described in this guide, you can create custom components that fully
participate in FormEngine's validation ecosystem while providing excellent user experience.
