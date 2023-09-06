import {ActionDefinition} from '../types'

export const commonActions: Record<string, ActionDefinition> = {
  log: ActionDefinition.functionalAction('Log event to console', console.log),
  validate: ActionDefinition.functionalAction('Validate', async e => await e.store.form.componentTree.validate()),
  clear: ActionDefinition.functionalAction('Clear', e => e.store.form.componentTree.clear()),
  reset: ActionDefinition.functionalAction('Reset', e => e.store.form.componentTree.reset())
}
