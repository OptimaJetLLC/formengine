import {isUndefined} from 'lodash-es'
import {ComponentProperty, ComponentStore, isFunctionalProperty} from '../../stores/ComponentStore'
import type {IFormData} from '../../utils/IFormData'

const fnCache = new Map<string, Function>()

const getOrCreateFn = (source: string) => {
  const fn = fnCache.get(source)
  if (fn) return fn

  const result = new Function('form', source)
  fnCache.set(source, result)
  return result
}

const calculateValue = (fnSource: string, formViewerData: IFormData) => {
  const fn = getOrCreateFn(fnSource)
  try {
    return fn(formViewerData)
  } catch (e) {
    console.warn(e)
  }
}

/**
 * Calculates the value for the component property.
 * @param componentProperty the component property.
 * @param formViewerData the formViewerData data.
 * @returns the calculated value.
 * @internal
 */
export const calculatePropertyValue = (componentProperty: ComponentProperty, formViewerData: IFormData) => {
  return calculateValue(componentProperty.fnSource || '', formViewerData)
}

/**
 * Calculates the value for the component property or calculates the value from the property expression.
 * @param componentProperty the component property.
 * @param formViewerData the formViewerData data.
 * @returns the calculated value.
 * @internal
 */
export const calculateExpressionProperty = (componentProperty: ComponentProperty, formViewerData: IFormData) => {
  if (isFunctionalProperty(componentProperty)) return calculatePropertyValue(componentProperty, formViewerData)
  const fnSource = componentProperty.value || ''
  return calculateValue(`return ${fnSource}`, formViewerData)
}

/**
 * The result of compiling of anything.
 */
export interface BaseCompilationResult {
  /**
   * Flag if true - compilation failed, false otherwise.
   */
  error: boolean
  /**
   * The array of compilation errors.
   */
  exceptions?: Error[]
}

/**
 * The result of compiling the function.
 */
export interface CompilationResult extends BaseCompilationResult {
  /**
   * The compiled function.
   */
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
 * @param formViewerData the formViewerData data.
 * @returns the {@link Record}<string, any> for all component properties.
 * @internal
 */
export const calculateProperties = (componentStore: ComponentStore, formViewerData: IFormData) => {
  const data: Record<string, any> = {}
  Object.keys(componentStore.props).forEach(value => {
    const componentProperty = componentStore.props[value]
    if (!componentProperty) return

    if (isFunctionalProperty(componentProperty)) {
      try {
        data[value] = calculatePropertyValue(componentProperty, formViewerData)
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
