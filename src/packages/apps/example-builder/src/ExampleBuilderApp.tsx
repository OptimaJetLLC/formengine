import type {ViewType} from '@react-form-builder/apps-common'
import {getViewStorageKey, usePersistentView, ViewProvider} from '@react-form-builder/apps-common'
import {MantineBuilder, MuiBuilder} from '@react-form-builder/apps-common-designer'
import {useMemo} from 'react'
import {customization} from './customization'
import {RSuiteBuilder} from './RSuiteBuilder'
import {RSuiteBuilderImportCss} from './RSuiteBuilderImportCss'

const appName = 'example'

const getBuilder = (view: ViewType) => {
  switch (view) {
    case 'mantine':
      return <MantineBuilder appName={appName} customization={customization} />
    case 'mui':
      return <MuiBuilder appName={appName} customization={customization} />
    case 'rsuite-import-css':
      return <RSuiteBuilderImportCss />
    case 'rsuite-inject-css':
      return <RSuiteBuilder />
    default:
      return null
  }
}

/**
 * @returns the main app.
 */
export const ExampleBuilderApp = () => {
  const [view, setView] = usePersistentView(appName)
  const providerValue = useMemo(
    () => ({
      view,
      setView,
      viewStorageKey: getViewStorageKey(appName),
    }),
    [view, setView]
  )

  const builder = getBuilder(view)
  return <ViewProvider value={providerValue}>{builder}</ViewProvider>
}
