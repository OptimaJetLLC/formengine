import {Viewer} from '@react-form-builder/tests-common/lib/viewer/Viewer'
import React from 'react'
import {createRoot} from 'react-dom/client'

const element = document.getElementById('root')

if (!element) {
  throw new Error('Element not found')
}

const root = createRoot(element)

root.render(
  <React.StrictMode>
    <Viewer />
  </React.StrictMode>
)
