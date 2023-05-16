import {useComponentData} from '@react-form-builder/core'
import {useDrop} from 'react-dnd'
import {ConnectDropTarget} from 'react-dnd/dist/types/types'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {ComponentMove, InsertPosition} from '../../../../../utils/types'
import {AcceptDrop, ItemType} from '../../../consts'

interface DropState {
  isActive: boolean,
  isOver: boolean,
}

export const useDropZone = (isAfter: boolean, isInner?: boolean): [DropState, ConnectDropTarget] => {
  const {Before, After, Inner} = InsertPosition

  const store = useBuilderStore()
  const target = useComponentData()
  const {bindTo} = target.store
  const insertPosition = isInner
    ? Inner
    : isAfter ? After : Before

  const [{isActive, isOver}, drop] = useDrop({
    accept: AcceptDrop,
    drop: (source: ComponentMove, monitor) => {
      let type = monitor.getItemType() as ItemType
      switch (type) {
        case ItemType.AddedComponent:
          store.add(source, target, insertPosition)
          break
        case ItemType.Component:
          //TODO механизм биндинга свойств
          source.store.bindTo = bindTo
          if (store.selected.size > 1) {
            store.multipleMove(target, insertPosition)
          } else {
            store.move(source, target, insertPosition)
          }
          break
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      isActive: monitor.isOver() && monitor.canDrop(),
    })
  })

  return [{isActive, isOver}, drop]
}
