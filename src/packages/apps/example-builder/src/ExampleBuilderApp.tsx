import type {ViewType} from '@react-form-builder/apps-common'
import {usePersistentView, ViewProvider} from '@react-form-builder/apps-common'
import {MantineBuilder, MuiBuilder} from '@react-form-builder/apps-common-designer'
import {useMemo} from 'react'
import {customization} from './customization'
import {RSuiteBuilder} from './RSuiteBuilder'

const appName = 'example'

const getBuilder = (view: ViewType) => {
  switch (view) {
    case 'mantine':
      return <MantineBuilder appName={appName} customization={customization} />
    case 'mui':
      return <MuiBuilder appName={appName} customization={customization} />
    default:
      return <RSuiteBuilder />
  }
}

/**
 * @returns the main app.
 */
export const ExampleBuilderApp = () => {
  const [view, setView] = usePersistentView(appName)
  const providerValue = useMemo(() => ({view, setView}), [view, setView])

  const builder = getBuilder(view)
  return <ViewProvider value={providerValue}>{builder}</ViewProvider>
}
