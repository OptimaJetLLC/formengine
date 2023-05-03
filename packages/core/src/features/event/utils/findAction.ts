import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {ActionData, ActionDefinition, BaseActionDefinition, CustomActionDefinition, Func} from '../types'

export function findAction(store: Store, data: ActionData): ActionDefinition {
  const targetComponent = data.target ? store.getComponent(data.target) : undefined
  const actionList = getActionList(store, data.type, targetComponent)
  const action = actionList?.find(a => a.name === data.name)

  if (!action) {
    throw Error(`Action ${data.name} didn't found!`)
  }

  return toActionDefinition(action as ActionDefinition | CustomActionDefinition)
}

function getActionList(store: Store, type: string, target?: ComponentStore): BaseActionDefinition[] | undefined {
  switch (type) {
    case 'common':
      return store.actions
    case 'linked':
      return store.getLinkedActions(target)
    case 'custom':
      return store.screen.props?.actions?.value as CustomActionDefinition[] | undefined
  }
}

function toActionDefinition(action: ActionDefinition | CustomActionDefinition): ActionDefinition {
  if ('func' in action) return action

  const paramNames = action.params ? 'args, e' : 'e'
  const func = new Function(paramNames, action.body) as Func
  return {
    name: action.name,
    func,
    params: action.params
  }
}
