---
sidebar_position: 8
title: Actions
slug: /actions
---

# Actions

## Overview

Actions are simply JavaScript functions that are used to handle events. Actions are of the following types:

1. Common - these are useful predefined actions that are useful when working with a form:

   1. _validate_ - validates the form.
   2. _clear_ - clears the form fields.
   3. _reset_ - sets the value of form fields to their default value.

2. Code - the code of such actions is written directly in the designer, in the code editor.
3. Custom - these are actions passed to the properties of the FormBuilder/FormViewer component.

## Events

Two events are described for each component connected to Form Builder: `onDidMount`, `onWillUnmount`. These events are triggered when a
component is mounted and unmounted, as for a typical React component. If you want to use other component events, you must
use [event](/api-reference/@react-form-builder/core/classes/ActionEventArgs#event) to define the component property you need. Example:

```typescript {7}
export const myButton = define(MyButton, 'MyButton')
    .name('MyButton')
    .props({
        children: string.required.named('Content').hinted('Caption').default('My Button'),
        danger: boolean.hinted('Set the danger status of button'),
        disabled: boolean.hinted('Disabled state of button'),
        onClick: event
    })
```

In the above code, the `onClick` property is defined as `event`. After connecting the component to the designer, you will see the `onClick`
event in the list of available component events and will be able to bind an action to this event.

## Working with actions

Let's open our [demo](https://demo.formengine.io/). And select the Save button in the designer, as in the screenshot below. In the right
panel, select the "Actions" tab.

![Actions 01](/assets/actions/actions-01.png)

There are two handlers attached to the `onClick` event: `validate` and `showValidationResult`. The `showValidationResult` action is editable
because it is a "Code" action. The actions are executed sequentially, one after the other. You can change the order in which the actions are
called by simply dragging and dropping their names in the list. And of course you can add and remove actions.

Click on the pen icon next to `showValidationResult` to open the action code editor. You should see similar to the screenshot below:

![Actions 02](/assets/actions/actions-02.png)

As you can see, an action is simply an asynchronous JavaScript function. The mandatory parameter is the action name and handler code. In the
right part you can specify the action parameters. If the action has parameters, you can pass the values of the arguments to the parameters
in the binding of the action to the event.

Let's take a closer look at the action code.

```javascript title='showValidationResult' {6,12-14} showLineNumbers
/**
 * @param {ActionEventArgs} e - the action arguments.
 * @param {} args - the action parameters arguments.
 */
async function Action (e, args) {
    const setVisible = (key, visible) => {
        const componentStore = e.store.form.componentTree.findByKey(key)?.store
        if (componentStore) {
            componentStore.renderWhen = {value: visible}
        }
    }
    const hasErrors = e.store.form.componentTree.hasErrors
    setVisible('errorMessage', hasErrors)
    setVisible('successMessage', !hasErrors)
}
```

There are two parameters in this function:
1. e is an object of type [ActionEventArgs](/api-reference/@react-form-builder/core/classes/ActionEventArgs).
2. args - this object will store values of arguments of action parameters.

Line 6 contains the `setVisible` function, which is responsible for hiding or displaying the component on the form using the `renderWhen`
property. The `hasErrors` variable gets the value `true` if the form contains validation errors (line 12). Lines 13 and 14 show/hide
components with `key` field "errorMessage" and "successMessage". That is, in fact, this function just shows the component displaying the
error or the component displaying the success of validation of the whole form.

## Custom actions

Custom actions can be passed through the [actions](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#actions) parameter.
The passed custom actions will be available in the selection in the form designer. You can find an
example [this](/usage#designer) page.

```jsx
<FormBuilder
  actions={{
    logEventArgs: e => console.log(e),
    assertArgs: ActionDefinition.functionalAction((e, args) => {
      console.log(e, args)
    }, {
      p1: 'string',
      p2: 'boolean',
      p3: 'number'
    })
  }}
/>
```

In the simplest case, a custom function is just an arrow function like `logEventArgs` from the example above. If you need a function with
parameters, use the [ActionDefinition.functionalAction](/api-reference/@react-form-builder/core/classes/ActionDefinition#functionalaction)
function to define the action, as in the case of `assertArgs`.
