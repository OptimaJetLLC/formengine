import {useEffect} from 'react'
import {namedObserver} from '../../../utils'
import {useStore} from '../../../utils/contexts/StoreContext'
import {useAutoViewMode} from '../../../utils/useAutoViewMode'
import {EventStream} from '../../event/utils/EventStream'
import {ComponentTree} from '../../ui/ComponentTree'
import {useViewerProps} from './ViewerPropsContext'

export interface ViewerProps {
  event?: (stream: EventStream) => void
}

export const Viewer = namedObserver('Viewer', ({event}: ViewerProps) => {
  const store = useStore()
  const props = useViewerProps()

  useEffect(() => {
    if (props.actions) store.actions.push(...props.actions)
    event?.(new EventStream(store.eventSubject))
  }, [])

  useAutoViewMode()

  useEffect(() => store.loadForm(props.getForm, props.formName), [store])

  return <ComponentTree data={[store.screen]}/>
})
