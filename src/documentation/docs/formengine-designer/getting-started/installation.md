---
description: Install FormEngine Designer in your React application. Complete setup
  guide with npm, configuration, and integration with your existing codebase.
sidebar_label: Installation
sidebar_position: 2
slug: /formengine-designer/getting-started/installation
title: Install FormEngine Designer - Setup Guide
---

# Install FormEngine Designer - Setup Guide

## Designer

The form designer in Form Builder is represented by the React
component [FormBuilder](/api-reference/@react-form-builder/designer/variables/FormBuilder). The `FormBuilder` component is located in the
package [@react-form-builder/designer](https://www.npmjs.com/package/@react-form-builder/designer).

To install the package in your application, use the command:

```bash
npm install @react-form-builder/designer
```

:::tip

If your package manager does not support automatic installation of peer dependencies, for example you use the `--legacy-peer-deps` flag in
npm, then you need to install peer dependencies manually.

```bash
npm install @emotion/css@11.10.5 @emotion/react@11.10.5 @emotion/styled@11.10.5 mobx@6.9.0 rsuite@5.59.1 rsuite-table@5.10.3 --save-exact
```

:::

Below is sample code for embedding the `FormBuilder` component into your application:

```tsx title='App.tsx'
import React from 'react'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

const builderView = new BuilderView([])

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

You can find a description of the component properties in
the [FormBuilderProps](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps) API. The only mandatory property
is [view](/api-reference/@react-form-builder/designer/interfaces/FormBuilderProps#view),
which is a description of the component [metadata](/api-reference/@react-form-builder/core/classes/BuilderView) used to design the form.

You can use the pre-built components found in
the [@react-form-builder/components-rsuite](https://www.npmjs.com/package/@react-form-builder/components-rsuite) package to start a form
designer with a populated set of components.

Run the following command to install the package:

```bash
npm install @react-form-builder/components-rsuite
```

:::tip

If your package manager does not support automatic installation of peer dependencies, for example you use the `--legacy-peer-deps` flag in
npm, then you need to install peer dependencies manually.

```bash
npm install @emotion/css@11.10.5 @emotion/react@11.10.5 @emotion/styled@11.10.5 @rsuite/icons@1.0.2 react-number-format@5.1.4 rsuite@5.59.1 --save-exact
```

:::

Then copy and paste the code below:

```tsx title='App.tsx'
import React from 'react'
// highlight-next-line
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'

// highlight-next-line
const components = rSuiteComponents.map(c => c.build())
// highlight-next-line
const builderView = new BuilderView(components)

function App() {
  return <FormBuilder view={builderView}/>
}

export default App
```

This is the minimal React component code with which you can add a form designer to your application.

## Viewer

The [FormViewer](/api-reference/@react-form-builder/core/variables/FormViewer) component is responsible for displaying the form in Form
Builder. The [FormBuilder](/api-reference/@react-form-builder/designer/variables/FormBuilder) uses the `FormViewer` component to display
the form in the center panel.

To install the package in your application, use the command:

```bash
npm install @react-form-builder/core
```

:::tip

If your package manager does not support automatic installation of peer dependencies, for example you use the `--legacy-peer-deps` flag in
npm, then you need to install peer dependencies manually.

```bash
npm install @emotion/cache@11.10.5 @emotion/css@11.10.5 @emotion/react@11.10.5 mobx@6.9.0 mobx-react@7.6.0 --save-exact
```

:::

The `FormViewer` component receives as input the properties described in the
type [FormViewerProps](/api-reference/@react-form-builder/core/interfaces/FormViewerProps).

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
`FormViewer` is passed the mandatory [view](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#view) property, which is a
set of component metadata for the React Suite library. As well as
the [getForm](/api-reference/@react-form-builder/core/interfaces/FormViewerProps#getform) property, which accepts a function that returns
the value of the `form` variable.

## CDN

You can immediately start using the FormEngine without using npm, bundlers and other frontend infrastructure by installing it via CDN. The
following bundles are provided:

- designer bundle: https://unpkg.com/@react-form-builder/designer-bundle@latest/dist/index.iife.js
- viewer bundle: https://unpkg.com/@react-form-builder/viewer-bundle@latest/dist/index.iife.js
- viewer premium bundle: https://unpkg.com/@react-form-builder/viewer-bundle-premium@latest/dist/index.iife.js

### Using Designer bundle

Here's an example of the usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FormEngine Designer bundle embedding example</title>
  <script src="https://unpkg.com/@react-form-builder/designer-bundle@latest/dist/index.iife.js" async defer></script>
</head>
<body style="margin: 0">
<div id="designer"></div>

<script type="text/javascript">
  window.onload = function () {
    const props = {
      getForm: () => form
    }

    const designerBundle = window.FormEngineDesignerBundle;
    window.designerRoot = designerBundle.renderFormBuilder('designer', props)
  }
  const form = `
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsInput",
        "type": "RsInput",
        "props": {}
      }
    ]
  },
  "localization": {},
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
`
</script>
</body>
</html>
```

