import {useEffect, useState} from 'react'
import type {ViewType} from '../components/BuilderViewContext'

const defaultView: ViewType = 'rsuite'

/**
 * React hook that provides a persistent view state synced with localStorage.
 * @param appName the name of the application for which the view is being persisted.
 * @returns a tuple containing the current view and a setter function
 * to update and persist the view.
 */
export const usePersistentView = (appName = 'form-builder'): [ViewType, (view: ViewType) => void] => {
  const storageKey = `${appName}-view-name`
  const [view, setViewState] = useState<ViewType>(() => {
    return (localStorage.getItem(storageKey) ?? defaultView) as ViewType
  })

  useEffect(() => localStorage.setItem(storageKey, view), [storageKey, view])

  return [view, setViewState]
}
