import styled from '@emotion/styled'
import {useComponentData} from 'fb-core'
import {observer} from 'mobx-react'
import {ReactNode} from 'react'
import {useMeta} from '../../../utils/useMeta'
import {DraggableProps} from '../../ui/ComponentBar'
import {ItemType} from '../consts'
import {DragPreview} from './Editable/components/DragPreview'
import {useDragWithPreview} from './Editable/hooks/useDragWithPreview'

export const AddedComponent = observer(({draggable = true, onAdd}: DraggableProps) => {
  const data = useComponentData()
  const meta = useMeta()
  const View = data.model.view

  const element = (
    <Container onClick={() => onAdd?.(data)}>
      <Label>{data.model.name}</Label>
      {meta.customPreview ?? <View {...data.model.defaultProps}/>}
    </Container>
  )

  return (draggable
      ? <Draggable>{element}</Draggable>
      : element
  )
})


const Draggable = ({children}: { children: ReactNode }) => {
  const [{isDragging}, drag] = useDragWithPreview(ItemType.AddedComponent)

  return (isDragging
      ? <DragPreview>{children}</DragPreview>
      : <DraggableContainer ref={drag}>
        {children}
      </DraggableContainer>
  )
}

const Label = styled.div`
  opacity: 0.6;
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  min-width: 249px;
  max-width: 249px;
  border-radius: 7px;
  background-color: var(--rs-input-bg);

  &:hover {
    box-shadow: var(--rs-state-focus-shadow);
  }

  &:active, &:focus {
    outline: 2px solid var(--rs-btn-primary-bg);
  }
`

const DraggableContainer = styled.div`
  cursor: grab;
  min-width: 100%;
  line-height: 20px;
  font-size: 14px;
`
