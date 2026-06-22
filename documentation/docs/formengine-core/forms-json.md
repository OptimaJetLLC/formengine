---
description: 'Complete reference for FormEngine JSON format: schema structure, field
  types, validation rules, actions, events, and all configuration options explained.'
sidebar_class_name: formengine-core-advanced
sidebar_label: Form JSON
sidebar_position: 350
title: FormEngine JSON Schema - Form Configuration Reference
---

# FormEngine JSON Schema - Form Configuration Reference

Form JSON is the blueprint for a form. It lists every component in a tree and adds the extra settings FormEngine Core needs to render,
validate, and localize your form.

In this guide, you'll learn:

- The shared top-level fields used by every form JSON
- The common shape of component nodes
- Where component-set-specific props come from
- How RSuite and MUI forms look in practice

## Shared form JSON fields

Form JSON is a single object. It combines metadata (actions, validation settings, tooltip/error/modal configuration, localization) with a
root component tree in the [form][pf-form] field. The top-level fields can include [version][pf-version], [form][pf-form],
[actions][pf-actions], [formValidator][pf-formvalidator], [tooltipType][pf-tooltiptype], [errorType][pf-errortype],
[errorProps][pf-errorprops], [modalType][pf-modaltype], [localization][pf-localization], [languages][pf-languages], and
[defaultLanguage][pf-defaultlanguage].

Think of it like this: the top level is the form settings, and `form` is the tree of components to render.

:::info note
Each component set ships component descriptions you can use to generate a JSON schema. The generated schema restricts which [type][cs-type]
values and [props][cs-props] are allowed, while the rest of the structure stays shared.
:::

Field reference (types and short descriptions):

| Field                                 | Type                                           | Description                                                                               |
|---------------------------------------|------------------------------------------------|-------------------------------------------------------------------------------------------|
| [version][pf-version]                 | [PersistedFormVersion][t-persistedformversion] | Optional schema version; when present, it must be `"1"`.                                  |
| [form][pf-form]                       | [ComponentStore][t-componentstore]             | Root component node for the form tree.                                                    |
| [actions][pf-actions]                 | [ActionValues][t-actionvalues]                 | Named code actions referenced by component events.                                        |
| [tooltipType][pf-tooltiptype]         | `string`                                       | Component type used for tooltips, such as `MuiTooltip` or `RsTooltip`.                    |
| [errorType][pf-errortype]             | `string`                                       | Component type used for validation errors, such as `MuiErrorWrapper` or `RsErrorMessage`. |
| [errorProps][pf-errorprops]           | `unknown`                                      | Any JSON value passed to the error component.                                             |
| [modalType][pf-modaltype]             | `string`                                       | Component type used for modal rendering (for example `MuiDialog` or `RsModal`).           |
| [formValidator][pf-formvalidator]     | `string`                                       | JavaScript source string for the form-level validator function.                           |
| [localization][pf-localization]       | [LocalizationValue][t-localizationvalue]       | Localization dictionary for component props.                                              |
| [languages][pf-languages]             | [Language][t-language][]                       | Supported languages metadata.                                                             |
| [defaultLanguage][pf-defaultlanguage] | `string`                                       | Default language code (for example `en-US`).                                              |

Here is a minimal top-level shape that renders a form without localization:

```json
{
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "screen",
    "type": "Screen",
    "children": []
  }
}
```

Add the other top-level fields when you need specific capabilities:

- `actions` to define reusable code actions referenced by component events. See
  [Actions and events](/formengine-core/actions-and-events).
- `formValidator` to add form-level validation. See [Validation](/formengine-core/validation).
- `localization`, `languages`, and `defaultLanguage` to localize text and switch languages. See
  [Localization](/formengine-core/localization).
- `tooltipType` to select the tooltip wrapper component. See [Tooltip](/formengine-core/tooltip).
- `errorType` and `errorProps` to choose and configure the validation error component. See [Validation](/formengine-core/validation).
- `modalType` to select the modal component used for modal forms. See
  [Custom modal components](/formengine-core/custom-components/custom-modal-component).

Actions live at the top level and are referenced by component events. The snippets below show only the relevant top-level fields; combine
them with the minimal form above.

### Actions

```json
{
  "actions": {
    "logEmail": {
      "body": "  console.log('Email:', e.data.email)",
      "params": {}
    }
  }
}
```

Reference actions from component events like this:

```json
{
  "key": "submit",
  "type": "MuiButton",
  "props": {
    "children": {
      "value": "Submit"
    }
  },
  "events": {
    "onClick": [
      {
        "name": "logEmail",
        "type": "code"
      }
    ]
  }
}
```

### Form-level validation

```json
{
  "formValidator": "const errors = {}; if (!formData.email) { errors.email = 'Required'; } return errors;"
}
```

