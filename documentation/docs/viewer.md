---
sidebar_position: 4
title: Viewer
slug: /viewer
---

# Viewer

The [FormViewer](/api-reference/modules/react_form_builder_core#formviewer) component is responsible for displaying the form in Form
Builder. The [FormBuilder](/api-reference/modules/react_form_builder_designer#formbuilder) uses the `FormViewer` component to display
the form in the center panel.

The `FormViewer` component receives as input the properties described in the
type [FormViewerProps](/api-reference/interfaces/react_form_builder_core.FormViewerProps).

Let's look at an example of a simple application using a `FormViewer` component with a set of components from the React Suite library:

```tsx title='App.tsx'
import React from 'react'
import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/core'

const form = `{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsInput 1",
        "type": "RsInput",
        "props": {}
      }
    ]
  }
}`

function App() {
  return <FormViewer view={view} getForm={_ => form}/>
}

export default App
```

This code sample creates a `form` variable that contains a JSON form string, there is one input field on the form. In the component
`FormViewer` is passed the mandatory [view](/api-reference/interfaces/react_form_builder_core.FormViewerProps#view) property, which is a set
of component metadata for the React Suite library. As well as
the [getForm](/api-reference/interfaces/react_form_builder_core.FormViewerProps#getform) property, which accepts a function that returns the
value of the `form` variable.
