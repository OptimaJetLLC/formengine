import TestDesignerApp from '@react-form-builder/tests-common/lib/designer/TestDesignerApp'
import React from 'react'
import {createRoot} from 'react-dom/client'

const element = document.getElementById('root')

if (!element) {
  throw new Error('Element not found')
}

const root = createRoot(element)

root.render(
  <React.StrictMode>
    <TestDesignerApp />
  </React.StrictMode>
)
