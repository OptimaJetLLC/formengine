import {usePersistentView, ViewProvider} from '@react-form-builder/apps-common'
import {namedObserver} from '@react-form-builder/core'
import type {GenerateJsonFormSchemaOptions} from '@react-form-builder/designer'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {useMemo} from 'react'
import {BuilderRefProvider} from './components/BuilderRefContext'
import {Footer} from './components/Footer'
import {Header} from './components/Header'
import {MuiBuilder} from './components/MuiBuilder'
import {RSuiteBuilder} from './components/RSuiteBuilder'
import {customization} from './utils/customization'
import {licenseKey} from './utils/licenseKey'
import type {FormBuilderAppProps} from './utils/types'
import '@react-form-builder/apps-common/public/style.css'

const generateJsonFormSchema = (options: GenerateJsonFormSchemaOptions) => {
  const {components, descriptions} = options
  const schema = createSchema(components, descriptions)
  return JSON.stringify(schema, undefined, 2)
}

const RawFormBuilderApp = ({appName = 'form-builder', ...props}: FormBuilderAppProps = {}) => {
  const [view, setView] = usePersistentView(appName)
  const providerValue = useMemo(() => ({view, setView}), [view, setView])
  const commonProps = useMemo(() => ({licenseKey, customization, generateJsonFormSchema, ...props}), [props])

  return (
    <ViewProvider value={providerValue}>
      <BuilderRefProvider>
        <Header />
        {view === 'rsuite' ? <RSuiteBuilder {...commonProps} appName={appName} /> : <MuiBuilder {...commonProps} appName={appName} />}
        <Footer />
      </BuilderRefProvider>
    </ViewProvider>
  )
}

export const FormBuilderApp = namedObserver('FormBuilderApp', RawFormBuilderApp)
