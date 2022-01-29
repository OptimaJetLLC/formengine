import {useStore} from "../../../utils/StoreContext";
import {useComponentStore} from "../../../utils/ComponentStoreContext";
import React, {useCallback, useEffect, useState} from "react";

export interface SelectionState {
    hovered: boolean
    selected: boolean
}

export interface SelectionHandlers {
    onMouseDown: () => void
    onMouseOver: (e: React.MouseEvent) => void
    onMouseLeave: () => void
}

export const useSelection = (): [SelectionState, SelectionHandlers] => {
    const store = useStore()
    const componentStore = useComponentStore()
    const [hovered, setHovered] = useState(false)
    const [selected, setSelected] = useState(false)

    useEffect(() => {
        setSelected(store.currentNode?.key === componentStore.key)

    }, [store.currentNode])

    const onMouseDown = useCallback(() => {
        store.currentNode = store.findNode(componentStore.key)
    }, [])

    const onMouseOver = useCallback((event: React.MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        setHovered(true)
    }, [])

    const onMouseLeave = useCallback(() => {
        setHovered(false)
    }, [])


    return [{hovered, selected}, {onMouseDown, onMouseOver, onMouseLeave}]
}