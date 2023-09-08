import styled from '@emotion/styled'
import {KeySymbol} from '@react-form-builder/core'
import {observer} from 'mobx-react'
import {List} from 'rsuite'
import type {AnnotationEditorProps} from '../../../AnnotationEditorProps'
import {ActionItem} from './ActionItem'

export const ActionList = observer((props: AnnotationEditorProps) => {
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
  && {
    display: flex;
    flex: 1;
    flex-direction: column;
    gap: 5px;
    box-shadow: none;
  }
`

const SListItem = styled(List.Item)`
  && {
    position: relative;
    overflow: hidden;
    background-color: var(--rs-btn-default-bg);
    border-radius: 10px;
    padding: 0;
    box-shadow: none;
  }

  &.rs-list-item-helper {
    border: 2px solid var(--rs-btn-primary-bg);
  }
`
