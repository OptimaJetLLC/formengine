import {view} from '@react-form-builder/components-rsuite'
import {FormViewer} from '@react-form-builder/viewer'
// @ts-ignore necessary for React to work correctly
import React from 'react'
import 'rsuite/dist/rsuite.min.css'

const loadForm = async (formName?: string) => {
  const name = formName || ''
  const response = await fetch(`http://127.0.0.1:3000/${name}.json`)
  return await response.json()
}

function App() {
  return <>
    <h1>Form Sample</h1>
    <FormViewer view={view} getForm={loadForm} formName='MyForm'/>
  </>
}

export default App
