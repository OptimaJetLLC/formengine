import type {ViewType} from '@react-form-builder/apps-common'
import {usePersistentView, ViewProvider} from '@react-form-builder/apps-common'
import {namedObserver} from '@react-form-builder/core'
import type {FormBuilderProps, GenerateJsonFormSchemaOptions} from '@react-form-builder/designer'
import {createSchema} from '@react-form-builder/json-schema-generator'
import {useMemo} from 'react'
import {BuilderRefProvider} from './components/BuilderRefContext'
import {Footer} from './components/Footer'
import {Header} from './components/Header'
import {MantineBuilder} from './components/MantineBuilder'
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

const getBuilder = (view: ViewType, appName: string, props: Partial<FormBuilderProps>) => {
  switch (view) {
    case 'mantine':
      return <MantineBuilder {...props} appName={appName} />
    case 'mui':
      return <MuiBuilder {...props} appName={appName} />
    default:
      return <RSuiteBuilder />
  }
}

const RawFormBuilderApp = ({appName = 'form-builder', ...props}: FormBuilderAppProps = {}) => {
  const [view, setView] = usePersistentView(appName)
  const providerValue = useMemo(() => ({view, setView}), [view, setView])
  const commonProps = useMemo(() => ({licenseKey, customization, generateJsonFormSchema, ...props}), [props])
  const builder = getBuilder(view, appName, commonProps)

  return (
    <ViewProvider value={providerValue}>
      <BuilderRefProvider>
        <Header />
        {builder}
        <Footer />
      </BuilderRefProvider>
    </ViewProvider>
  )
}

export const FormBuilderApp = namedObserver('FormBuilderApp', RawFormBuilderApp)
