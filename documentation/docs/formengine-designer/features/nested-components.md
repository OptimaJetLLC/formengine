---
title: Nested components
description: Form Builder supports nested components out of the box
sidebar_position: 2
slug: /formengine-designer/features/nested-components
---

:::info[For form authors]

Group fields with containers and view nesting in **Tree**.

[Full guide →](designer-guide:form-structure-and-layout/form-structure-and-containers/)
:::

## Nested components

Form Builder supports nested components out of the box. There are two types of nested components:

1. Simple nested components.
2. Templates.

## Simple nested components

Simple nested component is a React component, that binds to one of the component property.

For example your have your React component, where one of the properties described as
the [node](/api-reference/@react-form-builder/core/variables/node). The `children` property is also treated as a `node` property. A
component that is specified in the `node` property is considered a nested component.

## Templates

A template is simply a form within another form. The template is treated as a normal component, but with some features:

1. The [FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer) component is used to display the template.
2. The data inside the template is isolated from the parent form.
3. Data can be transferred to the parent form as a nested object, or as a part of the parent form (regulated by the "Store data in parent
   form" flag).

<iframe width="560" height="315" src="https://www.youtube.com/embed/I-zDlI96Rvo?si=cm4XNxJlWGTgyHP8" title="How to use forms templates"
frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
allowfullscreen=""></iframe>

## Slots

Each component property defined as a `node` property is treated as a slot where child components can be added. A component can have any
number of slots to which child components can be added.

As an example, let's see how the [Message](https://rsuitejs.com/components/message/#props-amp-hooks) component from the React Suite library
is described in Form Builder:

```typescript title='RsMessage.tsx'
import {boolean, define, node, oneOf} from '@react-form-builder/core'
import {Message} from 'rsuite'

export const rsMessage = define(Message)
  .type('RsMessage')
  .name('Message')
  .props({
    // highlight-next-line
    children: node,
    closeable: boolean,
    // highlight-next-line
    header: node,
    type: oneOf('info', 'success', 'warning', 'error').default('info')
  })
```

There are two component properties that are described as `node`: children and header. You can use this component on our
public [demo](https://demo.formengine.io/).

Here is a form with a Message component. The Input component is bound to the `header` slot, and the Button component is bound to
the `children` slot. Note that if the slot is named `children`, the slot name will be missing in the JSON with the form, because `children`
is the default slot name.

```json {11,16} title='Example of a form'
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsMessage 1",
        "type": "RsMessage",
        "props": {},
        "children": [
          {
            "key": "RsInput 1",
            "type": "RsInput",
            "props": {},
            "slot": "header"
          },
          {
            "key": "RsButton 1",
            "type": "RsButton",
            "props": {}
          }
        ]
      }
    ]
  }
}
```

This is roughly what the form looks like in the screenshot below. In the components tree on the left, you can see that the Input and Button
components are children of the Message component.

![Nested Components](/assets/nested-components/nested-components-01.png "Nested Components")

## How it works

When rendering a component, the Form Builder first calculates all the properties of the component. After that, all child components are
calculated and bound to the component properties by the slot name specified in the child component. If there is no slot name, the default
slot, `children`, is used.
