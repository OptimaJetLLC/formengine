import React from 'react'
// eslint-disable-next-line import/extensions
import {createRoot} from 'react-dom/client'
import {Designer} from './Designer'
import {LandingApp} from './LandingApp'

const container = document.getElementById('root') as HTMLElement
const root = createRoot(container)

const designer = true

root.render(
  <React.StrictMode>
    {designer ? <Designer/> : <LandingApp/>}
  </React.StrictMode>
)
