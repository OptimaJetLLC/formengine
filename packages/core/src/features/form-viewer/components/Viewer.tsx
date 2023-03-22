import {useEffect} from 'react'
import {namedObserver} from '../../../utils'
import {useStore} from '../../../utils/contexts/StoreContext'
import {EventStream} from '../../event/utils/EventStream'
import {ComponentTree} from '../../ui/ComponentTree'

export interface ViewerProps {
  event?: (stream: EventStream) => void
}

export const Viewer = namedObserver('Viewer', ({event}: ViewerProps) => {
  const store = useStore()
  const {getForm, actions} = store.props

  useEffect(() => {
    if (actions) store.actions.push(...actions)
    event?.(new EventStream(store.eventSubject))
  }, [])

  useEffect(() => {
    if (getForm) store.screen = getForm()
  }, [getForm])

  return <ComponentTree data={[store.screen]}/>
})
