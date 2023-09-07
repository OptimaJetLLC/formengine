import {KeySymbol} from '../../consts'
import {AsyncFunction} from '../../utils/AsyncFunction'

/**
 * The type for the event name.
 */
export type EventName = string

/**
 * The type for the parameter name.
 */
export type ParameterName = string

/**
 * Parameter type.
 */
export type ParameterType = 'string' | 'number' | 'boolean'

/**
 * Function parameter.
 */
export type Parameter = ParameterName | [ParameterName, ParameterType]

/**
 * The type of the argument value of the function.
 */
export type ArgumentValue = string | number | boolean

/**
 * Action type.
 */
export type ActionType = 'common' | 'custom' | 'external'

/**
 * It will be transformed in arguments before passing in action.
 */
export type Arguments = Record<ParameterName, ArgumentValue>

/**
 * Action Storage.
 * Used for add a new action, store information about it.
 */
export type ActionData = {
  [KeySymbol]?: string
  name: string
  type: ActionType
  args?: Arguments
}

/**
 * Represents a set of action definitions.
 */
export type ActionValues = Record<string, ActionDefinition>

/**
 * Represents the definition of an action.
 */
export class ActionDefinition {

  /**
   * Creates a new instance of the ActionDefinition class.
   * @param name the name of the Action.
   * @param func the function of an action.
   * @param body the source code of the Action.
   * @param params the parameters of the Action.
   */
  constructor(
    public readonly name: string,
    public readonly func: Func,
    public readonly body?: string,
    public readonly params: Parameter[] = [],
  ) {
  }

  /**
   * Creates an action from the function.
   * @param name the name of the Action.
   * @param func the function of an action.
   * @param params the parameters of the Action.
   * @returns the new instance of the ActionDefinition class.
   */
  static functionalAction(name: string, func: Func, params: Parameter[] = []): ActionDefinition {
    return new ActionDefinition(name, func, undefined, params)
  }

  /**
   * Creates an action from the source code.
   * @param name the name of the Action.
   * @param body the source code of the Action.
   * @param params the parameters of the Action.
   * @returns the new instance of the ActionDefinition class.
   */
  static sourceAction(name: string, body: string, params: Parameter[] = []): ActionDefinition {
    const func = AsyncFunction(params.length ? 'e, args' : 'e', body)
    return new ActionDefinition(name, func, body, params)
  }

  /**
   * Correctly creates the {@link ActionDefinition} from deserialized data.
   * @param value the deserialized data.
   * @returns the ActionDefinition instance.
   */
  static createFromObject(value: any) {
    return ActionDefinition.sourceAction(value.name, value.body, value.params)
  }
}

/**
 * Converts the input object to an ActionValues object.
 * @param obj the input object.
 * @returns the converted ActionValues object.
 */
export const createActionValuesFromObject = (obj: any) => {
  const result: ActionValues = {}
  if (!obj) return result

  Object.keys(obj).forEach(key => {
    const value = obj[key]
    result[key] = ActionDefinition.createFromObject(value)
  })
  return result
}

/**
 * The type of arbitrary function that returns void or Promise<void>.
 */
export type Func = (...arg: any[]) => void | Promise<void>

