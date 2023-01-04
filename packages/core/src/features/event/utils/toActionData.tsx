import {Store} from '../../../stores/Store'
import {ActionData, WeakActionData} from '../types'

export const toActionData = (data: WeakActionData, store: Store): ActionData => {
  const {actionName, modifiers, weakArgs, targetKey} = data
  const target = targetKey ? store.getComponent(targetKey) : undefined
  const action = store.findAction(actionName, targetKey)

  return {target, action, weakArgs, modifiers}
}

