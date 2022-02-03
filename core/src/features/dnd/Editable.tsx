import React, {ComponentType, CSSProperties, ReactElement, useEffect, useLayoutEffect, useRef, useState} from "react";
import {observer} from "mobx-react";
import {useComponentStore} from "../../utils/ComponentStoreContext";
import {useStore} from "../../utils/StoreContext";
import {DropZone1} from "./components/DropZone";
import {useDnd} from "./hooks/useDnd";
import {useSelection} from "./hooks/useSelection";
import {Resizable} from "re-resizable";
import {Toolbar} from "./components/Toolbar";

interface EditableProps {
    child: ReactElement
}

//TODO Resizer
//TODO ControlBar

export const Editable = observer(({child}: EditableProps) => {
    const store = useStore()
    const componentStore = useComponentStore()
    const componentDefinition = useComponentDefinition()
    const [{isActive, opacity, padding}, dnd] = useDnd()
    const [{hovered, selected}, selectionHandlers, className] = useSelection()

    const containers = componentDefinition.annotations.filter(value => value.isContainer)

    if (componentStore.type === "Screen")
        return child


    return (
        <div
            className={className + " "}
            ref={dnd}
            style={{
                opacity, padding,
            }}
            {...selectionHandlers}
        >
            <Toolbar show={selected} parent={dnd.current}/>
            {isActive && <DropZone1 index={0}/>}
            {child}
            {isActive && <DropZone1 index={1}/>}
        </div>
    )
})


function useContainerDimensions(myRef: React.RefObject<any>) {
    const [dimensions, setDimensions] = useState({width: 0, height: 0});

    useEffect(() => {
        const getDimensions = () => ({
            width: (myRef && myRef.current.offsetWidth) || 0,
            height: (myRef && myRef.current.offsetHeight) || 0,
        });

        const handleResize = () => {
            setDimensions(getDimensions());
        };

        if (myRef.current) {
            setDimensions(getDimensions());
        }

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [myRef]);

    return dimensions;
}

const useResizer1 = (selected: boolean, child: ReactElement) => {
    if (selected)
        return <Resizable
            handleComponent={{
                bottom: <span>asd</span>
            }}
        >
            {child}
        </Resizable>

    return child
}

//TODO обработка событий сдвига
//TODO добавление четырех точек? Шести? Посмотреть на референс.
const useResizer = (ref: React.RefObject<any>) => {
    const [size, setSize] = useState([0, 0]);
    useEffect(() => {
        function updateSize() {
            //setSize([window.innerWidth, window.innerHeight]);
            setSize([ref.current.offsetWidth, ref.current.offsetHeight]);
        }

        if (!ref.current) return

        //ref.current.addEventListener('resize', updateSize);
        window.addEventListener('resize', updateSize);
        updateSize();

        //return () => ref.current.removeEventListener('resize', updateSize);
    }, [ref]);

    return size;
}

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