import {useEffect} from 'react'
import {namedObserver} from '../../../utils'
import {useStore} from '../../../utils/contexts/StoreContext'
import {useAutoViewMode} from '../../../utils/useAutoViewMode'
import {EventStream} from '../../event/utils/EventStream'
import {ComponentTree} from '../../ui/ComponentTree'

export interface ViewerProps {
  event?: (stream: EventStream) => void
}

export const Viewer = namedObserver('Viewer', ({event}: ViewerProps) => {
  const store = useStore()
  const {actions} = store.props

  useEffect(() => {
    if (actions) store.actions.push(...actions)
    event?.(new EventStream(store.eventSubject))
  }, [])

  useAutoViewMode()

  useEffect(() => store.loadForm(), [store])

  return <ComponentTree data={[store.screen]}/>
})
