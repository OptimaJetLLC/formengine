import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import {App} from './App'
import {Designer} from './Designer'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const designer = true

root.render(
  <React.StrictMode>
    {designer ? <Designer/> : <App/>}
  </React.StrictMode>
)
