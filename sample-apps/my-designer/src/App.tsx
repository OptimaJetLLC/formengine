import {fastQrComponent} from '@react-form-builder/components-fast-qr'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BuilderView, FormBuilder} from '@react-form-builder/designer'
import React from 'react'

const components = [...rSuiteComponents, fastQrComponent]
  .map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())

function App() {
  return <FormBuilder view={view}/>
}

export default App;
