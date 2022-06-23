import {observer} from "mobx-react";
import {useDefaultProps} from "../../../components/Component/hooks/useDefaultProps";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemType} from "../consts";
import {css, cx} from "@emotion/css";
import styled from "@emotion/styled";
import {useComponentData} from "../../../utils/contexts/ComponenDataContext";
import {ComponentMove} from "../../../utils/types";
import {useEffect} from "react";
import {getEmptyImage} from "react-dnd-html5-backend";
import {createPortal} from "react-dom";

interface AddedComponentProps {
}

const getDragPreview = () => document.getElementById("fb-drag-preview") || document.body;

export const AddedComponent = observer((props: AddedComponentProps) => {
    const data = useComponentData()
    const View = data.definition.view
    const defaultProps = useDefaultProps()

    const [{isDragging, style}, drag, preview] = useDrag(() => ({
        type: ItemType.AddedComponent,
        item: data,
        collect: (monitor: DragSourceMonitor<ComponentMove, unknown>) => ({
            isDragging: monitor.isDragging(),
            style: {}
        }),
    }), []);


    useEffect(() => {
        preview(getEmptyImage())
    }, [isDragging])
    const element = <ControlContainer>
        <View {...defaultProps} style={style}/>
    </ControlContainer>

    return (isDragging
            ? createPortal(element, getDragPreview())
            : <div className={cx(draggableComponent)} ref={drag}>
                <Label>{data.definition.name}</Label>
                {element}
            </div>
    )
})

const draggableComponent = css`
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


const Label = styled.div`
  opacity: 0.6;
`

const ControlContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  border-radius: 7px;
`
