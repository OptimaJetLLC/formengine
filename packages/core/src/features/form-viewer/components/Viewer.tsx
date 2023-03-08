import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useStore} from '../../../utils/contexts/StoreContext'
import {EventStream} from '../../event/utils/EventStream'
import {ComponentTreeItem} from '../../ui/ComponentTreeItem'
import {ComponentTree} from '../../ui/ComponentTree'
import {ViewerProps} from './ViewerProps'

const _Viewer = ({event}: ViewerProps) => {
  const store = useStore()
  const {getForm, actions} = store.props

  useEffect(() => {
    if (actions) store.actions.push(...actions)
    event?.(new EventStream(store.eventSubject))
  }, [])

  useEffect(() => {
    if (getForm) store.screen = getForm()
  }, [getForm])

  return <ComponentTree data={[store.screen]} treeItem={ComponentTreeItem}/>
}

export const Viewer = observer(_Viewer)
