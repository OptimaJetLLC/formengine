import styled from '@emotion/styled'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import {camelCase, replace, upperFirst} from 'lodash-es'
import {MouseEventHandler, ReactNode} from 'react'
import {icons} from '../../../icons'
import {DraggableProps} from '../../ui/ComponentBar'
import {ItemType} from '../consts'
import {DragPreview} from './Editable/components/DragPreview'
import {useDragWithPreview} from './Editable/hooks/useDragWithPreview'

export const AddedComponent = namedObserver('AddedComponent', ({draggable = true, onAdd}: DraggableProps) => {
  const data = useComponentData()
  const {name = '', icon: CustomIcon} = data.model
  const iconName = replace(upperFirst(camelCase(name)), ' ', '') as keyof typeof icons
  const Icon = CustomIcon ?? icons[iconName] ?? icons.Default
  const onClick: MouseEventHandler = e => {
    e.stopPropagation()
    onAdd?.(data)
  }
  const element = (
    <Container onClick={onClick}>
      <Icon width={18} height={18} viewBox="0 0 24 24"/>
      <label>{name}</label>
    </Container>
  )

  return draggable
    ? <Draggable>{element}</Draggable>
    : element
})


const Draggable = ({children}: { children: ReactNode }) => {
  const [{isDragging}, drag] = useDragWithPreview(ItemType.AddedComponent)

  return <>
    <DraggableContainer ref={drag}>{children}</DraggableContainer>
    {isDragging && <DragPreview>{children}</DragPreview>}
  </>
}

const Container = styled.div`
  display: flex;
  padding: 7px;
  gap: 6px;
  min-width: 150px;
  flex: 1;
  max-width: 125px;
  border-radius: 6px;
  background-color: var(--rs-btn-default-bg);
  font-size: 13px;

  &:hover {
    box-shadow: var(--rs-state-focus-shadow);
  }

  &:active, &:focus {
    outline: 2px solid var(--rs-btn-primary-bg);
  }

  .rs-theme-dark & label {
    opacity: 0.6;
  }
`

const DraggableContainer = styled.div`
  cursor: grab;
  flex: 1;

  & > div {
    height: 100%;
    min-width: 123px;
    max-width: initial;
  }
`
