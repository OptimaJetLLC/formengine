import {ComponentStore} from '../../../stores/ComponentStore'
import {Store} from '../../../stores/Store'
import {AsyncFunction} from '../../../utils/AsyncFunction'
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
  const actionList = getActionList(store, data.type)
  const action = actionList?.find(a => a.name === data.name)

  if (!action) {
    throw Error(`Action ${data.name} didn't found!`)
  }

  return toActionDefinition(action as ActionDefinition | CustomActionDefinition)
}

/**
 * Adds action for component.
 * @param store the target {@link ComponentStore}.
 * @param eventName the target event name.
 * @param data the {@link ActionData}.
 * @internal
 */
export function addAction(store: ComponentStore, eventName: string, data: ActionData) {
  store.events ??= {}
  store.events[eventName] ??= []
  store.events[eventName].push(data)
}

/**
 * Returns an array of {@link BaseActionDefinition} found for the specified action type and action target from the repository.
 * @param store FormViewer {@link Store}.
 * @param type action type.
 * @returns the array of {@link BaseActionDefinition} or undefined.
 * @internal
 */
export function getActionList(store: Store, type: string): BaseActionDefinition[] | undefined {
  switch (type) {
    case 'common':
      return store.actions
    case 'custom':
      return store.form.componentTree.store.props?.actions?.value as CustomActionDefinition[] | undefined
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
  const func = AsyncFunction(paramNames, action.body) as Func
  return {
    name: action.name,
    func,
    params: action.params
  }
}