### Localization

```json
{
  "localization": {
    "en-US": {
      "email": {
        "component": {
          "label": "Email"
        }
      }
    }
  },
  "languages": [
    {
      "code": "en",
      "dialect": "US",
      "name": "English",
      "description": "American English",
      "bidi": "ltr"
    }
  ],
  "defaultLanguage": "en-US"
}
```

### Tooltip component

```json
{
  "tooltipType": "MuiTooltip"
}
```

### Error component

```json
{
  "errorType": "RsErrorMessage",
  "errorProps": {
    "placement": {
      "value": "bottomEnd"
    }
  }
}
```

### Modal component

```json
{
  "modalType": "MuiDialog"
}
```

## Shared component node fields

Component nodes describe the UI elements in the form tree. Each node declares which component to render, its props, and any behavior tied
to data, validation, or events.

If you are new to this format, focus on three fields first:

- [key][cs-key]: a unique id for the component
- [type][cs-type]: which UI component to render
- [props][cs-props]: the options for that component (label, placeholder, etc.)

Field reference (types and short descriptions):

| Field                           | Type                                                           | Description                                                  |
|---------------------------------|----------------------------------------------------------------|--------------------------------------------------------------|
| [key][cs-key]                   | `string`                                                       | Unique component key in the form tree.                       |
| [dataKey][cs-datakey]           | `string`                                                       | Data key used for form data binding.                         |
| [type][cs-type]                 | `string`                                                       | Component type name that must exist in the selected view.    |
| [props][cs-props]               | Record&lt;string, [ComponentProperty][t-componentproperty]&gt; | Component props defined by the component set.                |
| [children][cs-children]         | [ComponentStore][t-componentstore][]                           | Child nodes (components) for layout or container components. |
| [renderWhen][cs-renderwhen]     | [ComponentProperty][t-componentproperty]                       | Condition that controls whether the component renders.       |
| [schema][cs-schema]             | [BoundValueSchema][t-boundvalueschema]                         | Validation rules for valued components.                      |
| [events][cs-events]             | Record&lt;string, [ActionData][t-actiondata][]&gt;             | Event-to-action mapping for this component.                  |
| [tooltipProps][cs-tooltipprops] | Record&lt;string, [ComponentProperty][t-componentproperty]&gt; | Props passed to the tooltip wrapper.                         |
| [css][cs-css]                   | [Css][t-css]                                                   | Component-level CSS styles.                                  |
| [wrapperCss][cs-wrappercss]     | [Css][t-css]                                                   | Wrapper-level CSS styles.                                    |
| [style][cs-style]               | [ComponentStyle][t-componentstyle]                             | Inline styles for the component.                             |
| [wrapperStyle][cs-wrapperstyle] | [ComponentStyle][t-componentstyle]                             | Inline styles for the wrapper.                               |
| [slot][cs-slot]                 | `string`                                                       | Target slot name in the parent component.                    |

Here is a minimal component node that renders a basic field:

```json
{
  "key": "email",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email"
    }
  },
  "children": []
}
```

Add optional fields when you need specific capabilities. The snippets below show only the extra fields; combine them with the minimal node
above.

- `dataKey` to bind the component to a specific data key (defaults to `key`). See
  [Handling form data](/formengine-core/handling-form-data).
- `schema` to add per-component validation rules. See [Validation](/formengine-core/validation).
- `events` to trigger actions from component events. See [Actions and events](/formengine-core/actions-and-events).
- `renderWhen` to conditionally render a component. See [Conditional rendering](/formengine-core/conditional-rendering).
- `tooltipProps` to enable per-component tooltips. See [Tooltip](/formengine-core/tooltip).
- `css` and `wrapperCss` to apply CSS rules. See [Styling components and forms](/formengine-core/styling-components-and-forms).
- `style` and `wrapperStyle` for inline styles. See [Styling components and forms](/formengine-core/styling-components-and-forms).
- `slot` to target named slots in composite components. See
  [Embedded forms](/formengine-core/embedded-forms).

### Data binding

```json
{
  "dataKey": "email"
}
```

### Validation

```json
{
  "schema": {
    "validations": [
      {
        "key": "required"
      }
    ]
  }
}
```

### Events

```json
{
  "events": {
    "onBlur": [
      {
        "name": "validate",
        "type": "common"
      }
    ]
  }
}
```

### Conditional rendering

```json
{
  "renderWhen": {
    "value": "form.data.subscribe === true"
  }
}
```

### Tooltip props

```json
{
  "tooltipProps": {
    "title": {
      "value": "We only use this to send updates"
    }
  }
}
```

### CSS styling

```json
{
  "css": {
    "any": {
      "string": "margin-top: 8px;"
    }
  },
  "wrapperCss": {
    "any": {
      "string": "padding: 8px;"
    }
  }
}
```

