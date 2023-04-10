import {ComponentType} from 'react'
import {calculateExpressionProperty} from '../features/calculation/propertyCalculator'
import {ComponentStore} from '../stores/ComponentStore'
import {Store} from '../stores/Store'
import {ComponentData} from './contexts/ComponentDataContext'
import {groupBy} from './groupBy'

const defaultContainerKey = 'children'

export function getChildren(data: ComponentData, store: Store, componentTreeItem: ComponentType<any>, currentState: Record<string, any>) {
  const containers = data.componentStore.children
  const ComponentTree = componentTreeItem
  const currentProps: Record<string, any> = {}

  if (!containers) return currentProps

  const groups = groupBy(containers, value => value.bindTo || defaultContainerKey)
  const isBindConditionSatisfied = (child: ComponentStore) => executeCondition(child, currentState)
  const isNeedRender = (child: ComponentStore) => store.isBuilderMode || needRender(child, store)

  for (let [key, children] of Object.entries(groups)) {
    const filteredChildren = children
      .filter(isBindConditionSatisfied)
      .filter(isNeedRender)
    if (filteredChildren.length) currentProps[key] = <ComponentTree parentStore={data.componentStore} data={filteredChildren}/>
  }

  return currentProps
}

const fnCache = new Map<string, Function>()

function getOrCreateFn(source: string) {
  const fn = fnCache.get(source)
  if (fn) return fn

  const result = new Function('parentProps', source)
  fnCache.set(source, result)
  return result
}

function executeCondition(child: ComponentStore, parentProps: any) {
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

function needRender(child: ComponentStore, store: Store) {
  if (!child.renderWhen) return true
  return calculateExpressionProperty(child.renderWhen, store.form) === true
}
