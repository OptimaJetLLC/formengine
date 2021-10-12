import React from "react";
import {Node} from "../../utils/Node";
import styled from '@emotion/styled';
import { Draggable, Droppable } from "react-beautiful-dnd";
import {store} from "../../stores/Store";
import { observer } from "mobx-react";
import ControlBar from './ControlBar';
import Selection from './Selection'

interface BuilderWrapperProps {
    node: Node,
    children: any
}

interface BuilderWrapperState {
    containerRef: any,
    hovered?: boolean,
}

const BuilderWrapper = observer(
    class BuilderWrapper extends React.Component<BuilderWrapperProps, BuilderWrapperState > {
    containerRef: any = React.createRef();
    constructor(props: BuilderWrapperProps) {
        super(props);
        this.state = {
            containerRef:  React.createRef()
        };
    }

    // renderSelection = () => {
    //     const selectionClassName = baseClassName
    //         + " formbuilder-item-toolbar-container selection"
    //         + (dragging ? "" : ((selected ? " selected" : "") + (hovered ? " hovered" : "")))

    //     return (
    //         <div ref={options.me.selectionRef}
    //             style={{...stylePinned(10)}}  tabIndex="0"
    //             className={selectionClassName}
    //             onClick={onClick}
    //             onKeyDown ={onKeyDown }
    //             {...dragProps}
    //         />
    //     )
    // };

    isSelected = () => {
        return store.currentNode?.key == this.props?.node?.key;
    }

    setSelected = () => {
        store.currentNode = this.props?.node;
    }

    onMouseOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const { isDragging, isResizing, isMoving } = store;
        this.setState({
            hovered: true && !(isDragging && isResizing && isMoving)
        })
        store.add("ff")
    }

    onMouseLeave = (e: any) => {
        this.setState({ hovered: false });
    }

    render() {
        const { children } = this.props;
        const { hovered} = this.state;
        const selected = this.isSelected();
        const {key} = this.props?.node;
        const k = store.currentNode?.key == this.props?.node?.key;
        return (
            <Droppable droppableId={key} isDropDisabled={!!this.props?.node?.children}>
                {(cp: any, dd: any) => (
                    <div ref={cp.innerRef}>
                        <Draggable key={key} draggableId={key} index={0}>
                            {(provided: any, snapshot: any) => (
                                <div ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}>
                                    <Container ref={this.containerRef}>
                                        <Selection onClick={this.setSelected}
                                            onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
                                            hovered={hovered} selected={selected}/>
                                        {selected && <ControlBar referenceElement={this.containerRef} content={this.props?.node?.key}/>}
                                        {children}
                                    </Container>
                                </div>
                            )}
                        </Draggable>
                        {cp.placeholder}
                    </div>
                )}
            </Droppable>
        )
    }
})

const Container = styled.div`
    position: relative;
`

const wrapperHoc = (props: BuilderWrapperProps) => <BuilderWrapper {...props}/>

export default wrapperHoc;
