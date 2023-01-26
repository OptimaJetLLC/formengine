export type ArgumentName = string

export type ArgumentType = 'string' | 'number' | 'boolean'
export type Arg = ArgumentName | [ArgumentName, ArgumentType]
export type ArgumentValue = string | number | boolean
/**
 * It will be transformed in arguments before passing in action.
 */
export type WeakArgs = Record<ArgumentName, ArgumentValue>
