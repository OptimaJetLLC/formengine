import styled from '@emotion/styled'
import type {ActionData} from '@react-form-builder/core'
import {KeySymbol, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {List} from 'rsuite'
import {listItemStyle, listStyle} from '../../../../components/Containers'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {ActionItem} from './ActionItem'

interface ActionListItemProps {
  index: number,
  data: ActionData,
  onRemove: (index: number) => ActionData[] | undefined
}

function ActionListItem({data, index, onRemove}: ActionListItemProps) {
  const handleRemove = useCallback(() => onRemove(index), [index, onRemove])

  return <SListItem index={index}>
    <ActionItem data={data} onRemove={handleRemove}/>
  </SListItem>
}

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
      <ActionListItem key={action[KeySymbol]} index={index} data={action} onRemove={onRemove}/>
    ))}
  </SList>
}

export const ActionList = namedObserver('ActionList', RawActionList)

interface MovedInfo {
  newIndex: number
  oldIndex: number
}

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
