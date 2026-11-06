import type {ActionData} from '@react-form-builder/core'

/**
 * Stores a function argument body on an action.
 * @param data the action data.
 * @param name the argument name.
 * @param src the function source.
 */
export const setFunctionArgumentBody = (data: ActionData, name: string, src?: string) => {
  data.args ??= {}
  data.args[name] = {type: 'fn', body: src}
}
