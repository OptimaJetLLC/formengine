import React from 'react'
import {createRoot} from 'react-dom/client'
import TestDesignerApp from '../../common/lib/designer/TestDesignerApp'

const element = document.getElementById('root')

if (!element) {
  throw new Error('Element not found')
}

const root = createRoot(element)

root.render(<React.StrictMode>
  <TestDesignerApp/>
</React.StrictMode>)
