import {WeakArgs} from './args'
import {Modifiers} from './modifiers'

export type EventName = string

export type WeakActionData = {
  targetKey?: string
  actionName: string
  weakArgs?: WeakArgs
  modifiers?: Modifiers
}
