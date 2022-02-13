import React, {ComponentType, ReactElement, useRef} from "react";
import {observer} from "mobx-react";
import {useComponentData} from "../../utils/ComponenDataContext";
import {useStore} from "../../utils/StoreContext";
import {DropZone} from "./components/DropZone";
import {useDnd} from "./hooks/useDnd";
import {useSelection} from "./hooks/useSelection";
import {Toolbar} from "./components/Toolbar";
import {Resizers} from "./components/Resizers/Resizers";

export interface EditableProps {
    View: ComponentType<any>
    componentProps: Record<string, any>
}
//TODO z-Index увеличивать его для вложенных компонентов, чтобы выор компонентов был корректным
//TODO По двойному клику выделять компонент, в который вложен компонент
//TODO Повесить плашку над элементом, за которую можно будет дергать и которая предотвращает взаимодействие с инпутами??

//TODO Drop зоны в компонентах с биндингом к родителю - контейнерное свойство
//TODO Зона в контейнерах, если отсутствуют элементы
//TODO Видимая заглушка в контейнерах без детей
export const Editable = observer(({View, componentProps}: EditableProps) => {
    const {componentStore, definition} = useComponentData()
    const [{isActive, style}, dnd] = useDnd()
    const [{hovered, selected}, selectionHandlers, className] = useSelection()

    const containers = definition.annotations.filter(value => value.isContainer);

    if (componentStore.type === "Screen")
        return <View {...componentProps}/>


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
            <View {...componentProps}/>
            {isActive && <DropZone isBefore={false}/>}
        </div>
    )
})

