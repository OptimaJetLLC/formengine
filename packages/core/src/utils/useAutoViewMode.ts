import {useEffect} from 'react'
import {ViewMode} from '../types'
import {useStore} from './contexts/StoreContext'

const getViewMode = (): ViewMode => {
  const width = window.innerWidth

  if (width <= 600) return 'mobile'
  if (width <= 900) return 'tablet'

  return 'desktop'
}

export function useAutoViewMode() {
  const store = useStore()

  useEffect(() => {
    if (store.props.viewMode) {
      store.viewMode = store.props.viewMode
      return
    }

    const onResize = () => store.viewMode = getViewMode()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [store.props.viewMode])
}
