import React from "react";
import styled from '@emotion/styled';
import {Draggable, DraggableProvided, Droppable, DroppableProvided} from "react-beautiful-dnd";
import {observer} from "mobx-react";
import ControlBar from './ControlBar';
import Selection from './Selection'
import Resizer from './Resizer';
import {ComponentStore} from "../../stores/ComponentStore";
import {Box} from "../../components/UI/Containers";
import {isCombineEnabled} from "../../features/dnd/utils";
import {useStore} from "../../utils/StoreContext";
import {Store} from "../../stores/Store";

interface BuilderWrapperProps {
    componentStore: ComponentStore,
    children: any
    store: Store
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
            return this.props.store.currentNode?.data?.key === this.props?.componentStore?.key;
        }

        setSelected = () => {
            this.props.store.currentNode = this.props.store.findNode(this.props?.componentStore.key);
        }

        onMouseOver = (e: any) => {
            e.preventDefault();
            e.stopPropagation();
            const {isDragging, isResizing, isMoving} = this.props.store;
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

            const isCombine = isCombineEnabled(componentStore, this.props.store);
            return (
                <Droppable droppableId={key} isCombineEnabled={isCombine}
                           isDropDisabled={!isCombine && !!this.props?.componentStore?.children}
                    //direction={!!this.props?.componentStore?.children ? 'horizontal' : 'vertical'}
                >
                    {(provider: DroppableProvided, dropSnap) => {
                        return (
                            <div ref={provider.innerRef} {...provider.droppableProps}
                                 style={
                                     ((this.props.store.draggingOverKey === key))
                                         ? {backgroundColor: "var(--highlight-color)", outline: "2px dashed #3498ff"}
                                         : {}
                                 }
                            >
                                <Draggable key={key} draggableId={key} index={0}
                                           isDragDisabled={
                                               this.props.store.isResizing || (componentStore.type === "DropZone")}>
                                    {(provided: DraggableProvided, snapshot) => {

                                        if (snapshot.isDragging) this.props.store.draggingElementKey = key;
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
                                                {isCombine
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

const WrapperHoc = (props: BuilderWrapperProps) => {
    const store = useStore()
    return <BuilderWrapper {...props} store={store}/>;
}

export default WrapperHoc;
