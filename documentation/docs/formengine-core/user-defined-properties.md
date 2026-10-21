---
description: 'Learn how to define custom properties in FormEngine Core.
  Guide with syntax, examples, and best practices for building dynamic, flexible forms.'
sidebar_class_name: formengine-core-advanced
sidebar_label: User defined properties
sidebar_position: 310
slug: /formengine-core/user-defined-properties
title: Extend Forms with User‑Defined Properties
---

# Extend Forms with User‑Defined Properties

User-defined properties let you override component properties at runtime, bypassing the static and computed values that FormEngine Core
normally calculates. You can change properties through actions or directly in React code using [userDefinedProps][user-defined-props]
and [setUserDefinedProps][user-defined-props].

In this guide, you'll learn:

- What user-defined properties are and when they're useful
- How to use `setUserDefinedProps` in actions to change component behavior
- How to read and modify `userDefinedProps` in React components
- Best practices and precautions for this advanced feature

## Overview

User-defined properties are a runtime override mechanism. When you set a property via [setUserDefinedProps][user-defined-props], it takes
precedence over:

- Static property values from the form JSON
- Computed or localized properties
- Default values defined in the component's metadata

This is an **advanced feature** that can solve specific integration challenges, but it should be used sparingly. Overusing user-defined
properties can make your form logic harder to understand and maintain.

## How user-defined properties work

Every component in FormEngine Core has a [userDefinedProps][cd-udp] field (type `Record<string, any>`) in its [ComponentData][cd]. When this
field contains values, they're merged with (and override) the component's regular properties before rendering.

You can modify `userDefinedProps` in two ways:

1. **From actions**: Use `e.setUserDefinedProps(props)` inside an action handler, where `e` is an [ActionEventArgs][ae] instance.
2. **From React components**: Access `componentData.userDefinedProps` directly via the [useComponentData][ucd] hook.

### The override hierarchy

Properties are resolved in this order (later overrides earlier):

1. **Default values** from the component's `define()` metadata
2. **Static values** from the form JSON (`props.value`)
3. **Computed values** (`props.computeType: "function"`)
4. **Localized values** (`props.computeType: "localization"`)
5. **User-defined properties** (`userDefinedProps`)

If a property exists in `userDefinedProps`, that value wins, even if it contradicts validation rules, computed logic, or form data binding.

## Using setUserDefinedProps in actions

The most common use case is modifying component properties from an action handler. Actions can run in response to events like `onClick`,
`onDidMount`, or `onChange`.

### Example: Conditional styling based on validation

Change a button's color based on form validity:

```json {18-21} title='SubmitButtonWithFeedback.json'
{
  "key": "submitBtn",
  "type": "MuiButton",
  "props": {
    "children": {
      "value": "Submit"
    },
    "variant": {
      "value": "contained"
    }
  },
  "events": {
    "onClick": [
      {
        "name": "validate",
        "type": "common"
      },
      {
        "name": "updateButtonStyle",
        "type": "code"
      }
    ]
  }
}
```

Action implementation:

```javascript
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function updateButtonStyle(e, args) {
  const hasErrors = e.store.form.componentTree.hasErrors
  const newColor = hasErrors ? 'error' : 'success'
  e.setUserDefinedProps({color: newColor})
}
```

## Using userDefinedProps in React components

Sometimes you need to modify properties directly from a React component, especially when building custom form components.

### Accessing the current component's properties

Use the [useComponentData][ucd] hook to get the component's data context:

```tsx title='CustomToggle.tsx'
import {useComponentData} from '@react-form-builder/core'
import {useCallback} from 'react'

const CustomToggle = ({toggled}: any) => {
  const componentData = useComponentData()

  const handleToggle = useCallback(() => {
    const currentState = toggled ?? false

    // Update user-defined properties
    componentData.userDefinedProps = {
      ...componentData.userDefinedProps,
      toggled: !currentState
    }
  }, [componentData, toggled])

  return (
    <button onClick={handleToggle}>
      {toggled ? 'ON' : 'OFF'}
    </button>
  )
}
```

### Modifying another component's properties

You can also modify properties of a different component by finding it in the component tree:

```tsx title='PasswordVisibilityToggle.tsx'
import {useComponentData} from '@react-form-builder/core'
import {useCallback} from 'react'

const PasswordVisibilityToggle = ({passwordInputKey}: any) => {
  const componentData = useComponentData()
  const {root} = componentData

  const togglePasswordVisibility = useCallback(() => {
    if (!passwordInputKey) return

    const passwordField = root.findByKey(passwordInputKey)
    if (!passwordField) return

    // This way you can get the properties of the component
    const componentProps = passwordField.componentState.propsWithoutChildren

    const isHidden = componentProps.type === 'password'
    const newType = isHidden ? 'text' : 'password'

    passwordField.userDefinedProps = {
      ...passwordField.userDefinedProps,
      type: newType
    }
  }, [passwordInputKey, root])

  return (
    <button onClick={togglePasswordVisibility}>
      Toggle password visibility
    </button>
  )
}
```

