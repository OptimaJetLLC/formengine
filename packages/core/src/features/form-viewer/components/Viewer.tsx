import {observer} from 'mobx-react'
import {useEffect} from 'react'
import {useStore} from '../../../utils/contexts/StoreContext'
import {ComponentTree} from '../../ui/ComponentTree'

export const Viewer = observer(() => {
  const store = useStore()
  const {getForm, data, view, event, actions} = store.props

  useEffect(() => {
    if (actions) store.actions.push(...actions)
    event?.(store.eventBus)
  }, [])

  useEffect(() => {
    if (getForm) store.screen = getForm()
  }, [getForm])

  useEffect(() => {
    if (data) store.form.data = data
  }, [data])

  return <ComponentTree data={[store.screen]}/>
})
