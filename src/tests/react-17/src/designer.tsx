import App from '@react-form-builder/tests-common/lib/designer/App'
import React from 'react'
import ReactDOM from 'react-dom'

const element = document.getElementById('root')

if (!element) {
  throw new Error('Element not found')
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  element
)
