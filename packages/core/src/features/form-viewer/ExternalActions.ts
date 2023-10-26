import {ActionDefinition, ActionEventHandler, ActionValues} from '../event'

/**
 * External actions for the form viewer.
 */
export type ExternalActions = Record<string, ActionDefinition | ActionEventHandler>

/**
 * Converts external actions to the set of action definitions. **Internal use only.**
 * @param externalActions the external actions.
 * @returns the set of action definitions or undefined.
 */
export function externalActionsToActionsValues(externalActions?: ExternalActions): ActionValues | undefined {
  if (!externalActions) return

  const result: ActionValues = {}
  Object.entries(externalActions).forEach(([name, value]) => {
    result[name] = value instanceof ActionDefinition
      ? value
      : ActionDefinition.functionalAction(value)
  })
  return result
}
