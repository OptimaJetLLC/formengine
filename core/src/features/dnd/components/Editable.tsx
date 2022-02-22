import {observer} from "mobx-react";
import {useComponentData} from "../../../utils/ComponenDataContext";
import {DropZone} from "./DropZone";
import {useDnd} from "../hooks/useDnd";
import {useSelection} from "../hooks/useSelection";
import {Toolbar} from "./Toolbar";
import {Resizers} from "./Resizers/Resizers";
import {useInnerDropZone} from "../hooks/useInnerDropZone";
import {screen} from "../../../components/Screen";
import {WrapperProps} from "../../../utils/Types";

//TODO z-Index увеличивать его для вложенных компонентов, чтобы выор компонентов был корректным
//TODO По двойному клику выделять компонент, в который вложен компонент
//TODO Повесить плашку над элементом, за которую можно будет дергать и которая предотвращает взаимодействие с инпутами??

//TODO Drop зоны в компонентах с биндингом к родителю - контейнерное свойство
//TODO Зона в контейнерах, если отсутствуют элементы
//TODO Видимая заглушка в контейнерах без детей
export const Editable = observer(({View, viewProps}: WrapperProps) => {
    const {componentStore} = useComponentData()
    const [{isActive, style}, dnd] = useDnd()
    const [{hovered, selected}, selectionHandlers, className] = useSelection()

    useInnerDropZone(viewProps)

    if (componentStore.type === screen.name)
        return <View {...viewProps}/>


    return (
        <div
            ref={dnd}
            className={className}
            style={{
                ...style,
                position: "relative"
            }}
            {...selectionHandlers}
        >
            <Toolbar show={selected} parent={dnd.current}/>
            <Resizers show={selected}/>

            {isActive && <DropZone bindTo={componentStore.bindTo} isBefore={true}/>}
            <View {...viewProps}/>
            {isActive && <DropZone bindTo={componentStore.bindTo} isBefore={false}/>}
        </div>
    )
})

