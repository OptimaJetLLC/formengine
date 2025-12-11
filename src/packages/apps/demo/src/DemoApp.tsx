import {useEffect, useMemo, useState} from 'react'
import type {ViewType} from './components/BuilderViewContext'
import {BuilderViewProvider} from './components/BuilderViewContext'
import {MuiBuilder} from './MuiBuilder'
import {RsuiteBuilder} from './RsuiteBuilder'

const storageKey = 'react-form-builder-view'
const defaultView: ViewType = 'rsuite'

const usePersistentView = (): [ViewType, (view: ViewType) => void] => {
  const [view, setViewState] = useState<ViewType>(() => {
    return (localStorage.getItem(storageKey) ?? defaultView) as ViewType
  })

  useEffect(() => localStorage.setItem(storageKey, view), [view])

  return [view, setViewState]
}

/**
 * @returns the main app.
 */
export const DemoApp = () => {
  const [view, setView] = usePersistentView()
  const providerValue = useMemo(() => ({view, setView}), [view, setView])

  return <BuilderViewProvider value={providerValue}>{view === 'rsuite' ? <RsuiteBuilder /> : <MuiBuilder />}</BuilderViewProvider>
}
