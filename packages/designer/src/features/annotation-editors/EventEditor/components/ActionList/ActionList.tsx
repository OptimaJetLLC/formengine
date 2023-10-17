import styled from '@emotion/styled'
import {KeySymbol, namedObserver} from '@react-form-builder/core'
import {List} from 'rsuite'
import {listItemStyle, listStyle} from '../../../../components/Containers'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {ActionItem} from './ActionItem'

export const ActionList = namedObserver('ActionList', (props: AnnotationEditorProps) => {
  const eventName = props.annotation.key
  const actions = props.componentData.store.events?.[eventName]

  if (!actions) return null

  const onRemove = (index: number) => actions?.splice(index, 1)
  const handleSortEnd = (info?: MovedInfo) => {
    if (!(info?.oldIndex || info?.newIndex)) return

    const movingElement = actions[info.oldIndex]
    actions.splice(info.oldIndex, 1)
    actions.splice(info.newIndex, 0, movingElement)
  }

  return <SList sortable onSort={handleSortEnd}>
    {actions.map((action, index) => (
      <SListItem key={action[KeySymbol]} index={index}>
        <ActionItem data={action} onRemove={() => onRemove(index)}/>
      </SListItem>
    ))}
  </SList>
})

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