### Inline styling

```json
{
  "style": {
    "any": {
      "string": "margin-top: 8px;"
    }
  },
  "wrapperStyle": {
    "any": {
      "string": "padding: 8px;"
    }
  }
}
```

### Slot

```json
{
  "slot": "title"
}
```

### Advanced fields

- `htmlAttributes` to attach HTML attributes (for example `data-*` or `aria-*`) to the rendered element.
- `modal` to provide modal-specific props (and optional modal events) for modal components. See
  [Custom modal components](/formengine-core/custom-components/custom-modal-component).
- `disableDataBinding` to opt a component out of form data binding. See
  [One-way data binding](/formengine-core/custom-components/one-way-data-binding).

### HTML attributes

```json
{
  "htmlAttributes": [
    {
      "data-testid": "email-field",
      "aria-label": "Email"
    }
  ]
}
```

### Modal settings

```json
{
  "modal": {
    "props": {
      "title": {
        "value": "Confirm"
      }
    }
  }
}
```

### Disable data binding

```json
{
  "disableDataBinding": {
    "value": true
  }
}
```

See the [ComponentStore][t-componentstore] reference for the full list of optional fields.

## Component-set-specific fields

The shared structure above stays the same, but [props][cs-props] and [type][cs-type] values come from the component set you are using. For
example, MUI adds text-field-specific props on `MuiTextField`, while RSuite defines different input props for `RsInput` and other RSuite
components.

Each entry in [props][cs-props] is a [ComponentProperty][t-componentproperty] value, so it can be static, computed, or localized. Use the
component set schema to see which props are available and which value shape is expected.

Component property value shapes:

Static value (use `value`):

```json
{
  "props": {
    "label": {
      "value": "Email"
    }
  }
}
```

Computed value (use `computeType: "function"` and `fnSource`). See [Computed properties](/formengine-core/computed-properties).

```json
{
  "props": {
    "helperText": {
      "computeType": "function",
      "fnSource": "return form.data.email ? 'Looks good' : 'Enter your email';"
    }
  }
}
```

Localized value (use `computeType: "localization"` and add a matching entry in the top-level localization dictionary). See
[Localization](/formengine-core/localization).

```json
{
  "key": "email",
  "type": "MuiTextField",
  "props": {
    "label": {
      "computeType": "localization"
    }
  }
}
```

```json
{
  "localization": {
    "en-US": {
      "email": {
        "component": {
          "label": "Email"
        }
      }
    }
  }
}
```

Component-set-specific prop examples (non-localized):

```json
{
  "key": "email",
  "type": "MuiTextField",
  "props": {
    "label": {
      "value": "Email"
    },
    "helperText": {
      "value": "name@example.com"
    }
  }
}
```

```json
{
  "key": "email",
  "type": "RsInput",
  "props": {
    "label": {
      "value": "Email"
    },
    "placeholder": {
      "value": "name@example.com"
    }
  }
}
```

## Examples

### MUI form

This example uses the MUI view and MUI component types. It shows only what matters to compare MUI-specific props.

```json
{
  "tooltipType": "MuiTooltip",
  "errorType": "MuiErrorWrapper",
  "form": {
    "key": "screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Email"
          },
          "helperText": {
            "value": "name@example.com"
          }
        }
      },
      {
        "key": "password",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Password"
          },
          "type": {
            "value": "password"
          }
        }
      },
      {
        "key": "submit",
        "type": "MuiButton",
        "props": {
          "children": {
            "value": "Sign in"
          }
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'MuiTooltip',
    errorType: 'MuiErrorWrapper',
    form: {
      key: 'screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'email',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Email'
            },
            helperText: {
              value: 'name@example.com'
            }
          }
        },
        {
          key: 'password',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Password'
            },
            type: {
              value: 'password'
            }
          }
        },
        {
          key: 'submit',
          type: 'MuiButton',
          props: {
            children: {
              value: 'Sign in'
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm}/>
}
```

### RSuite form

This example uses the RSuite view and RSuite component types. It shows only what matters to compare RSuite-specific props.

```json
{
  "tooltipType": "RsTooltip",
  "errorType": "RsErrorMessage",
  "form": {
    "key": "screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "email",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Email"
          },
          "placeholder": {
            "value": "name@example.com"
          }
        }
      },
      {
        "key": "password",
        "type": "RsInput",
        "props": {
          "label": {
            "value": "Password"
          },
          "type": {
            "value": "password"
          }
        }
      },
      {
        "key": "submit",
        "type": "RsButton",
        "props": {
          "children": {
            "value": "Sign in"
          },
          "appearance": {
            "value": "primary"
          }
        }
      }
    ]
  }
}
```

