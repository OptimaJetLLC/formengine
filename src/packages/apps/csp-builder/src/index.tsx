import './monaco-settings'
import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import {CspBuilderApp} from './CspBuilderApp'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <CspBuilderApp />
  </React.StrictMode>
)
