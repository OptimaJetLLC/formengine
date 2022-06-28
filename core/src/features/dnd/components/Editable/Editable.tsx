import {observer} from "mobx-react";
import {useSelection} from "./hooks/useSelection";
import {Toolbar} from "./components/Toolbar";
import {Resizers} from "./components/Resizers";
import {useInnerDropZone} from "./hooks/useInnerDropZone";
import {WrapperProps} from "../../../../utils/types";
import {Draggable} from "./components/Draggable";
import {cx} from "@emotion/css";

//TODO По двойному клику выделять компонент, в который вложен компонент?
export const Editable = observer(({View, viewProps}: WrapperProps) => {
    const [{selected}, selectionHandlers, selectionClassName] = useSelection();
    useInnerDropZone(viewProps);
    const completeView = <View {...viewProps}/>;
    return (
        <Draggable className={cx(selectionClassName, viewProps.className)} {...selectionHandlers}
                   viewForDragPreview={completeView}>
            {completeView}
            {selected && <Toolbar/>}
            <Resizers show={selected}/>
        </Draggable>
    )
})
