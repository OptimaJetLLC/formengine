import {isUndefined} from 'lodash-es'
import {ComponentProperty, ComponentStore} from '../../stores/ComponentStore'
import {Form} from '../validation'

const fnCache = new Map<string, Function>()

const getOrCreateFn = (source: string) => {
  const fn = fnCache.get(source)
  if (fn) return fn

  const result = new Function('form', source)
  fnCache.set(source, result)
  return result
}

const calculateValue = (fnSource: string, form: Form) => {
  const fn = getOrCreateFn(fnSource)
  try {
    return fn(form)
  } catch (e) {
    console.warn(e)
  }
}

/**
 * Calculates the value for the component property.
 * @param componentProperty the component property.
 * @param form the form data.
 * @returns the calculated value.
 * @internal
 */
export const calculatePropertyValue = (componentProperty: ComponentProperty, form: Form) => {
  return calculateValue(componentProperty.fnSource || '', form)
}

/**
 * Calculates the value for the component property or calculates the value from the property expression.
 * @param componentProperty the component property.
 * @param form the form data.
 * @returns the calculated value.
 * @internal
 */
export const calculateExpressionProperty = (componentProperty: ComponentProperty, form: Form) => {
  if (componentProperty.useFn) return calculatePropertyValue(componentProperty, form)
  const fnSource = componentProperty.value || ''
  return calculateValue(`return ${fnSource}`, form)
}

/**
 * The result of compiling of anything.
 */
export class BaseCompilationResult {
  error = false
  exceptions?: Error[]
}

/**
 * The result of compiling the function.
 */
export class CompilationResult extends BaseCompilationResult {
  fn?: Function
}

/**
 * Compiles the function from string source code.
 * @param source the function source code.
 * @returns the result of the function compilation.
 */
export const compileFn = (source: string): CompilationResult => {
  try {
    const fn = getOrCreateFn(source)
    return {error: false, fn}
  } catch (e) {
    return {error: true, exceptions: [e as Error]}
  }
}

/**
 * Calculates all properties for the component.
 * @param componentStore the component.
 * @param form form data.
 * @returns the {@link Record}<string, any> for all component properties.
 * @internal
 */
export const calculateProperties = (componentStore: ComponentStore, form: Form) => {
  const data: Record<string, any> = {}
  Object.keys(componentStore.props).forEach(value => {
    const componentProperty = componentStore.props[value]
    if (!componentProperty) return

    if (componentProperty.useFn) {
      try {
        data[value] = calculatePropertyValue(componentProperty, form)
      } catch (e) {
        console.error(e)
      }
      return
    }

    // we do not want to set an undefined value, instead the default component property will be used
    if (!isUndefined(componentProperty.value)) {
      data[value] = componentProperty.value
    }
  })
  return data
}
