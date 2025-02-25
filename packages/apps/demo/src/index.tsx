import './utils/monaco-settings'
import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import App from './App'

const root = createRoot(
  document.getElementById('root') as HTMLElement
)

root.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
)
