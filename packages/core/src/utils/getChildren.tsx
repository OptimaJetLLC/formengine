import {ComponentType} from 'react'
import {isContainer} from '../features/annotation'
import {calculateExpressionProperty} from '../features/calculation/propertyCalculator'
import {ComponentTree} from '../features/ui/ComponentTree'
import {ComponentTreeItemProps} from '../features/ui/ComponentTreeItemProps'
import {ComponentStore} from '../stores/ComponentStore'
import {Store} from '../stores/Store'
import {ComponentData} from './contexts/ComponentDataContext'

const defaultContainerKey = 'children'

const fnCache = new Map<string, Function>()

const getOrCreateFn = (source: string) => {
  const fn = fnCache.get(source)
  if (fn) return fn

  const result = new Function('parentProps', source)
  fnCache.set(source, result)
  return result
}

const executeCondition = (child: ComponentStore, parentProps: any) => {
  const fnSource = child.bindCondition?.trim()
  // it's OK - no condition to bind
  if (!fnSource) return true
  const fn = getOrCreateFn(fnSource)
  try {
    return fn(parentProps)
  } catch (e) {
    console.warn(e)
    return false
  }
}

const needRender = (child: ComponentStore, store: Store) => {
  if (!child.renderWhen) return true
  return calculateExpressionProperty(child.renderWhen, store.form) === true
}

export function getChildren(data: ComponentData, store: Store, componentTreeItem: ComponentType<ComponentTreeItemProps>,
                            props: any) {
  const containers = data.model.properties.filter(isContainer)
  const currentProps: Record<string, any> = {}
  for (let container of containers) {
    const isChild = (child: ComponentStore) =>
      child.bindTo === container.key || !child.bindTo && container.key === defaultContainerKey
    const isBindConditionSatisfied = (child: ComponentStore) => executeCondition(child, props)
    const isNeedRender = (child: ComponentStore) => store.isBuilderMode || needRender(child, store)

    const components = data.componentStore.children?.filter(isChild)
      .filter(isBindConditionSatisfied)
      .filter(isNeedRender)

    let dropZoneElement = null
    if (store.props.dropZone) {
      const Dz = store.props.dropZone
      const bindTo = container.key === defaultContainerKey ? undefined : container.key
      const bindCondition = data.model.properties
        .find(property => property.key === container.key)
        ?.bindConditionBuilder?.(props)
      dropZoneElement = <Dz bindTo={bindTo} bindCondition={bindCondition}></Dz>
    }

    currentProps[container.key] =
      components?.length
        ? <ComponentTree parentStore={data.componentStore} data={components} treeItem={componentTreeItem}/>
        : dropZoneElement
  }
  return currentProps
}
