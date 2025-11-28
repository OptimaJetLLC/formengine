import './wdyr'

import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import ExampleBuilderApp from './ExampleBuilderApp'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <ExampleBuilderApp />
  </React.StrictMode>
)
