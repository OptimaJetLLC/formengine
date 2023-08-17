import {defineAction} from '../utils/defineAction'

const log = defineAction('Log event to console', console.log)

const validate = defineAction('Validate', async e => await e.store.form.componentTree.validate())

const clear = defineAction('Clear', e => e.store.form.componentTree.clear())

const reset = defineAction('Reset', e => e.store.form.componentTree.reset())

export {log, validate, reset, clear}
