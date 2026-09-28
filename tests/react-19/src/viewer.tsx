import React from 'react'
import {createRoot} from 'react-dom/client'
import {Viewer} from '../../common/lib/viewer/Viewer'

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
