import React, {Component, createRef, ReactElement, ReactNode, RefObject} from "react";
import styled from '@emotion/styled';
import {Draggable, DraggableProvided, Droppable, DroppableProvided} from "react-beautiful-dnd";
import {observer} from "mobx-react";
import ControlBar from './ControlBar';
import Selection from './Selection'
import Resizer from './Resizer';
import {ComponentStore} from "../../stores/ComponentStore";
import {Box} from "../../components/UI/Containers";
import {useStore} from "../../utils/StoreContext";
import {Store} from "../../stores/Store";
import {ComponentDefinition} from "../../features/annotation/types";
import _ from "lodash";

interface BuilderWrapperProps {
    componentStore: ComponentStore,
    children: ReactElement
    store: Store
}

interface BuilderWrapperState {
    hovered?: boolean,
}

//TODO вынести функционал DnD в features
const BuilderWrapper = observer(
    class BuilderWrapper extends Component<BuilderWrapperProps, BuilderWrapperState> {
        containerRef: RefObject<HTMLDivElement> = createRef();
        componentDefinition: ComponentDefinition<any>

        //TODO сейчас неоптимальный поиск по аннотациям каждый раз. Не учитвает возможность нескольких свойств контейнеров
        get isCombine(): boolean {
            return Boolean(_.find(this.componentDefinition.annotations, {isContainer: true}))
                && !this.props.componentStore.children?.length
        }

        constructor(props: BuilderWrapperProps) {
            super(props);

            this.componentDefinition = props.store.view.get(props.componentStore.type);

            this.state = {};
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
            //const isCombine = isCombineEnabled(componentStore, this.props.store);

            return (
                <Droppable droppableId={key} isCombineEnabled={this.isCombine}
                           isDropDisabled={!this.isCombine && !!this.props.componentStore?.children}
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
                                                this.containerRef = ref;
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
                                                {this.isCombine
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
