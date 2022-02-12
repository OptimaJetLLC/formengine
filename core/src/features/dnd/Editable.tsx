import React, {ComponentType, ReactElement, useRef} from "react";
import {observer} from "mobx-react";
import {useComponentData} from "../../utils/ComponenDataContext";
import {useStore} from "../../utils/StoreContext";
import {DropZone, useNodeData} from "./components/DropZone";
import {useDnd} from "./hooks/useDnd";
import {useSelection} from "./hooks/useSelection";
import {Toolbar} from "./components/Toolbar";
import {Resizers} from "./components/Resizers/Resizers";

interface EditableProps {
    child: ReactElement
}
//TODO z-Index увеличивать его для вложенных компонентов, чтобы выор компонентов был корректным
//TODO По двойному клику выделять компонент, в который вложен компонент
//TODO Повесить плашку над элементом, за которую можно будет дергать и которая предотвращает взаимодействие с инпутами??

//TODO Drop зоны в компонентах с биндингом к родителю - контейнерное свойство
//TODO Зона в контейнерах, если отсутствуют элементы
//TODO Видимая заглушка в контейнерах без детей
export const Editable = observer(({child}: EditableProps) => {
    const {componentStore, definition} = useNodeData()
    const [{isActive, style}, dnd] = useDnd()
    const [{hovered, selected}, selectionHandlers, className] = useSelection()

    const containers = definition.annotations.filter(value => value.isContainer);

    if (componentStore.type === "Screen")
        return child


    return (
        <div
            className={className}
            ref={dnd}
            style={{
                ...style,
                position: "relative"
            }}
            {...selectionHandlers}
        >
            <Toolbar show={selected} parent={dnd.current}/>
            <Resizers show={selected}/>

            {isActive && <DropZone isBefore={true}/>}
            {child}
            {isActive && <DropZone isBefore={false}/>}
        </div>
    )
})



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