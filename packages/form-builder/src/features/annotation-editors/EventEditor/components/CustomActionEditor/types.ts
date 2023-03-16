import {Parameter} from 'fb-core'

export type ParamAction = {
  type: 'create' | 'update' | 'remove'
  index: number
  param?: Parameter
}
