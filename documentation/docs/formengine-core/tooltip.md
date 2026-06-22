---
description: Improve form UX with tooltips in FormEngine. Add contextual help, field
  descriptions, examples, and guidance for better user experience and fewer errors.
sidebar_class_name: formengine-core-additional
sidebar_label: Tooltip
sidebar_position: 80
title: Add Tooltips to Forms - Help Text & Field Descriptions
---

# Add Tooltips to Forms - Help Text & Field Descriptions

Tooltips let you attach contextual help to form fields without taking up layout space. In FormEngine Core, tooltips are rendered by wrapping
components at runtime based on your form and component configuration.

In this guide, you'll learn:

- How `tooltipType` selects the tooltip component for the entire form
- How `tooltipProps` define per-component tooltip content and behavior
- Where tooltips render and how they are localized
- How to build and register a custom tooltip component

## Overview

FormEngine applies tooltips by wrapping rendered components with a tooltip component selected by the form-level
[tooltipType](/api-reference/@react-form-builder/core/classes/Form#tooltiptype). The wrapper is only used when a tooltip component is
resolved from `tooltipType` and a component has
[tooltipProps](/api-reference/@react-form-builder/core/classes/ComponentStore#tooltipprops) defined in JSON. The tooltip component
receives the wrapped component as `children`.

`tooltipType` must reference a component with the `tooltip` role. If it is not set, the viewer store picks the first component with that
role from the active view and stores it in the form settings.

## Select the Tooltip Component

Use the top-level [tooltipType](/api-reference/@react-form-builder/core/classes/Form#tooltiptype) setting in your form JSON to choose
which tooltip component should wrap the fields.

| Setting                     | Location         | Type     | Description                                                              |
|-----------------------------|------------------|----------|--------------------------------------------------------------------------|
| [tooltipType][tooltip-type] | Form JSON (root) | `string` | Tooltip component type with the `tooltip` role; defaults to first match. |

:::warning

If `tooltipType` points to a component type that is not in the view, the tooltip wrapper cannot resolve and no tooltips render. Always use a
component that declares the `tooltip` role so the wrapper behaves as expected.

:::

[tooltip-type]: /api-reference/@react-form-builder/core/classes/Form#tooltiptype

## Configure Tooltip Props

Per-component tooltip configuration lives in
[tooltipProps](/api-reference/@react-form-builder/core/classes/ComponentStore#tooltipprops). These props are passed directly to the
tooltip wrapper component and are localized using the `tooltip` localization type while sharing the same data root as the wrapped
component.
For a full localization walkthrough, see
[Example: Tooltip Localization](/formengine-core/localization#example-tooltip-localization).

The available tooltip props depend on the chosen UI library. For example:

- **Material UI (`MuiTooltip`)**: `title`, `placement`, `arrow`, `followCursor`, `enterDelay`, `leaveDelay`, and related behavior flags.
- **Rsuite (`RsTooltip`)**: `text`, `placement`, `trigger`.

## Where Tooltips Render

Tooltips are applied when
[tooltipProps](/api-reference/@react-form-builder/core/classes/ComponentStore#tooltipprops) is present on standard components (for
example, input fields).

Containers, templates, and repeaters are not wrapped, even if `tooltipProps` is defined on them.

## Example: Tooltip on a Field

This form enables a tooltip for the email field using `MuiTooltip`:

```json
{
  "tooltipType": "MuiTooltip",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "email",
        "type": "MuiTextField",
        "props": {
          "label": {
            "value": "Email address"
          }
        },
        "tooltipProps": {
          "title": {
            "value": "We only use this to send updates"
          },
          "placement": {
            "value": "right"
          },
          "arrow": {
            "value": true
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
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'email',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Email address'
            },
            helperText: {
              value: 'Hover for tooltip help'
            }
          },
          tooltipProps: {
            title: {
              value: 'We only use this to send updates'
            },
            placement: {
              value: 'right'
            },
            arrow: {
              value: true
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={muiView} getForm={getForm} />
}
```

## Create a Custom Tooltip

A custom tooltip is a wrapper component that renders `children` and uses props you expose through `tooltipProps`. To make it available in a
form:

1. Build a React component that accepts `children` and your tooltip props.
2. Register it with `define(...)` and mark it with `.componentRole('tooltip')`.
3. Add the tooltip component to the view and set `tooltipType` to its type.

### Example: Simple Tooltip Component

```tsx title='SimpleTooltip.tsx'
import type {WrapperProps} from '@react-form-builder/core'
import {define, node, oneOf, string} from '@react-form-builder/core'
import {useMemo, useState} from 'react'

type Placement = 'top' | 'right' | 'bottom' | 'left'

interface SimpleTooltipProps extends WrapperProps {
  text: string
  placement?: Placement
}

const containerStyle = {
  position: 'relative',
  display: 'inline-flex',
  alignItems: 'center'
} as const

const bubbleStyle = {
  position: 'absolute',
  backgroundColor: '#111827',
  color: '#ffffff',
  padding: '6px 8px',
  borderRadius: 4,
  fontSize: 12,
  whiteSpace: 'nowrap',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
  transition: 'opacity 120ms ease',
  zIndex: 10
} as const

const placements: Record<Placement, Record<string, string>> = {
  top: {bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)'},
  right: {left: '100%', top: '50%', transform: 'translate(8px, -50%)'},
  bottom: {top: '100%', left: '50%', transform: 'translate(-50%, 8px)'},
  left: {right: '100%', top: '50%', transform: 'translate(-8px, -50%)'}
}

const SimpleTooltip = ({
  text,
  placement = 'top',
  children,
  className
}: SimpleTooltipProps): JSX.Element | null => {
  const [open, setOpen] = useState(false)

  const tooltipStyle = useMemo(() => ({
    ...bubbleStyle,
    ...placements[placement],
    opacity: open ? 1 : 0,
    pointerEvents: open ? 'auto' : 'none'
  }), [open, placement])

  if (!children) return null

  return (
    <span
      className={className}
      style={containerStyle}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      {children}
      <span style={tooltipStyle} role="tooltip">{text}</span>
    </span>
  )
}

export const simpleTooltip = define(SimpleTooltip, 'SimpleTooltip')
  .props({
    text: string.required.default('Tooltip message...').dataBound,
    placement: oneOf('top', 'right', 'bottom', 'left').default('top'),
    children: node
  })
  .componentRole('tooltip')
  .build()
```

#### Live example

```jsx live
function App() {
  const containerStyle = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center'
  }

  const bubbleStyle = {
    position: 'absolute',
    backgroundColor: '#111827',
    color: '#ffffff',
    padding: '6px 8px',
    borderRadius: 4,
    fontSize: 12,
    whiteSpace: 'nowrap',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
    transition: 'opacity 120ms ease',
    zIndex: 10
  }

  const placements = {
    top: {bottom: '100%', left: '50%', transform: 'translate(-50%, -8px)'},
    right: {left: '100%', top: '50%', transform: 'translate(8px, -50%)'},
    bottom: {top: '100%', left: '50%', transform: 'translate(-50%, 8px)'},
    left: {right: '100%', top: '50%', transform: 'translate(-8px, -50%)'}
  }

  const SimpleTooltip = ({text, placement = 'top', children, className}) => {
    const [open, setOpen] = useState(false)

    const tooltipStyle = useMemo(() => ({
      ...bubbleStyle,
      ...placements[placement],
      opacity: open ? 1 : 0,
      pointerEvents: open ? 'auto' : 'none'
    }), [open, placement])

    if (!children) return null

    return (
      <span
        className={className}
        style={containerStyle}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
        <span style={tooltipStyle} role="tooltip">{text}</span>
      </span>
    )
  }

  const simpleTooltip = define(SimpleTooltip, 'SimpleTooltip')
    .props({
      text: string.required.default('Tooltip message...').dataBound,
      placement: oneOf('top', 'right', 'bottom', 'left').default('top'),
      children: node
    })
    .componentRole('tooltip')
    .build()

  const view = muiView
  view.define(simpleTooltip.model)

  const form = {
    tooltipType: 'SimpleTooltip',
    form: {
      key: 'Screen',
      type: 'Screen',
      props: {},
      children: [
        {
          key: 'intro',
          type: 'MuiTypography',
          props: {
            children: {
              value: 'Account setup'
            },
            variant: {
              value: 'h6'
            }
          }
        },
        {
          key: 'email',
          type: 'MuiTextField',
          props: {
            label: {
              value: 'Email address'
            },
            helperText: {
              value: 'Hover for tooltip help'
            }
          },
          tooltipProps: {
            text: {
              value: 'We only use this to send updates'
            },
            placement: {
              value: 'top'
            }
          }
        }
      ]
    }
  }

  const getForm = useCallback(() => JSON.stringify(form), [form])

  return <FormViewer view={view} getForm={getForm} />
}
```

## Summary

- Set `tooltipType` to a tooltip component in the view. If you omit it, the viewer falls back to the first component with the `tooltip`
  role.
- Use `tooltipProps` to opt specific components into tooltips. The props are localized with the `tooltip` type.
- Tooltips wrap standard components and repeaters only; containers and templates are ignored.
- Register custom tooltips with `componentRole('tooltip')` and include them in the view.

---

For more information:
- [Localization](/formengine-core/localization)
- [Forms JSON](/formengine-core/forms-json)
- [Components Library](/components-library)
- [Custom Components](/formengine-core/custom-components)
- [ComponentStore tooltipProps API](/api-reference/@react-form-builder/core/classes/ComponentStore#tooltipprops)