#### Live example

```jsx live
function App() {
  const form = {
    tooltipType: 'RsTooltip',
    errorType: 'RsErrorMessage',
    form: {
      key: 'screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'email',
          type: 'RsInput',
          props: {
            label: {
              value: 'Email'
            },
            placeholder: {
              value: 'name@example.com'
            }
          }
        },
        {
          key: 'password',
          type: 'RsInput',
          props: {
            label: {
              value: 'Password'
            },
            type: {
              value: 'password'
            }
          }
        },
        {
          key: 'submit',
          type: 'RsButton',
          props: {
            children: {
              value: 'Sign in'
            },
            appearance: {
              value: 'primary'
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={viewWithCss} getForm={getForm}/>
}
```

## Summary

- Form JSON describes the component tree plus metadata for actions, tooltips, errors, and localization.
- Shared top-level fields are consistent across component sets; component-specific props live under [props][cs-props].
- Every component node follows the same base shape, with optional validation, events, and styling fields.
- Use the component set schema to confirm which [type][cs-type] values and props are supported.

---

For more information:

- [Rendering forms](/formengine-core/rendering-forms)
- [Handling form data](/formengine-core/handling-form-data)
- [Actions and events](/formengine-core/actions-and-events)
- [Validation](/formengine-core/validation)
- [Conditional rendering](/formengine-core/conditional-rendering)
- [Localization](/formengine-core/localization)
- [Tooltip](/formengine-core/tooltip)
- [Styling components and forms](/formengine-core/styling-components-and-forms)

[pf-version]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#version
[pf-form]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#form
[pf-actions]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#actions
[pf-tooltiptype]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#tooltiptype
[pf-errortype]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#errortype
[pf-errorprops]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#errorprops
[pf-modaltype]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#modaltype
[pf-formvalidator]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#formvalidator
[pf-localization]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#localization
[pf-languages]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#languages
[pf-defaultlanguage]: /api-reference/@react-form-builder/core/interfaces/PersistedForm#defaultlanguage
[cs-key]: /api-reference/@react-form-builder/core/classes/ComponentStore#key
[cs-type]: /api-reference/@react-form-builder/core/classes/ComponentStore#type
[cs-props]: /api-reference/@react-form-builder/core/classes/ComponentStore#props
[cs-children]: /api-reference/@react-form-builder/core/classes/ComponentStore#children
[cs-datakey]: /api-reference/@react-form-builder/core/classes/ComponentStore#datakey
[cs-renderwhen]: /api-reference/@react-form-builder/core/classes/ComponentStore#renderwhen
[cs-htmlattributes]: /api-reference/@react-form-builder/core/classes/ComponentStore#htmlattributes
[cs-tooltipprops]: /api-reference/@react-form-builder/core/classes/ComponentStore#tooltipprops
[cs-modal]: /api-reference/@react-form-builder/core/classes/ComponentStore#modal
[cs-slot]: /api-reference/@react-form-builder/core/classes/ComponentStore#slot
[cs-slotcondition]: /api-reference/@react-form-builder/core/classes/ComponentStore#slotcondition
[cs-disabledatabinding]: /api-reference/@react-form-builder/core/classes/ComponentStore#disabledatabinding
[cs-schema]: /api-reference/@react-form-builder/core/classes/ComponentStore#schema
[cs-events]: /api-reference/@react-form-builder/core/classes/ComponentStore#events
[cs-css]: /api-reference/@react-form-builder/core/classes/ComponentStore#css
[cs-wrappercss]: /api-reference/@react-form-builder/core/classes/ComponentStore#wrappercss
[cs-style]: /api-reference/@react-form-builder/core/classes/ComponentStore#style
[cs-wrapperstyle]: /api-reference/@react-form-builder/core/classes/ComponentStore#wrapperstyle
[t-persistedformversion]: /api-reference/@react-form-builder/core/enumerations/PersistedFormVersion
[t-componentstore]: /api-reference/@react-form-builder/core/classes/ComponentStore
[t-actionvalues]: /api-reference/@react-form-builder/core/type-aliases/ActionValues
[t-localizationvalue]: /api-reference/@react-form-builder/core/type-aliases/LocalizationValue
[t-language]: /api-reference/@react-form-builder/core/classes/Language
[t-boundvalueschema]: /api-reference/@react-form-builder/core/type-aliases/BoundValueSchema
[t-componentproperty]: /api-reference/@react-form-builder/core/interfaces/ComponentProperty
[t-css]: /api-reference/@react-form-builder/core/type-aliases/Css
[t-componentstyle]: /api-reference/@react-form-builder/core/type-aliases/ComponentStyle
[t-actiondata]: /api-reference/@react-form-builder/core/type-aliases/ActionData
