import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import {CspViewerApp} from './CspViewerApp'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <CspViewerApp />
  </React.StrictMode>
)
