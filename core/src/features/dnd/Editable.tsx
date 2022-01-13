import React, {ReactElement} from "react";
import {observer} from "mobx-react";
import {useComponentStore} from "../../utils/ComponentStoreContext";
import {Draggable, DraggableProvided, Droppable, DroppableProvided} from "react-beautiful-dnd";
import Selection from "./old/components/Selection";
import Resizer from "./old/components/Resizer";
import ControlBar from "./old/components/ControlBar";
import {Box} from "../../components/UI/Containers";
import {useStore} from "../../utils/StoreContext";
import _ from "lodash";

interface EditableProps {
    child: ReactElement
}

export const Editable = observer(({child}: EditableProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const componentDefinition = store.view.get(componentStore.type)

    const isCombine = Boolean(_.find(componentDefinition.annotations, {isContainer: true}))
        && !componentStore.children?.length


    const isSelected = store.currentNode?.data.key === componentStore.key;


    const setSelected = () => {
        store.currentNode = store.findNode(componentStore.key);
    }

    const onMouseOver = (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        //const {isDragging, isResizing, isMoving} = this.props.store.dnd;
        /*this.setState({
            hovered: !(isDragging && isResizing && isMoving)
        })*/
    }

    const onMouseLeave = () => {
        //this.setState({hovered: false});
    }

    return (
        <Droppable
            droppableId={componentStore.key}
            //isCombineEnabled={isCombine}
            isDropDisabled={!isCombine && !!componentStore.children}
        >
            {(provider: DroppableProvided, dropSnap) => {
                return (
                    <div
                        ref={provider.innerRef}
                        style={dropSnap.isDraggingOver ? {
                            backgroundColor: '#3498FF26',
                            outline: "2px dashed #3498ff",
                            padding: 8,
                        } : undefined}
                        {...provider.droppableProps}
                    >

                        <Draggable
                            key={componentStore.key}
                            draggableId={componentStore.key}
                            index={0}
                            isDragDisabled={
                                store.dnd.isResizing || (componentStore.type === "DropZone")}>
                            {(provided: DraggableProvided, snapshot) => {

                                //if (snapshot.isDragging) store.dnd.draggingElementKey = componentStore.key;
                                return (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        //style={{width:"auto", height:"auto"}}
                                    >
                                        {/*<Selection onMouseDown={setSelected}
                                                   onMouseOver={onMouseOver}
                                                   onMouseLeave={onMouseLeave}
                                            //hovered={hovered}
                                                   selected={isSelected}
                                        />*/}
                                        {(isSelected && !snapshot.isDragging) && <>
                                            {Resizer("left")}
                                            {Resizer("top")}
                                            {Resizer("right")}
                                            {Resizer("bottom")}
                                            {/*<ControlBar referenceElement={this.containerRef}
                                                        elementKey={this.props?.componentStore?.key}/>*/}
                                        </>}
                                        {isCombine
                                            ? <Box p={30}>DROP HERE</Box>
                                            : React.cloneElement(child, {
                                                style: {
                                                    boxShadow: snapshot.isDragging ? '#00000038' : 'none'
                                                }
                                            })
                                        }
                                    </div>
                                )
                            }}
                        </Draggable>
                        {provider.placeholder}
                    </div>
                )
            }}
        </Droppable>
    )
})