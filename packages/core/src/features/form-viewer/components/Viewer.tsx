import {assign} from 'lodash-es'
import {useEffect} from 'react'
import {ComponentStore} from '../../../stores/ComponentStore'
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
    if (getForm) {
      const form = getForm()
      if (typeof (form as Promise<ComponentStore>).then === 'function') {
        (form as Promise<ComponentStore>).then(result => {
          store.screen = assign(new ComponentStore('', ''), result)
        })
      } else {
        store.screen = assign(new ComponentStore('', ''), form)
      }
    }
  }, [getForm])

  return <ComponentTree data={[store.screen]}/>
})
