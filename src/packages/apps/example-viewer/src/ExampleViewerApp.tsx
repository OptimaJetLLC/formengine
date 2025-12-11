import type {BuilderTheme} from '@react-form-builder/core'
import {BuilderThemeProvider} from '@react-form-builder/core'
import {useEffect, useMemo, useState} from 'react'
import {MuiViewer} from './components/MuiViewer'
import {RsuiteViewer} from './components/RsuiteViewer'
import {ThemePicker} from './components/ThemePicker'
import type {ViewType} from './components/ViewContext'
import {ViewProvider} from './components/ViewContext'
import {ViewPicker} from './components/ViewPicker'

const storageKey = 'react-form-viewer-view'
const defaultView: ViewType = 'rsuite'

const themeStorageKey = 'react-form-viewer-theme'
const defaultTheme: BuilderTheme = 'light'

const usePersistentView = (): [ViewType, (view: ViewType) => void] => {
  const [view, setViewState] = useState<ViewType>(() => {
    return (localStorage.getItem(storageKey) ?? defaultView) as ViewType
  })

  useEffect(() => localStorage.setItem(storageKey, view), [view])

  return [view, setViewState]
}

const usePersistentTheme = () => {
  const [theme, setTheme] = useState<BuilderTheme>(() => {
    return (localStorage.getItem(themeStorageKey) ?? defaultTheme) as BuilderTheme
  })

  useEffect(() => localStorage.setItem(themeStorageKey, theme), [theme])

  return [theme, setTheme] as const
}

const controlsWrapperStyle = {
  display: 'flex',
  justifyContent: 'end',
  alignItems: 'center',
  padding: 15,
  gap: 10,
}

/**
 * @returns the App element.
 */
export const ExampleViewerApp = () => {
  const [view, setView] = usePersistentView()
  const [theme, setTheme] = usePersistentTheme()
  const providerValue = useMemo(() => ({view, setView}), [view, setView])

  return (
    <BuilderThemeProvider value={theme}>
      <ViewProvider value={providerValue}>
        <div style={controlsWrapperStyle}>
          <ThemePicker theme={theme} onChange={setTheme} />
          <ViewPicker />
        </div>
        {view === 'rsuite' ? <RsuiteViewer /> : <MuiViewer />}
      </ViewProvider>
    </BuilderThemeProvider>
  )
}
