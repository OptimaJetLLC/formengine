import {Parameter} from '../../../types'

export type ParamAction = {
  type: 'create' | 'update' | 'remove'
  index: number
  param?: Parameter
}
