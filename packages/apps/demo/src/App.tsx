import {FormBuilder} from '@react-form-builder/builder'
import {BuilderView} from '@react-form-builder/builder/view'
import {antdComponents} from '@react-form-builder/components-antd'
import {rsErrorMessage, rsTooltip, rSuiteComponents} from '@react-form-builder/components-rsuite'
import {observer} from 'mobx-react'
import {getFormFromJson} from './utils/getFormFromJson'

const data = {
  title: 'Hello! Hello!',
  login: '1',
  password: 'ok',
  'Template:Test form 1': {login: 'tortuga', password: 'man!', agreement: false},
  'Agreement Title': 'Data in agreement template',
  'Input in template': 'Data in template level 1',
  ['last name']: 'Bret',
}

const components = [...rSuiteComponents, ...antdComponents].map(definer => definer.build())
const view = new BuilderView(components)
  .withErrorMeta(rsErrorMessage.build())
  .withTooltipMeta(rsTooltip.build())
  // .withTemplates(['template', 'agreement', 'login form'])

const sampleFormName = 'SampleForm'

const FormBuilderApp = observer(() =>
  <FormBuilder
    getForm={getFormFromJson}
    formName={sampleFormName}
    view={view}
    data={data}
  />)

const App = () => <FormBuilderApp/>

export default App
