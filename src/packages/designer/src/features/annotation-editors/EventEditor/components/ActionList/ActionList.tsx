import styled from '@emotion/styled'
import type {ActionData} from '@react-form-builder/core'
import {KeySymbol, namedObserver} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import {List} from 'rsuite'
import {listItemStyle, listStyle} from '../../../../components/Containers'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {ActionItem} from './ActionItem'
import {EventHandlerItemProvider} from './ActionItem/contexts/EventHandlerItemContext'

const SList = styled(List)`
  ${listStyle}
  && {
    box-shadow: none;
  }
`

const SListItem = styled(List.Item)`
  ${listItemStyle}
  && {
    overflow: hidden;
    padding: 0;
    box-shadow: none;
    flex-direction: column;
    align-items: initial;
  }

  &.rs-list-item-helper {
    outline: 2px solid var(--rs-btn-primary-bg);
  }
`

interface ActionListItemProps {
  index: number,
  action: ActionData,
  onRemove: (index: number) => ActionData[] | undefined,
  eventName: string
}

const RawActionListItem = ({action, index, onRemove, eventName}: ActionListItemProps) => {
  const handleRemove = useCallback(() => onRemove(index), [index, onRemove])
  const value = useMemo(() => ({
    index, eventName
  }), [eventName, index])

  const dataTestId = `bound-action-${eventName}-${action.type}-${action.name}`

  return <EventHandlerItemProvider value={value}>
    <SListItem index={index} data-testid={dataTestId}>
      <ActionItem action={action} onRemove={handleRemove} eventName={eventName}/>
    </SListItem>
  </EventHandlerItemProvider>
}

const ActionListItem = namedObserver('ActionListItem', RawActionListItem)

const RawActionList = (props: AnnotationEditorProps) => {
  const eventName = props.annotation.key
  const actions = props.componentData.store.events?.[eventName]

  const onRemove = useCallback((index: number) => actions?.splice(index, 1), [actions])

  const handleSortEnd = useCallback((info?: MovedInfo) => {
    if (!actions || !(info?.oldIndex || info?.newIndex)) return

    const movingElement = actions[info.oldIndex]
    actions.splice(info.oldIndex, 1)
    actions.splice(info.newIndex, 0, movingElement)
  }, [actions])

  if (!actions?.length) return null

  return <SList sortable onSort={handleSortEnd}>
    {actions.map((action, index) => (
      <ActionListItem key={action[KeySymbol]} index={index} action={action} onRemove={onRemove} eventName={eventName}/>
    ))}
  </SList>
}

export const ActionList = namedObserver('ActionList', RawActionList)

interface MovedInfo {
  newIndex: number
  oldIndex: number
}
