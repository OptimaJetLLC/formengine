import {Arg} from './args'
import {Func} from './func'

export type ActionDefinition = {
  name: string,
  func: Func,
  args?: Arg[]
  description?: string
}
