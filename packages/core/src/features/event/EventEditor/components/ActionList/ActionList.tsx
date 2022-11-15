import {observer} from 'mobx-react'
import {useComponentData} from '../../../../../utils/contexts/ComponenDataContext'
import {Rows} from '../../../../ui/Containers'
import {ActionItem} from './ActionItem'

interface ActionListProps {
  eventName: string
}

export const ActionList = observer(({eventName}: ActionListProps) => {
  const {componentStore} = useComponentData()
  const weakActionsData = componentStore.events?.[eventName]

  if (!weakActionsData) return null

  /*TODO Draggable List*/
  return <Rows my={0}>
    {weakActionsData.map((data, index) =>
      <ActionItem
        key={data.actionName}
        eventName={eventName}
        index={index}
        weakData={data}
        componentStore={componentStore}
      />)}
  </Rows>
})

