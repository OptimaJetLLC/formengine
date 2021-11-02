import React from "react";
import {Node} from "../../utils/Node";
import styled from '@emotion/styled';
import {Draggable, DraggableProvided, Droppable, DroppableProvided} from "react-beautiful-dnd";
import {store} from "../../stores/Store";
import {observer} from "mobx-react";
import ControlBar from './ControlBar';
import Selection from './Selection'
import Resizer from './Resizer';
import {ComponentStore} from "../../stores/ComponentStore";
import {findNode} from "../../utils/tree";

interface BuilderWrapperProps {
    componentStore: ComponentStore,
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
        return store.currentNode?.data?.key == this.props?.componentStore?.key;
    }

    setSelected = () => {
        store.currentNode = findNode(this.props?.componentStore.key);
    }

    onMouseOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const { isDragging, isResizing, isMoving } = store;
        this.setState({
            hovered: !(isDragging && isResizing && isMoving)
        })
    }

        onMouseLeave = () => {
            this.setState({hovered: false});
        }

    render() {
        const { children } = this.props;
        const { hovered} = this.state;
        const selected = this.isSelected();
        const {key} = this.props.componentStore;
        
        return (
            <Droppable droppableId={key} isDropDisabled={!!this.props?.componentStore?.children} direction={!!this.props?.componentStore?.children ? 'horizontal' : 'vertical'}>
                {(provider: DroppableProvided) => (
                    <div ref={provider.innerRef} {...provider.droppableProps}>
                        <Draggable key={key} draggableId={key} index={0} isDragDisabled={store.isResizing}>
                            {(provided: DraggableProvided) => (
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
                                            <ControlBar referenceElement={this.containerRef} content={this.props?.componentStore?.key}/>
                                        </>}
                                        {children}
                                    </Container>
                            )}
                        </Draggable>
                        {provider.placeholder}
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
