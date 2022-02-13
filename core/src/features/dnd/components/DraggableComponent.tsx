import {ComponentDefinition} from "../../annotation/types";
import {observer} from "mobx-react";
import {useStore} from "../../../utils/StoreContext";
import {useDefaultProps} from "../../../components/Component/hooks/useDefaultProps";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemType} from "../consts";
import {DragItem, NodeData} from "./DropZone";
import React from "react";
import {css} from "@emotion/css";
import styled from "@emotion/styled";
import {useComponentData} from "../../../utils/ComponenDataContext";

//TODO Dragabble часть оставить здесь, а остальное вынести обратно в компонент бар
export const DraggableComponent = observer(() => {
    const data = useComponentData()
    const View = data.definition.view
    const defaultProps = useDefaultProps()
    const [{isDragging, style}, drag] = useDrag(() => ({
        type: ItemType.AddedComponent,
        item: data,
        collect: (monitor: DragSourceMonitor<NodeData, unknown>) => ({
            isDragging: monitor.isDragging(),
            style: {
                outline: monitor.isDragging() ? '2px solid #1262E2' : 'none',
                boxShadow: monitor.isDragging() ? '#00000038' : 'none'
            }
        }),
    }), []);

    return <div className={ControlItemStyle} ref={drag}>
        {data.definition.name}
        <ControlContainer>
            <View {...defaultProps} style={style}/>
        </ControlContainer>
    </div>
})
const ControlItemStyle = css`
  color: white;
  cursor: grab;
  margin: 7px 5px;
  min-width: 180px;
  max-width: 180px;
  height: 100px;
  font-size: 14px;
  display: flex;
  flex-direction: column;
`
const ControlContainer = styled.div`
  padding: 8px;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-radius: 7px;
  background-color: rgb(255 255 255 / 21%);

  &:hover {
    outline: 2px solid #1262e2;
  }
`