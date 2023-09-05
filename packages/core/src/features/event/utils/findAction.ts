import {Store} from '../../../stores/Store'
import {ActionData, ActionDefinition} from '../types'

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

  return action
}

/**
 * Returns an array of {@link ActionDefinition} found for the specified action type and action target from the repository.
 * @param store FormViewer {@link Store}.
 * @param type action type.
 * @returns the array of {@link ActionDefinition} or undefined.
 * @internal
 */
export function getActionList(store: Store, type: string): ActionDefinition[] | undefined {
  switch (type) {
    case 'common':
      return store.actions
    case 'custom':
      return store.form.actionsList
  }
}
