import {defineAction} from '../utils/defineAction'

const setValue = defineAction('Set value', (actionArgs, e) => {
  //const componentStore: ComponentStore = eventArgs[2];
  //actionArgs.target.props.value = actionArgs.param1;
  //let b = args
  let a = actionArgs.propertyName
}, ['propertyName', ['NumPar', 'number'], ['BoolPar', 'boolean']])

const setProperty = defineAction('Set property', ({propertyKey, targetKey, value}, e) => {
  const component = e.store.getComponent(targetKey)
  component.props[propertyKey] = {value: value}
}, ['propertyKey', 'targetKey', 'value'])

const log = defineAction('Log event to console', console.log)
const validate = defineAction('Validate', (e) => e.store.form.validate())
const clear = defineAction('Clear', (e) => e.store.form.clear())
const reset = defineAction('Reset', (e) => e.store.form.reset())

export {setValue, setProperty, log, validate, reset, clear}
