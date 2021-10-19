import React from "react";
import {Node} from "../../utils/Node";
import styled from '@emotion/styled';
import { Draggable, Droppable } from "react-beautiful-dnd";
import {store} from "../../stores/Store";
import { observer } from "mobx-react";
import ControlBar from './ControlBar';
import Selection from './Selection'
import Resizer from './Resizer';

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

    isSelected = () => {
        return store.currentNode?.data?.key == this.props?.node?.key;
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
        
        return (
            <Droppable droppableId={key} isDropDisabled={!!this.props?.node?.children} direction={!!this.props?.node?.children ? 'horizontal' : 'vertical'}>
                {(cp: any, dd: any) => (
                    <div ref={cp.innerRef}>
                        <Draggable key={key}  draggableId={key} index={0}>
                            {(provided: any, snapshot: any) => (
                                    <Container ref={(ref: any) => {
                                            provided.innerRef(ref);
                                            this.containerRef.current = ref;
                                        }}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}>
                                        <Selection onClick={this.setSelected}
                                            onMouseOver={this.onMouseOver} onMouseLeave={this.onMouseLeave}
                                            hovered={hovered} selected={selected}/>
                                        {selected && <>
                                            {Resizer("left")}
                                            {Resizer("top")}
                                            {Resizer("right")}
                                            {Resizer("bottom")}
                                            <ControlBar referenceElement={this.containerRef} content={this.props?.node?.key}/>
                                        </>}
                                        {children}
                                    </Container>
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
