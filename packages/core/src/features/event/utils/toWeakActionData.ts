import {ActionData} from '../actionData'
import {WeakActionData} from '../types'

export const toWeakActionData = (event: ActionData): WeakActionData => ({
  targetKey: event.target?.key,
  actionName: event.action.name,
  weakArgs: event.weakArgs,
  modifiers: event.modifiers,
})
