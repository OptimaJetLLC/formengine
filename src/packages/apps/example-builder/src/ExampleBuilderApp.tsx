import {BuilderViewProvider, MuiBuilder, usePersistentView} from '@react-form-builder/apps-common'
import {useMemo} from 'react'
import {customization} from './customization'
import {RSuiteBuilder} from './RSuiteBuilder'

const appName = 'example'

/**
 * @returns the main app.
 */
export const ExampleBuilderApp = () => {
  const [view, setView] = usePersistentView(appName)
  const providerValue = useMemo(() => ({view, setView}), [view, setView])

  return (
    <BuilderViewProvider value={providerValue}>
      {view === 'rsuite' ? <RSuiteBuilder /> : <MuiBuilder appName={appName} customization={customization} />}
    </BuilderViewProvider>
  )
}
