import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import type {ReactNode} from 'react'

import '@react-form-builder/core/assets/styles.css'
import '@react-form-builder/designer/assets/designer.ltr.min.css'

const components = rSuiteComponents.map(c => c.build())
const builderView = new BuilderView(components)

// disable CSS injection
const StylesProvider = ({children}: { children: ReactNode }) => children

function App() {
  return <FormBuilder view={builderView} stylesProvider={StylesProvider}/>
}

export default App
