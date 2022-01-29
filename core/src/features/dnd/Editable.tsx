import React, {ComponentType, CSSProperties, ReactElement, useRef} from "react";
import {observer} from "mobx-react";
import {useComponentStore} from "../../utils/ComponentStoreContext";
import {useStore} from "../../utils/StoreContext";
import {DropZone1} from "./components/DropZone";
import {useDnd} from "./hooks/useDnd";
import {useSelection} from "./hooks/useSelection";
import {css} from "@emotion/css";
import classNames from "classnames";

interface EditableProps {
    child: ReactElement
}

const style: CSSProperties = {
    border: "1px dashed black",
    padding: "0.5rem 1rem",
    backgroundColor: "white",
    cursor: "move"
};

//TODO Selection
//TODO Resizer
//TODO ControlBar

export const Editable = observer(({child}: EditableProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const componentDefinition = useComponentDefinition()
    const [{isActive, opacity, padding}, dnd] = useDnd()
    const [{hovered, selected}, selectionHandlers] = useSelection()

    const containers = componentDefinition.annotations.filter(value => value.isContainer)

    if (componentStore.type === "Screen")
        return child

    const hoveredStyles = css`
      outline: 2px dashed #3498ff !important;
      cursor: pointer !important;
    `

    const selectedStyles = css`
      outline: 2px solid #3498ff !important;
      cursor: move !important;
    `

    const className = classNames({
        [hoveredStyles]: hovered && !selected,
        [selectedStyles]: selected,
    })

    return (
        <>
            <div
                className={className}
                ref={dnd}
                style={{opacity, padding}}
                {...selectionHandlers}
            >
                {isActive && <DropZone1 index={0}/>}
                {child}
                {isActive && <DropZone1 index={1}/>}
            </div>
        </>
    )
})

const useCommonData = () => {

}

//TODO этот хук правда нужен?
const useComponentDefinition = () => {
    const store = useStore()
    const componentStore = useComponentStore()
    const componentDefinition = useRef(store.view.get(componentStore.type))

    return componentDefinition.current
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