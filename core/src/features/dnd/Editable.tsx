import _ from "lodash";
import React, {cloneElement, ComponentType, createElement, CSSProperties, ReactElement, useRef} from "react";
import {observer} from "mobx-react";
import {useComponentStore} from "../../utils/ComponentStoreContext";
import {Draggable, DraggableProvided, Droppable, DroppableProvided, DropResult} from "react-beautiful-dnd";
import Selection from "./old/components/Selection";
import Resizer from "./old/components/Resizer";
import ControlBar from "./old/components/ControlBar";
import {Box} from "../../components/UI/Containers";
import {useStore} from "../../utils/StoreContext";
import {Containerized} from "./components/Containerized";
import {DragSourceMonitor, useDrag, useDrop} from "react-dnd";
import {DragItem, DropZone, DropZone1} from "./components/DropZone";
import {useDnd} from "./hooks/useDnd";

interface EditableProps {
    child: ReactElement
}

const style: CSSProperties = {
    border: "1px dashed black",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    cursor: "move"
};


export const Editable = ({child}: EditableProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const componentDefinition = store.view.get(componentStore.type)

    const [{isActive, opacity, padding}, dnd] = useDnd()

    const containers = componentDefinition.annotations.filter(value => value.isContainer)

    if (componentStore.type === "Screen")
        return child

    return (
        <>
            <div ref={dnd} style={{opacity, padding}}>
                {isActive && <DropZone1 index={0}/>}
                {child}
                {isActive && <DropZone1 index={1}/>}
            </div>
        </>
    )
}

/*export const Editable = observer(({child}: EditableProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const componentDefinition = store.view.get(componentStore.type)

    const containers = componentDefinition.annotations.filter(value => value.isContainer)

    let element = child

    if (containers.length) {
         let wrappedChildren = createElement(Containerized, {key: componentStore.key, children: child.props.children})
        element = cloneElement(child, {children: wrappedChildren})
    }

    if (componentStore.type === "Screen")
        return element


    /!*if (child.props.content) {
        //child.props.content = child.props.content = "Asdasd"
        return cloneElement(child, {content: child.props.content + "Asdasdsa"})
    }*!/

    return (
        <Draggable
            key={componentStore.key}
            draggableId={componentStore.key}
            index={0}
            isDragDisabled={
                store.dnd.isResizing || (componentStore.type === "DropZone")}>
            {(provided: DraggableProvided, snapshot) =>
                (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                    >
                        {element}
                    </div>
                )}
        </Draggable>
    )
})*/


interface Interface {
    Component: ComponentType<any>
}

const AD = ({Component}: Interface) => {

    return <>
        <Component a={3}/>
    </>
}