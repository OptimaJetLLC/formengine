import {observer} from "mobx-react";
import {useDefaultProps} from "../../../components/Component/hooks/useDefaultProps";
import {ItemType} from "../consts";
import styled from "@emotion/styled";
import {useComponentData} from "../../../utils/contexts/ComponenDataContext";
import React from "react";
import {DragPreview} from "./Editable/components/DragPreview";
import {useDragWithPreview} from "./Editable/hooks/useDragWithPreview";

export const AddedComponent = observer(() => {
    const data = useComponentData();
    const View = data.definition.view;
    const [{isDragging}, drag] = useDragWithPreview(ItemType.AddedComponent);

    const element = <Container><View {...useDefaultProps()}/></Container>

    return (isDragging
            ? <DragPreview>{element}</DragPreview>
            : <DraggableContainer ref={drag}>
                <Label>{data.definition.name}</Label>
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
