import {useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {useAnnotation} from '../../../../../utils/EditorContext'
import {Rows} from '../../../../ui/common/Containers'
import {ActionItem} from './ActionItem'

export const ActionList = observer(() => {
  const eventName = useAnnotation().annotation.key
  const actions = useComponentData().componentStore.events?.[eventName]

  if (!actions) return null

  /*TODO Draggable List*/
  return <Rows my={0}>
    {actions.map((action, index) => (
      <ActionItem key={action.name} eventName={eventName} index={index} data={action}/>)
    )}
  </Rows>
})

