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
  }, [props.viewMode, store])
}

/**
 * Properties of the React component {@link Viewer}.
 */
export interface ViewerProps {
  /**
   * The function for processing form events.
   * @param stream the event stream of the form viewer.
   */
  event?: (stream: EventStream) => void
}

/**
 * The React component of the form viewer, which displays the form itself with its components.
 * @param props the React component properties.
 * @param props.event the function for processing form events.
 * @returns the React element.
 */
const RawViewer = ({event}: ViewerProps) => {
  const store = useStore()
  const props = useViewerProps()

  useEffect(() => {
    event?.(new EventStream(store.eventSubject))
  }, [event, store.eventSubject])

  useAutoViewMode()

  useEffect(() => store.loadForm(props.getForm, props.formName), [store, props.getForm, props.formName])

  return <ComponentTree data={[store.form.componentTree]}/>
}

export const Viewer = namedObserver('Viewer', RawViewer)
