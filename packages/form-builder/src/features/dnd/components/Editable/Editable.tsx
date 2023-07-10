import {OverridesProvider, useComponentData, WrapperProps} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {observer} from 'mobx-react'
import {useRef} from 'react'
import {useDragLayer} from 'react-dnd'
import {useComputed} from '../../../../utils/useComputed'
import {useMeta} from '../../../../utils/useMeta'
import {isContainer} from '../../../annotation'
import {useEventReactions} from '../../../event/utils/useEventReactions'
import {Draggable} from './components/Draggable'
import {DropZone} from './components/DropZone'
import {Toolbar} from './components/Toolbar'
import {useSelection} from './hooks/useSelection'

export const Editable = observer(({children}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const overrides = useInnerDropZone()

  useEventReactions()

  const toolbars = selected && !isDragging && <>
    <Toolbar/>
  </>

  return (
    <Draggable {...selectionHandlers} className={selectionClassName} viewForDragPreview={children}>
      <OverridesProvider value={overrides}>
        {children}
        {toolbars}
      </OverridesProvider>
    </Draggable>
  )
})

function useInnerDropZone() {
  const meta = useMeta()
  const data = useComponentData()
  const overrides = useRef<Record<string, any>>()

  const containers = meta?.properties.filter(isContainer)

  const existBinds = useComputed(() => data.store.children?.map(cs => cs.bindTo ?? 'children'))
  const emptySlots = containers?.filter(an => !existBinds?.includes(an.key) || an.bindConditionBuilder)

  overrides.current = emptySlots?.reduce((acc, container) => {
    const bindTo = container.key === 'children' ? undefined : container.key
    const bindCondition = container?.bindConditionBuilder?.(assign({}, data.model.defaultProps, data.store.props))

    acc[container.key] = <DropZone isInner={true} bindTo={bindTo} bindCondition={bindCondition}></DropZone>
    return acc
  }, {} as Record<string, any>)

  return overrides
}
