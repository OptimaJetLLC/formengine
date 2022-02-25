import React from "react";
import {useDrop} from "react-dnd";
import {useStore} from "../../../../../utils/contexts/StoreContext";
import {useComponentData} from "../../../../../utils/contexts/ComponenDataContext";
import {AcceptDrop, ItemType} from "../../../consts";
import {observer} from "mobx-react";
import {css, cx} from "@emotion/css";
import {ComponentMove} from "../../../../../utils/types";

interface DropZoneProps {
    isBefore: boolean
    className?: any
    bindTo?: string
    visible?: string
    inner?: boolean
}

const dropzone = css`
  label: dropzone;
  flex: 0 0 auto;
  height: 20px;
  transition: 200ms all;
  background: #00a2ff;
  margin-top: 0;
`

const active = css`
  label: active;
  background: #4caf50;
  transition: 100ms all;
  height: 40px;
`

const DropZone = observer(({isBefore, className, bindTo, visible, inner}: DropZoneProps) => {
    const store = useStore()
    const target = useComponentData()

    const [{isOver, isActive}, drop] = useDrop({
        accept: AcceptDrop,
        drop: (source: ComponentMove, monitor) => {
            let type = monitor.getItemType() as ItemType
            switch (type) {
                case ItemType.AddedComponent:
                case ItemType.Component:
                    //TODO механизм биндинга свойств
                    source.componentStore.bindTo = bindTo
                    source.componentStore.visible = visible
                    if (inner)
                        store.move(source, {
                            componentStore: target.componentStore,
                        }, isBefore)
                    else
                        store.move(source, target, isBefore)
                    break
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            //canDrop: monitor.canDrop(),
            isActive: monitor.isOver() && monitor.canDrop(),
        }),
    });

    return <div ref={drop} className={cx(dropzone, {[active]: isActive}, className)}/>
});

export {DropZone};