## Live examples

### Dynamic label based on API data

This example shows a button that fetches weather data and updates its label.

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
          key: 'weatherButton',
          type: 'MuiButton',
          props: {
            children: {value: 'Get weather'},
            variant: {value: 'contained'}
          },
          events: {
            onClick: [
              {
                name: 'fetchWeather',
                type: 'custom'
              }
            ]
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  const actions = {
    fetchWeather: async function(e) {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        const temperature = Math.floor(Math.random() * 30) + 10
        e.setUserDefinedProps({
          children: `Weather: ${temperature}°C`,
          color: temperature > 25 ? 'error' : 'primary'
        })
      } catch {
        e.setUserDefinedProps({
          children: 'Weather unavailable',
          color: 'inherit'
        })
      }
    }
  }
  
  return <FormViewer view={muiView} getForm={getForm} actions={actions}/>
}
```

### Form with real-time character counter

A text field with a dynamic helper text showing character count.

#### Live example

```jsx live
function App() {
  const [actions] = useState({
    updateCharCount(e) {
      const text = String(e.value || '').trim()
      const count = text.length
      const maxLength = 100

      let helperText = `${count}/${maxLength} characters`
      let color = 'primary'

      if (count > maxLength) {
        helperText = `⚠️ ${count - maxLength} characters over limit`
        color = 'error'
      } else if (count > maxLength * 0.8) {
        helperText = `⚠️ ${maxLength - count} characters left`
        color = 'warning'
      }

      e.setUserDefinedProps({
        helperText,
        color
      })
    }
  })

  const form = useMemo(() => ({
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [
        {
          key: 'comments',
          type: 'MuiTextField',
          props: {
            label: {value: 'Comments'},
            multiline: {value: true},
            rows: {value: 3}
          },
          events: {
            onChange: [
              {
                name: 'updateCharCount',
                type: 'custom'
              }
            ]
          }
        }
      ]
    }
  }), [])

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} actions={actions}/>
}
```

## Best practices

1. **Use sparingly**: User-defined properties are an escape hatch. Prefer computed properties, conditional rendering, or proper data binding
   when possible.
2. **Document overrides**: When you use `setUserDefinedProps`, add comments explaining why the override is necessary.
3. **Merge, don't replace**: When updating `userDefinedProps` in React components, spread existing properties to avoid losing other
   overrides:

   ```typescript
   // Good
   componentData.userDefinedProps = {
     ...componentData.userDefinedProps,
     newProp: value
   }
   
   // Bad (loses other overrides)
   componentData.userDefinedProps = { newProp: value }

   ```
4. **Test thoroughly**: Overrides can have unexpected side effects with validation, data binding, and conditional rendering.

## Precautions and warnings

:::warning[Advanced feature]

User-defined properties bypass FormEngine Core's normal property resolution. This can lead to:

- **Unexpected behavior** when overrides conflict with validation rules
- **Maintenance challenges** because the true component state is split between JSON and runtime code
- **Performance issues** if overrides trigger excessive re-renders

:::

### Common pitfalls

- **Circular updates**: An action that sets `userDefinedProps` might trigger another event that sets them again, creating an infinite loop.
- **Lost defaults**: If you override a property and later remove the override, the component won't revert to its computed or default value
  until you explicitly clear `userDefinedProps`.
- **Serialization issues**: `userDefinedProps` aren't part of the form JSON, so they won't persist if you serialize and deserialize the form
  state.

## Summary

- User-defined properties let you override component properties at runtime via `userDefinedProps` and `setUserDefinedProps`.
- They take precedence over all other property sources (static, computed, localized, defaults).
- You can set them from actions using `e.setUserDefinedProps()` or directly in React components.
- This is an advanced feature - use it sparingly and document your overrides.
- Always merge with existing properties to avoid losing other overrides.

---

For more information:

- [Actions and events](/formengine-core/actions-and-events)
- [Computed properties](/formengine-core/computed-properties)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [ComponentData reference][cd]
- [ActionEventArgs reference][ae]
- [useComponentData reference][ucd]

[cd]: /api-reference/@react-form-builder/core/classes/ComponentData
[ae]: /api-reference/@react-form-builder/core/classes/ActionEventArgs
[ucd]: /api-reference/@react-form-builder/core/variables/useComponentData
[user-defined-props]: /api-reference/@react-form-builder/core/classes/ActionEventArgs#userdefinedprops
[set-user-defined-props]: /api-reference/@react-form-builder/core/classes/ActionEventArgs#setuserdefinedprops
[cd-udp]: /api-reference/@react-form-builder/core/classes/ComponentData#userdefinedprops
