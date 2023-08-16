import {
  checkBindCondition,
  ComponentData,
  ComponentStore,
  ComponentTree,
  groupBy,
  namedObserver,
  slotModel,
  TemplateField,
  useStore,
  WrapperProps
} from '@react-form-builder/core'
import {assign} from 'lodash-es'
import {observer} from 'mobx-react'
import {useDragLayer} from 'react-dnd'
import {BuilderStore} from '../../../../stores/BuilderStore'
import {isContainer, node} from '../../../annotation'
import {toArray} from '../../../define'
import {useEventReactions} from '../../../event/utils/useEventReactions'
import {Draggable} from './components/Draggable'
import {DropZone} from './components/DropZone'
import {Toolbar} from './components/Toolbar'
import {useSelection} from './hooks/useSelection'

const childrenSlot = 'children'

function getSlot(componentStore: ComponentStore) {
  return componentStore.slot ?? childrenSlot
}

/**
 * Returns the {@link Record} with all child components.
 * @param builderStore the form builder settings.
 * @param componentData the parent component's data necessary to display the component.
 * @param componentProps the properties of the parent component.
 * @returns the {@link Record} with all child components.
 */
export function getBuilderChildren(builderStore: BuilderStore, componentData: ComponentData, componentProps: Record<string, any>) {
  const containers = componentData.children
  const currentProps: Record<string, any> = {}
  const meta = builderStore.view.getMeta(componentData.model.type)

  const availableSlots = meta.properties.filter(isContainer)
  const templateSlots = getTemplateSlots(componentData)
  availableSlots.push(...templateSlots)

  const closedSlots = componentData.store.children?.map(getSlot) ?? []
  const openSlots = availableSlots.filter(an => !closedSlots.includes(an.key) || an.bindConditionBuilder)

  const groups = groupBy(containers, value => getSlot(value.store))
  const isBindConditionSatisfied = (child: ComponentData) => checkBindCondition(child, componentProps)

  for (const [key, children] of Object.entries(groups)) {
    const filteredChildren = children
      .filter(isBindConditionSatisfied)
    if (filteredChildren.length) currentProps[key] = <ComponentTree data={filteredChildren}/>
  }

  openSlots.forEach(container => {
    const slot = container.key === childrenSlot ? undefined : container.key
    const props = assign({}, componentData.model.defaultProps, componentData.store.props)
    const bindCondition = container?.bindConditionBuilder?.(props)
    currentProps[container.key] = <DropZone isInner={true} slot={slot} bindCondition={bindCondition}/>
  })

  return currentProps
}

export const EditableWrapper = namedObserver('EditableWrapper', ({children}: WrapperProps) => {
  const viewerStore = useStore()
  // no need to draw Editable component inside child FormViewer
  return viewerStore.parentStore ? <>{children}</> : <Editable children={children}/>
})

const Editable = observer(({children}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))

  useEventReactions()

  const toolbars = selected && !isDragging && <>
    <Toolbar/>
  </>

  return (
    <Draggable {...selectionHandlers} className={selectionClassName} viewForDragPreview={children}>
      {children}
      {toolbars}
    </Draggable>
  )
})

function getTemplateSlots(data: ComponentData) {
  if (!(data.field instanceof TemplateField)) return []

  const slots = data.field.viewerStore.form.componentTree
    .store.children?.filter(cs => cs.type === slotModel.type)

  const ans = slots?.reduce((acc: Record<string, any>, cs) => {
    acc[cs.key] = node
    return acc
  }, {})
  return toArray(ans)
}
