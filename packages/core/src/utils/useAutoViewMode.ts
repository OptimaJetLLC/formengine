import {useEffect} from 'react'
import {useViewerProps} from '../features/form-viewer/components/ViewerPropsContext'
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
  const props = useViewerProps()

  useEffect(() => {
    if (props.viewMode) {
      store.viewMode = props.viewMode
      return
    }

    const onResize = () => store.viewMode = getViewMode()
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [props.viewMode])
}
