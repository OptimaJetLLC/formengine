import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {ActionData, ActionDefinition, BaseActionDefinition, CustomActionDefinition, Func} from '../types'

/**
 * Searches for an action in store, returns definition for the found action.
 * @param store the form viewer settings.
 * @param data the action's data.
 * @returns the {@link ActionDefinition} for the found action.
 * @throws Error, if action was not found.
 * @internal
 */
export function findAction(store: Store, data: ActionData): ActionDefinition {
  const targetComponent = data.target ? store.getComponent(data.target) : undefined
  const actionList = getActionList(store, data.type, targetComponent)
  const action = actionList?.find(a => a.name === data.name)

  if (!action) {
    throw Error(`Action ${data.name} didn't found!`)
  }

  return toActionDefinition(action as ActionDefinition | CustomActionDefinition)
}

/**
 * Returns an array of {@link BaseActionDefinition} found for the specified action type and action target from the repository.
 * @param store FormViewer {@link Store}.
 * @param type action type.
 * @param target action target.
 * @returns the array of {@link BaseActionDefinition} or undefined.
 * @internal
 */
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

/**
 * Converts an instance of the BaseActionDefinition subtype into an instance of the ActionDefinition type.
 * @param action an instance of the BaseActionDefinition subtype.
 * @returns the ActionDefinition instance.
 * @internal
 */
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
