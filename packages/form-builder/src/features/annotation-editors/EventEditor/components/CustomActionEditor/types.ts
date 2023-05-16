import {Parameter} from '@react-form-builder/core'

export type ParamAction = {
  type: 'create' | 'update' | 'remove'
  index: number
  param?: Parameter
}
