import {Parameter} from '@react-form-builder/core'

/**
 * Description of the action on the parameter for the code editor.
 */
export type ParamAction = {
  /**
   * The type of action on the parameter.
   */
  type: 'create' | 'update' | 'remove'
  /**
   * The index of the parameter in the parameter array.
   */
  index: number
  /**
   * The parameter description.
   */
  param?: Parameter
}
