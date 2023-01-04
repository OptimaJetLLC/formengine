import styled from '@emotion/styled'
import {observer} from 'mobx-react'
import React from 'react'
import {useComponentData} from '../../../utils/contexts/ComponenDataContext'
import {getDefaultProps} from '../../../utils/getDefaultProps'
import {ItemType} from '../consts'
import {DragPreview} from './Editable/components/DragPreview'
import {useDragWithPreview} from './Editable/hooks/useDragWithPreview'

export const AddedComponent = observer(() => {
  const data = useComponentData()
  const View = data.model.view
  const [{isDragging}, drag] = useDragWithPreview(ItemType.AddedComponent)

  const element = <Container>
    {data.model.customPreview ?? <View {...getDefaultProps(data)}/>}
  </Container>

  return (isDragging
      ? <DragPreview>{element}</DragPreview>
      : <DraggableContainer ref={drag}>
        <Label>{data.model.name}</Label>
        {element}
      </DraggableContainer>
  )
})

const Label = styled.div`
  opacity: 0.6;
`

const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 7px;
`

const DraggableContainer = styled.div`
  color: white;
  cursor: grab;
  margin-block: 10px;
  padding-right: 5px;
  min-width: 100%;
  line-height: 20px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`
