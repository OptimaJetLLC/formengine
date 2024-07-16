---
title: QR code
sidebar_label: QR code
sidebar_position: 10
slug: /components-library/qr-code
---

# QR code

## Overview

This component is in a separate NPM
package [@react-form-builder/components-fast-qr](https://www.npmjs.com/package/@react-form-builder/components-fast-qr). It is based
on [fast_qr](https://www.npmjs.com/package/fast_qr) package.

## Installation

Use the following command to install the package:

```bash
npm install @react-form-builder/components-fast-qr
```

## Connection to FormBuilder component

The example below assumes that you also have the components from the [@react-form-builder/components-rsuite](/components-library/) package
installed and the QR code component is additionally attached:

```typescript jsx {3,6}
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import {fastQrComponent} from '@react-form-builder/components-fast-qr'

const components = rSuiteComponents.map((c) => c.build())
const builderView = new BuilderView([...components, fastQrComponent.build()])

function App() {
  return <FormBuilder view={builderView}/>
}
```

## Connect to FormViewer component

The example below shows how to connect the QR code component along with the [@react-form-builder/components-rsuite](/components-library/)
components:

```typescript jsx showLineNumbers {1,7,17-21}
import {fastQrModel} from '@react-form-builder/components-fast-qr'
import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {FormViewer, View} from '@react-form-builder/core'

const components = [
  ...rSuiteComponents.map((c) => c.build().model),
  fastQrModel,
]
const view = new View(components)

const form = `{
  "form": {
    "key": "Screen",
    "type": "Screen",
    "props": {},
    "children": [
      {
        "key": "qrCode",
        "type": "FastQR",
        "props": {}
      }
    ]
  }
}`

function App() {
  return <FormViewer view={view} getForm={() => form}/>
}
```
