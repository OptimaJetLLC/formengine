---
sidebar_position: 8
title: Using tabs
slug: /using-tabs
---

# Using tabs

Imagine you have a component that displays tabs. As an example, let's use the [Nav](https://rsuitejs.com/components/nav/#nav) component from
the React Suite library. The `Nav` component only displays the navigation, but what if we need to display different content when the user
switches navigation tabs in the same place? In this case, we can use conditional binding of the child component to the parent component.

## Conditional binding

First of all, you need to familiarise yourself with the component slots from this [article](/nested-components#slots).

Let's create a custom component that will display tabs and different components depending on which tab is currently active.

```typescript jsx {16,19,20,23-27,55-59} title='RsTab.tsx' showLineNumbers
import styled from '@emotion/styled'
import {array, boolean, define, node, toLabeledValues, useComponentData} from '@react-form-builder/core'
import type {ReactNode, SyntheticEvent} from 'react'
import type {NavProps} from 'rsuite'
import {Nav} from 'rsuite'
import {navProps} from '../commonProperties'

type RsItem = {
  label: string
  value: string
}

interface RsTabProps extends NavProps {
  items?: RsItem[]
  showNavigation?: boolean
  pane: ReactNode
}

const RsTab = ({pane, onSelect, showNavigation, items, ...props}: RsTabProps) => {
  const componentData = useComponentData()
  if (!items?.length) return null

  const onNavSelect = (eventKey: string, event: SyntheticEvent) => {
    componentData.userDefinedProps ??= {}
    componentData.userDefinedProps.activeKey = eventKey
    onSelect?.(eventKey, event)
  }

  const activeKey = props.activeKey ?? items?.[0].value

  return <>
    {showNavigation === true && <SNav onSelect={onNavSelect} {...props}>
      {items.map((item, index) =>
        <Nav.Item key={index} eventKey={item.value} active={item.value === activeKey}>
          {item.label}
        </Nav.Item>)}
    </SNav>}
    <div>{pane}</div>
  </>
}

const SNav = styled(Nav)`
  .builder & .rs-nav-item {
    z-index: 7;
  }
`

export const rsTab = define(RsTab)
  .type('RsTab')
  .name('Tab')
  .props({
    ...navProps,
    items: array.default(toLabeledValues(['Item1', 'Item2', 'Item3'])),
    showNavigation: boolean.hinted('Show or hide navigation').default(true),
    pane: node
      .withSlotConditionBuilder(props => {
        return `return parentProps.activeKey === '${props.activeKey?.value ?? props.activeKey}'`;
      })
      .calculable(false).hinted('A child component of the tab'),
  })
```

Let's take an in-depth look at how this component works.

- Lines 13-17 define the type of properties of the `RsTabProps` component. Line 16 shows that the `pane` property is of type `ReactNode`.
- In lines 19-40, the React component `RsTab` is defined. It is a functional React component that receives properties of type `RsTabProps`.
- In line 20, the `RsTab` component uses the Form
  Builder [useComponentData](/api-reference/modules/react_form_builder_core#usecomponentdata) hook. This hook returns an instance of
  class [ComponentData](/api-reference/classes/react_form_builder_core.ComponentData). The `ComponentData` class is responsible for storing
  all the data needed to render the component.
- The `ComponentData` contains the [userDefinedProps](/api-reference/classes/react_form_builder_core.ComponentData#userdefinedprops)
  property. You can set component properties in `userDefinedProps` to override component properties that have been computed by the Form
  Builder.
- Lines 23-27 define the `onNavSelect` handler, which changes the `activeKey` property, the name of the active tab, when the tab is clicked.
  The `activeKey` property is set via `userDefinedProps`.
- Lines 48-60 define the metadata of the `RsTab` component for the Form Builder.
- The `pane` property is defined on lines 55-59.
- On lines 56-58,
  the [withSlotConditionBuilder](/api-reference/classes/react_form_builder_core.NodeAnnotationBuilder#withslotconditionbuilder) function is
  called. This is where the most entertaining part starts. The `withSlotConditionBuilder` function takes as input a function that should
  return a text with the source code of another function.

## Slot condition

The function that is passed to `withSlotConditionBuilder` receives the `props` parameter as input. **`props` are properties of the
component, which are available only inside Form Builder Designer!**

:::info

When you use a component inside Form Builder Designer, the function passed in `withSlotConditionBuilder` is called, and this function must
return the **text** of a function that will run in the component's display mode, that is, outside of Form Builder Designer.

The string with the text of the conditional binding function will be calculated at the form design stage and written to the form's JSON.

When the form is rendered, Form Builder will compile and execute a function from the saved text. If the function returns `true`, the child
component will be bound to the component slot, otherwise the component will not be rendered.
:::

Let's take a look at the text of the function that will check the binding condition:

```typescript {2}
withSlotConditionBuilder(props => {
  return `return parentProps.activeKey === '${props.activeKey?.value ?? props.activeKey}'`;
})
```

This function takes as input the `parentProps` parameter, which are the properties of the component to which the child component will be
bound. That is, these are also properties of our `RsTab` component, but only used when the component is displayed, not when the component is
designed.

## Example form

For example, let's open [demo](https://demo.formengine.io/) and add a Tab component to the form. On the first tab let's add Checkbox, on the
second tab add TextArea, on the third tab add Image, and look at the resulting JSON of the form:

```json {16-17,23-24,30-31} title='Form.json' showLineNumbers
{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsTab 1",
        "type": "RsTab",
        "props": {},
        "children": [
          {
            "key": "RsCheckbox 1",
            "type": "RsCheckbox",
            "props": {},
            "slot": "pane",
            "slotCondition": "return parentProps.activeKey === 'Item1'"
          },
          {
            "key": "RsTextArea 1",
            "type": "RsTextArea",
            "props": {},
            "slot": "pane",
            "slotCondition": "return parentProps.activeKey === 'Item2'"
          },
          {
            "key": "RsImage 1",
            "type": "RsImage",
            "props": {},
            "slot": "pane",
            "slotCondition": "return parentProps.activeKey === 'Item3'"
          }
        ]
      }
    ]
  }
}
```

When we added the Checkbox component to the form, the active tab in the component properties was "Item1". So Form Builder Designer
evaluated the function and got the following string as a result: `return parentProps.activeKey === 'Item1'`. This string was stored in
the `slotCondition` field, and the slot name was written to the `slot` field with the value `pane`. `pane` is a property of the component
to which the conditional binding is performed.

The conditions were also calculated for the TextArea component - the active tab was "Item2". Therefore, the text of the check function
is `return parentProps.activeKey === 'Item2'`.

For the Image component, the active tab at the time of form design was the "Item3" tab. The calculated text of the check function is as
follows - `return parentProps.activeKey === 'Item3'`.

:::info

When Form Builder displays a form, it evaluates the functions from the `slotCondition` and displays the components if the function
returned `true`. Since all three functions above are mutually exclusive, only one component, either Checkbox, TextArea or Image, will be
bound to the `pane` property and displayed.

:::
