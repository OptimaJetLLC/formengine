import {observer} from "mobx-react";
import {useComponentData} from "../../../../utils/contexts/ComponenDataContext";
import {DropZone} from "./components/DropZone";
import {useDnd} from "./hooks/useDnd";
import {useSelection} from "./hooks/useSelection";
import {Toolbar} from "./components/Toolbar";
import {Resizers} from "./components/Resizers";
import {useInnerDropZone} from "./hooks/useInnerDropZone";
import {WrapperProps} from "../../../../utils/types";

//TODO По двойному клику выделять компонент, в который вложен компонент?
//TODO Повесить плашку над элементом, за которую можно будет дергать и которая предотвращает взаимодействие с инпутами??
export const Editable = observer(({View, viewProps}: WrapperProps) => {
    const {componentStore} = useComponentData()
    const [{isActive, style}, dnd] = useDnd()
    const [{hovered, selected}, selectionHandlers, className] = useSelection()

    useInnerDropZone(viewProps)

    return (
        <div
            ref={dnd}
            className={className}
            style={{
                ...style,
                position: "relative",
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

