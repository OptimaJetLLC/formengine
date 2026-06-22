// @ts-nocheck
import {Viewer} from '@react-form-builder/tests-common/lib/viewer/Viewer'
import React from 'react'
import ReactDOM from 'react-dom'

const element = document.getElementById('root')

if (!element) {
  throw new Error('Element not found')
}

ReactDOM.render(
  <React.StrictMode>
    <Viewer/>
  </React.StrictMode>,
  element
)
