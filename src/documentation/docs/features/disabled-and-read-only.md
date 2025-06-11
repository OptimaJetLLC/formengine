---
sidebar_position: 5
title: Disabled and read-only
slug: /disabled-and-read-only
---

# Disabled and read-only properties

You can make all or part of the form disabled or read-only. There are several mechanisms for this.

:::info Important

For components that do not have `readOnly` and `disabled` properties this mechanism does not apply.

:::

## The FormViewer component properties disabled and readOnly

Use the [readOnly](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#disabled) property to make the form read-only.
Use the [disabled](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#readonly) property to disable components.

These properties apply to any form.

```typescript jsx {3,4}
const App = () => {
  return <FormViewer
    disabled={true}
    readOnly={true}
    view={view}
    getForm={getForm}/>
}
```

## Screen component properties

These properties are stored in the form and affect all child components of the form.

![Screen disabled](/assets/features/disabled-and-read-only/disabled-and-read-only-01.png)

## Container component properties

These properties will affect all child components of the [Container](/components-library/structure-components/container) component.

![Container disabled](/assets/features/disabled-and-read-only/disabled-and-read-only-02.png)

## Template properties

These properties will affect the entire template used.

![Template disabled](/assets/features/disabled-and-read-only/disabled-and-read-only-03.png)

## Custom component properties

To describe a component property as `disabled` use the [disabled](/api-reference/@react-form-builder/core/variables/disabled) variable.
To describe a component property as `readOnly` use the [readOnly](/api-reference/@react-form-builder/core/variables/readOnly) variable.

```tsx {1,4,5,9,18-19} showLineNumbers
import {buildForm, createView, define, disabled, FormViewer, readOnly} from '@react-form-builder/core'

interface MyComponentProps {
  disabled?: boolean
  readOnly?: boolean
}

const MyComponent = (props: MyComponentProps) => {
  const {disabled, readOnly} = props
  return <div>
    <div>{disabled ? 'Disabled' : 'Enabled'}</div>
    <div>{readOnly ? 'Read-only' : 'Writable'}</div>
  </div>
}

const myComponent = define(MyComponent, 'MyComponent')
  .props({
    disabled: disabled,
    readOnly: readOnly,
  })

const view = createView([myComponent.build().model])

const form = buildForm()
  .component('myComponent', 'MyComponent')
  .json()

export const MyViewer = () => {
  return <FormViewer view={view}
                     readOnly={true}
                     disabled={true}
                     getForm={() => form}
  />
}
```
