import {observer} from 'mobx-react'
import {Rows} from '../../../../components/Containers'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {ActionItem} from './ActionItem'

export const ActionList = observer((props: AnnotationEditorProps) => {
  const eventName = props.annotation.key
  const actions = props.componentData.store.events?.[eventName]

  if (!actions) return null

  /*TODO Draggable List*/
  return <Rows>
    {actions.map((action, index) => (
      <ActionItem key={action.name} eventName={eventName} index={index} data={action}/>)
    )}
  </Rows>
})

