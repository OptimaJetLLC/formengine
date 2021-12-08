import React from "react";
import styled from '@emotion/styled';
import {Draggable, DraggableProvided, Droppable, DroppableProvided} from "react-beautiful-dnd";
import {store} from "../../stores/Store";
import {observer} from "mobx-react";
import ControlBar from './ControlBar';
import Selection from './Selection'
import Resizer from './Resizer';
import {ComponentStore} from "../../stores/ComponentStore";
import {findNode} from "../../utils/tree";
import {Box} from "../../components/UI/Containers";
import {isCombineEnabled} from "../../features/dnd/utils";

interface BuilderWrapperProps {
    componentStore: ComponentStore,
    children: any
}

interface BuilderWrapperState {
    containerRef: any,
    hovered?: boolean,
}

//TODO вынести функционал DnD в features
const BuilderWrapper = observer(
    class BuilderWrapper extends React.Component<BuilderWrapperProps, BuilderWrapperState> {
        containerRef: any = React.createRef();

        constructor(props: BuilderWrapperProps) {
            super(props);
            this.state = {
                containerRef: React.createRef()
            };
        }

        isSelected = () => {
            return store.currentNode?.data?.key === this.props?.componentStore?.key;
        }

        setSelected = () => {
            store.currentNode = findNode(this.props?.componentStore.key);
        }

        onMouseOver = (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const {isDragging, isResizing, isMoving} = store;
            this.setState({
                hovered: !(isDragging && isResizing && isMoving)
            })
        }

        onMouseLeave = () => {
            this.setState({hovered: false});
        }

        render() {
            const {children, componentStore} = this.props;
            const {hovered} = this.state;
            const selected = this.isSelected();
            const {key} = this.props.componentStore;

            const isCombine = isCombineEnabled(componentStore);
            return (
                <Droppable droppableId={key} isCombineEnabled={isCombine}
                           isDropDisabled={!isCombine && !!this.props?.componentStore?.children}
                    //direction={!!this.props?.componentStore?.children ? 'horizontal' : 'vertical'}
                >
                    {(provider: DroppableProvided, dropSnap) => {
                        return (
                            <div ref={provider.innerRef} {...provider.droppableProps}
                                 style={
                                     ((store.draggingOverKey === key))
                                         ? {backgroundColor: "var(--highlight-color)", outline: "2px dashed #3498ff"}
                                         : {}
                                 }
                            >
                                <Draggable key={key} draggableId={key} index={0}
                                           isDragDisabled={
                                               store.isResizing || (componentStore.type === "DropZone")}>
                                    {(provided: DraggableProvided, snapshot) => {

                                        if (snapshot.isDragging) store.draggingElementKey = key;
                                        return (
                                            <Container ref={(ref: any) => {
                                                provided.innerRef(ref);
                                                this.containerRef.current = ref;
                                            }}
                                                       {...provided.draggableProps}
                                                       {...provided.dragHandleProps}
                                            >
                                                <Selection onMouseDown={this.setSelected}
                                                           onMouseOver={this.onMouseOver}
                                                           onMouseLeave={this.onMouseLeave}
                                                           hovered={hovered} selected={selected}
                                                />
                                                {(selected && !snapshot.isDragging) && <>
                                                    {Resizer("left")}
                                                    {Resizer("top")}
                                                    {Resizer("right")}
                                                    {Resizer("bottom")}
                                                    <ControlBar referenceElement={this.containerRef}
                                                                elementKey={this.props?.componentStore?.key}/>
                                                </>}
                                                {isCombineEnabled(componentStore)
                                                    ? <Box p={30}>DROP HERE</Box>
                                                    : React.cloneElement(children, {
                                                        style: {
                                                            boxShadow: snapshot.isDragging ? 'var(--dragging-shadow)' : 'none'
                                                        }
                                                    })
                                                }
                                            </Container>
                                        )
                                    }}
                                </Draggable>
                                {provider.placeholder}
                            </div>
                        )
                    }}
                </Droppable>
            )
        }
})

const Container = styled.div`
    position: relative;
`

const wrapperHoc = (props: BuilderWrapperProps) => <BuilderWrapper {...props}/>

export default wrapperHoc;
