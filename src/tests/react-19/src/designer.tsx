import React from 'react'
import {createRoot} from 'react-dom/client'
import App from '../../common/lib/designer/App'

const element = document.getElementById('root')

if (!element) {
  throw new Error('Element not found')
}

const root = createRoot(element)

root.render(<React.StrictMode>
  <App/>
</React.StrictMode>)