By default, the [renderFormBuilder](/api-reference/@react-form-builder/designer-bundle/functions/renderFormBuilder) function creates a
designer with a full set of [available components](/components-library/). If you want to change the list of added components, you can use
the [createBuilderView](/api-reference/@react-form-builder/designer-bundle/functions/createBuilderView) function:

```javascript
window.onload = function () {
  const {
    renderFormBuilder,
    createBuilderView,
    rSuiteComponents,
    richTextComponent,
    signatureComponent,
    fastQrComponent,
    googleMapComponent
  } = window.FormEngineDesignerBundle

  const {
    formEngineRsuiteCssLoader,
    ltrCssLoader,
    rsErrorMessage,
    RsLocalizationWrapper,
    rsTooltip,
    rtlCssLoader
  } = rSuiteComponents

  const filteredRSuiteComponents = rSuiteComponents.rSuiteComponents.filter(component => {
    return component.data.component.displayName !== 'RsTimePicker'
  })

  const myComponentsSet = [
    ...filteredRSuiteComponents,
    richTextComponent.richTextComponent,
    signatureComponent.signatureComponent,
    fastQrComponent.fastQrComponent,
    googleMapComponent.googleMapComponent
  ].map(component => component.build())

  const view = createBuilderView(myComponentsSet)
    .withViewerWrapper(RsLocalizationWrapper)
    .withCssLoader('ltr', ltrCssLoader)
    .withCssLoader('rtl', rtlCssLoader)
    .withCssLoader('common', formEngineRsuiteCssLoader)

  window.designerRoot = renderFormBuilder('designer', {
    getForm: () => form,
    view
  })
}
```

### Using Viewer bundle

Here's an example of the usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FormEngine Viewer bundle embedding example</title>
  <script src="https://unpkg.com/@react-form-builder/viewer-bundle@latest/dist/index.iife.js" async defer></script>
</head>
<body style="margin: 0">
<div id="viewer"></div>

<script type="text/javascript">
  window.onload = function () {
    const props = {
      getForm: () => form
    }

    const viewerBundle = window.FormEngineViewerBundle;
    window.viewerRoot = viewerBundle.renderFormViewer('viewer', props)
  }
  const form = `
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsInput",
        "type": "RsInput",
        "props": {}
      }
    ]
  },
  "localization": {},
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
`
</script>
</body>
</html>
```

### Using Viewer premium bundle

Here's an example of the usage:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>FormEngine Viewer premium bundle embedding example</title>
  <script src="https://unpkg.com/@react-form-builder/viewer-bundle-premium@latest/dist/index.iife.js" async defer></script>
</head>
<body style="margin: 0">
<div id="viewer"></div>

<script type="text/javascript">
  window.onload = function () {
    const props = {
      getForm: () => form
    }

    const viewerBundle = window.FormEngineViewerBundle;
    window.viewerRoot = viewerBundle.renderFormViewer('viewer', props)
  }
  const form = `
{
  "version": "1",
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "RsInput",
        "type": "RsInput",
        "props": {}
      }
    ]
  },
  "localization": {},
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
`
</script>
</body>
</html>
```

By default, in the premium bundle, the [renderFormViewer](/api-reference/@react-form-builder/viewer-bundle/functions/renderFormViewer)
function creates a viewer with a full set of [available components](/components-library/). If you want to change the list of added
components, you can use the [createView](/api-reference/@react-form-builder/viewer-bundle-premium/variables/createView) function:

```javascript
window.onload = function () {
  const {
    renderFormViewer,
    createView,
    rSuiteComponents,
    richTextComponent,
    signatureComponent,
    fastQrComponent,
    googleMapComponent
  } = window.FormEngineViewerBundle

  const {
    formEngineRsuiteCssLoader,
    ltrCssLoader,
    RsLocalizationWrapper,
    rtlCssLoader
  } = rSuiteComponents

  const filteredRsuiteComponents = rSuiteComponents.rSuiteComponents.filter(component => {
    return component.data.component.displayName !== 'RsTimePicker'
  })

  const myComponentsSet = [
    ...filteredRsuiteComponents,
    richTextComponent.richTextComponent,
    signatureComponent.signatureComponent,
    fastQrComponent.fastQrComponent,
    googleMapComponent.googleMapComponent
  ].map(component => component.build().model)

  const view = createView(myComponentsSet)
    .withViewerWrapper(RsLocalizationWrapper)
    .withCssLoader('ltr', ltrCssLoader)
    .withCssLoader('rtl', rtlCssLoader)
    .withCssLoader('common', formEngineRsuiteCssLoader)

  window.viewerRoot = renderFormViewer('viewer', {
    getForm: () => form,
    view
  })
}
```
