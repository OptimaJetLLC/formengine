import {useEffect} from 'react'
import {ViewMode} from '../../../types'
import {namedObserver} from '../../../utils'
import {useStore} from '../../../utils/contexts/StoreContext'
import {EventStream} from '../../event/utils/EventStream'
import {ComponentTree} from '../../ui/ComponentTree'
import {useViewerProps} from './ViewerPropsContext'

const getViewMode = (): ViewMode => {
  const width = window.innerWidth

  if (width <= 600) return 'mobile'
  if (width <= 900) return 'tablet'

  return 'desktop'
}

function useAutoViewMode() {
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

/**
 * Properties of the React component {@link Viewer}.
 */
export interface ViewerProps {
  event?: (stream: EventStream) => void
}

/**
 * The React component of the form viewer, which displays the form itself with its components.
 * @returns the React element.
 */
export const Viewer = namedObserver('Viewer', ({event}: ViewerProps) => {
  const store = useStore()
  const props = useViewerProps()

  useEffect(() => {
    event?.(new EventStream(store.eventSubject))
  }, [])

  useAutoViewMode()

  useEffect(() => store.loadForm(props.getForm, props.formName), [store, props.getForm, props.formName])

  return <ComponentTree data={[store.form.componentTree]}/>
})
