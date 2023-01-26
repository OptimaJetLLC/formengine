import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useEventBus} from '../../../utils/contexts/EventBusContext'
import {useStore} from '../../../utils/contexts/StoreContext'
import {ComponentNode} from '../../ui/ComponentNode'
import {ComponentTree} from '../../ui/ComponentTree'
import {ViewerProps} from './ViewerProps'

const _Viewer = ({event}: ViewerProps) => {
  const store = useStore()
  const eventBus = useEventBus()
  const {getForm, data, view, actions} = store.props

  useEffect(() => {
    if (actions) store.actions.push(...actions)
    event?.(eventBus)
  }, [])

  useEffect(() => {
    if (getForm) store.screen = getForm()
  }, [getForm])


  return <ComponentTree data={[store.screen]} component={ComponentNode}/>
}

export const Viewer = observer(_Viewer)
