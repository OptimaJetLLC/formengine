import {ActionDefinition, ActionValues} from '../types'

export const commonActions: ActionValues = {
  // eslint-disable-next-line no-console
  log: ActionDefinition.functionalAction(console.log),
  validate: ActionDefinition.functionalAction(async e => await e.store.form.componentTree.validate()),
  clear: ActionDefinition.functionalAction(e => e.store.form.componentTree.clear()),
  reset: ActionDefinition.functionalAction(e => e.store.form.componentTree.reset())
}
