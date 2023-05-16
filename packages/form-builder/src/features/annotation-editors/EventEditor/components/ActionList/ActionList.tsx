import {useComponentData} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {useAnnotation} from '../../../../../utils/EditorContext'
import {Rows} from '../../../../components/Containers'
import {ActionItem} from './ActionItem'

export const ActionList = observer(() => {
  const eventName = useAnnotation().annotation.key
  const actions = useComponentData().store.events?.[eventName]

  if (!actions) return null

  /*TODO Draggable List*/
  return <Rows>
    {actions.map((action, index) => (
      <ActionItem key={action.name} eventName={eventName} index={index} data={action}/>)
    )}
  </Rows>
})

