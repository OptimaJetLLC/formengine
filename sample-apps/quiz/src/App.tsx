import {ltrCssLoader, RsLocalizationWrapper, rtlCssLoader, view} from '@react-form-builder/components-rsuite'
import {BiDi, FormViewer} from '@react-form-builder/core'
// @ts-ignore necessary for React to work correctly
import React from 'react'
import 'rsuite/dist/rsuite.min.css'

const loadForm = async (formName?: string) => {
  const name = formName || ''
  const response = await fetch(`http://127.0.0.1:3000/${name}.json`)
  const json = await response.json()
  return JSON.stringify(json)
}

const rSuiteView = view
  .withViewerWrapper(RsLocalizationWrapper)
  .withCssLoader(BiDi.LTR, ltrCssLoader)
  .withCssLoader(BiDi.RTL, rtlCssLoader)

function App() {
  return <>
    <h1>Form Sample</h1>
    <FormViewer view={rSuiteView} getForm={loadForm} formName='MyForm'/>
  </>
}

export default App
