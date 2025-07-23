---
sidebar_position: 6
title: User defined properties
slug: /user-defined-properties
description: How to override the properties of a component in runtime.
---

# User defined properties

In cases where you need to change (override) the properties of a component inside the form action or the component code in React, you can
use [userDefinedProps](/api-reference/@react-form-builder/core/classes/ComponentData#userdefinedprops)
and [setUserDefinedProps](/api-reference/@react-form-builder/core/classes/ActionEventArgs#setuserdefinedprops). It overwrites the properties
that will go into the component, replacing the calculated properties as well as the default properties.

## Overriding component properties using an action

Imagine that you need to upload a list of cities from the server to **Dropdown** once, when rendering the component. To do this, you need:

1. Add **Dropdown** to the form, select it, and go to the **Actions** tab.
2. Add a new **Code action** in the **onDidMount** event.

![User defined props 01](/assets/user-defined-props/user-defined-props-01.png)

3. Add the following code to the action editor and save:

```typescript
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action(e, args) {
  const response = await fetch('https://gist.githubusercontent.com/rogargon/5534902/raw/434445021e155240ca78e378f10f70391dd594ea/countries.json')
  const data = await response.json()
  const preparedData = data.map(value => ({value, label: value}))
  e.setUserDefinedProps({data: preparedData})
}
```

![User defined props 02](/assets/user-defined-props/user-defined-props-02.png)

4. Go to Preview and check it out. The list of countries is now loaded into Dropdown.

![User defined props 03](/assets/user-defined-props/user-defined-props-03.png)

## Overriding the properties of an arbitrary component

Inside the React component, you can use the [useComponentData](/api-reference/@react-form-builder/core/variables/useComponentData) hook to
access the [userDefinedProps](/api-reference/@react-form-builder/core/classes/ComponentData#userdefinedprops)
and [setUserDefinedProps](/api-reference/@react-form-builder/core/classes/ActionEventArgs#setuserdefinedprops) of the current component. You
can consider its use using the example of the [Tabs component implementation](/using-tabs).
You can also change the properties of another component. Here is an example:

```typescript jsx
import {useStore} from '@react-form-builder/core'

const MyComponent = () => {
  const {componentTree} = useStore().form

  const handleClick = () => {
    const componentData = componentTree.findByKey('passwordInput')
    if (componentData) {
      const currentValue = componentData.userDefinedProps?.passwordMask ?? false
      componentData.userDefinedProps ??= {}
      componentData.userDefinedProps.passwordMask = !currentValue
    }
  }

  return <button onClick={handleClick}>Toggle hide password</button>
}
```
