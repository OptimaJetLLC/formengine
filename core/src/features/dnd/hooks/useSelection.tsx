import {useStore} from "../../../utils/StoreContext";
import {useComponentData} from "../../../utils/ComponenDataContext";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import classNames from "classnames";
import {hoveredStyles, selectedStyles} from "../styles";

export interface SelectionState {
    hovered: boolean
    selected: boolean
}

export interface SelectionHandlers {
    onMouseDown: () => void
    onMouseOver: (e: React.MouseEvent) => void
    onMouseLeave: () => void
}

export type ClassName = string

//TODO bug выбор внутреннего контейнера работает не корректно
export const useSelection = (): [SelectionState, SelectionHandlers, ClassName] => {
    const store = useStore()
    const {componentStore} = useComponentData()
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

    const className = useMemo(() => (classNames({
        [hoveredStyles]: hovered && !selected,
        [selectedStyles]: selected,
    })), [hovered, selected])

    return [{hovered, selected}, {onMouseDown, onMouseOver, onMouseLeave}, className]
}