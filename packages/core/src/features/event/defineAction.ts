import {ActionDefinition, ActionEventHandler, ActionHandler, ArgsDefinition} from './types'

//TODO hint field for unparameterized action
export function defineAction(name: string, func: ActionEventHandler): ActionDefinition
export function defineAction<T>(name: string, func: ActionHandler<T>, args: ArgsDefinition<T>[], description?: string): ActionDefinition
export function defineAction<T>(
  name: string,
  func: ActionEventHandler | ActionHandler<T>,
  args?: ArgsDefinition<T>[],
  description?: string
): ActionDefinition {
  return {name, func, args, description}
}
