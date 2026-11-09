import type {Annotation, ComponentData, ComponentStore, WrapperProps} from '@react-form-builder/core'
import {
  ComponentTree,
  checkSlotCondition,
  DefaultWrapper,
  getVisualChildren,
  groupBy,
  isContainer,
  namedObserver,
  node,
  slotModel,
  TemplateField,
  toArray,
  useComponentData,
  useStore,
} from '@react-form-builder/core'
import cx from 'clsx'
import {useDragLayer} from 'react-dnd'
import type {BuilderStore} from '../../../../stores/BuilderStore'
import {Draggable} from './components/Draggable'
import {DropZone} from './components/DropZone'
import {ErrorBoundary} from './ErrorBoundary'
import {useSelection} from './hooks/useSelection'

function getTemplateSlots(data: ComponentData) {
  if (!(data.field instanceof TemplateField)) return []

  const slots = data.field.viewerStore.form.componentTree.store.children?.filter(cs => cs.type === slotModel.type)

  const ans = slots?.reduce((acc: Record<string, any>, cs) => {
    acc[cs.key] = node
    return acc
  }, {})

  return toArray(ans)
}

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
  const visualChildren = getVisualChildren(componentData)
  const currentProps: Record<string, any> = {}
  const meta = builderStore.getComponentMetadata(componentData.model.type)

  const availableSlots: Annotation[] = meta.properties.filter(isContainer).filter(an => {
    const prop = componentData.store.props[an.key]
    return an.getNodeEditorType(prop) === 'node'
  })
  const templateSlots = getTemplateSlots(componentData)
  availableSlots.push(...templateSlots)

  const closedSlots = visualChildren.filter(child => checkSlotCondition(child.store, componentProps)).map(child => getSlot(child.store))
  const openSlots = availableSlots.filter(an => !closedSlots.includes(an.key))

  const groups = groupBy(visualChildren, value => getSlot(value.store))
  const isSlotConditionSatisfied = (child: ComponentData) => checkSlotCondition(child.store, componentProps)

  for (const [key, children] of Object.entries(groups)) {
    const filteredChildren = children.filter(isSlotConditionSatisfied)

    if (filteredChildren.length) {
      currentProps[key] =
        componentData.model.propsBindingTypes[key] === 'array' ? (
          filteredChildren.map((item, index) => [item]).map((data, index) => <ComponentTree key={index} data={data} />)
        ) : (
          <ComponentTree data={filteredChildren} />
        )
    }
  }

  openSlots.forEach(container => {
    const componentState = componentData.componentState
    const slotCondition = container.slotConditionBuilder?.(componentState.propsWithoutChildren)
    const slot = container.key === childrenSlot ? undefined : container.key
    currentProps[container.key] = <DropZone key={`${container.key}-dropzone`} isInner={true} slot={slot} slotCondition={slotCondition} />
  })

  return currentProps
}

const RawEditable = ({children, className, ...props}: WrapperProps) => {
  const [{selected}, selectionHandlers, selectionClassName] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const {key} = useComponentData()
  const testId = `${key}-editable-wrapper`

  return (
    <ErrorBoundary>
      <Draggable
        data-testid={testId}
        {...props}
        {...selectionHandlers}
        showToolbar={selected && !isDragging}
        className={cx(selectionClassName, className)}
      >
        {children}
      </Draggable>
    </ErrorBoundary>
  )
}

const Editable = namedObserver('Editable', RawEditable)

const RawEditableWrapper = ({children, ...props}: WrapperProps) => {
  const viewerStore = useStore()
  const Wrapper = viewerStore.parentStore ? DefaultWrapper : Editable

  return <Wrapper {...props}>{children}</Wrapper>
}

export const EditableWrapper = namedObserver('EditableWrapper', RawEditableWrapper)
