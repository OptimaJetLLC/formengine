import {ComponentStore} from '../../stores/ComponentStore'
import {ActionDefinition} from './actionDefinition'
import {WeakArgs} from './args'
import {Modifiers} from './modifiers'

export type ActionData = {
  target?: ComponentStore
  action: ActionDefinition
  weakArgs?: WeakArgs
  modifiers?: Modifiers
}

export type NewActionData = Pick<ActionData, 'action' | 'target'>
