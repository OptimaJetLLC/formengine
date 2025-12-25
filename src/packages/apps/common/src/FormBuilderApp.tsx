import {namedObserver} from '@react-form-builder/core'
import {useMemo} from 'react'
import {BuilderRefProvider} from './components/BuilderRefContext'
import {BuilderViewProvider} from './components/BuilderViewContext'
import {Header} from './components/Header'
import {MuiBuilder} from './components/MuiBuilder'
import {RSuiteBuilder} from './components/RSuiteBuilder'
import {usePersistentView} from './utils/usePersistentView'
import '../public/style.css'
import {Footer} from './components/Footer'
import {customization} from './utils/customization'
import {licenseKey} from './utils/licenseKey'
import type {FormBuilderAppProps} from './utils/types'

const RawFormBuilderApp = ({appName = 'form-builder', ...props}: FormBuilderAppProps = {}) => {
  const [view, setView] = usePersistentView(appName)
  const providerValue = useMemo(() => ({view, setView}), [view, setView])
  const commonProps = useMemo(() => ({licenseKey, customization, ...props}), [props])

  return (
    <BuilderViewProvider value={providerValue}>
      <BuilderRefProvider>
        <Header />
        {view === 'rsuite' ? <RSuiteBuilder {...commonProps} appName={appName} /> : <MuiBuilder {...commonProps} appName={appName} />}
        <Footer />
      </BuilderRefProvider>
    </BuilderViewProvider>
  )
}

export const FormBuilderApp = namedObserver('FormBuilderApp', RawFormBuilderApp)
