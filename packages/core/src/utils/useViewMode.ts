import {useEffect, useState} from 'react'
import {ViewMode} from './types'

const getViewMode = (): ViewMode => {
  const width = window.innerWidth

  if (width <= 600) return 'mobile'
  if (width <= 900) return 'tablet'

  return 'desktop'
}

export default function useViewMode(initialViewMode?: ViewMode) {
  const [viewMode, setViewMode] = useState(initialViewMode)

  useEffect(() => {
    if (!initialViewMode) {
      const onResize = () => setViewMode(getViewMode())
      window.addEventListener('resize', onResize)
      return () => window.removeEventListener('resize', onResize)
    }
    setViewMode(initialViewMode)
  }, [initialViewMode])

  return viewMode
}
