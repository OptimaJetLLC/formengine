import {Store} from '../../../stores/Store'
import {ActionDefinition} from '../types'

/**
 * Returns an array of {@link ActionDefinition} found for the specified action type and action target from the repository.
 * @param store FormViewer {@link Store}.
 * @param type action type.
 * @returns the array of {@link ActionDefinition} or undefined.
 * @internal
 */
// todo remove this function
export function getActionList(store: Store, type: string): ActionDefinition[] | undefined {
  if (type === 'custom') return store.form.actionsList
}
