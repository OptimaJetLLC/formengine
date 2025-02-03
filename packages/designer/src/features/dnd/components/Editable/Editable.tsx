import {cx} from '@emotion/css'
import type {ComponentData, ComponentStore, WrapperProps} from '@react-form-builder/core'
import {
  checkSlotCondition,
  ComponentState,
  ComponentTree,
  DefaultWrapper,
  groupBy,
  isContainer,
  namedObserver,
  node,
  slotModel,
  TemplateField,
  toArray,
  useStore
} from '@react-form-builder/core'
import {useDragLayer} from 'react-dnd'
import type {BuilderStore} from '../../../../stores/BuilderStore'
import {Draggable} from './components/Draggable'
import {DropZone} from './components/DropZone'
import {Toolbar} from './components/Toolbar'
import {ErrorBoundary} from './ErrorBoundary'
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
  const meta = builderStore.getComponentMetadata(componentData.model.type)

  const availableSlots = meta.properties.filter(isContainer)
  const templateSlots = getTemplateSlots(componentData)
  availableSlots.push(...templateSlots)

  const closedSlots = componentData.store
    .children?.filter(componentStore => checkSlotCondition(componentStore, componentProps))
    .map(getSlot) ?? []
  const openSlots = availableSlots.filter(an => !closedSlots.includes(an.key))

  const groups = groupBy(containers, value => getSlot(value.store))
  const isSlotConditionSatisfied = (child: ComponentData) => checkSlotCondition(child.store, componentProps)

  for (const [key, children] of Object.entries(groups)) {
    const filteredChildren = children
      .filter(isSlotConditionSatisfied)

    if (filteredChildren.length) {
      currentProps[key] = componentData.model.propsBindingTypes[key] === 'array'
        ? filteredChildren.map((item, index) => <ComponentTree key={index} data={[item]}/>)
        : <ComponentTree data={filteredChildren}/>
    }
  }

  openSlots.forEach(container => {
    const viewerStore = builderStore.viewer
    const dataContext = componentData.dataRootProvider ?? viewerStore.dataContext
    const localize = viewerStore.localizeComponent.bind(viewerStore, 'component', dataContext.dataRoot)
    const componentState = new ComponentState(componentData, viewerStore, localize, () => ({}))
    const slotCondition = container?.slotConditionBuilder?.(componentState.propsWithoutChildren)
    const slot = container.key === childrenSlot ? undefined : container.key
    currentProps[container.key] = <DropZone isInner={true} slot={slot} slotCondition={slotCondition}/>
  })

  return currentProps
}

const RawEditableWrapper = ({children, ...props}: WrapperProps) => {
  const viewerStore = useStore()
  const Wrapper = viewerStore.parentStore ? DefaultWrapper : Editable
  return <Wrapper children={children} {...props}/>
}

export const EditableWrapper = namedObserver('EditableWrapper', RawEditableWrapper)

const RawEditable = ({children, className}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const toolbars = selected && !isDragging && <Toolbar/>

  return (
    <ErrorBoundary>
      <Draggable {...selectionHandlers} className={cx(selectionClassName, className)}>
        {children}
        {toolbars}
      </Draggable>
    </ErrorBoundary>
  )
}

const Editable = namedObserver('Editable', RawEditable)

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
