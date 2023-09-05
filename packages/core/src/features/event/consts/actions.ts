import {ActionDefinition} from '../types'

const log = ActionDefinition.functionalAction('Log event to console', console.log)

const validate = ActionDefinition.functionalAction('Validate', async e => await e.store.form.componentTree.validate())

const clear = ActionDefinition.functionalAction('Clear', e => e.store.form.componentTree.clear())

const reset = ActionDefinition.functionalAction('Reset', e => e.store.form.componentTree.reset())

export {log, validate, reset, clear}
