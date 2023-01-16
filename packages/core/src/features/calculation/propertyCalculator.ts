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

export const calculatePropertyValue = (componentStore: ComponentStore, componentProperty: ComponentProperty, form: Form) => {
  const fn = getOrCreateFn(componentProperty.fnSource || '')
  return fn(form)
}

export const calculateProperty = (componentStore: ComponentStore, propertyName: string, form: Form) => {
  const componentProperty = componentStore.props[propertyName]
  if (!componentProperty) return

  try {
    return componentProperty.useFn
      ? calculatePropertyValue(componentStore, componentProperty, form)
      : componentProperty.value
  } catch (e) {
    console.error(e)
  }
}

export type CompilationResult = {
  error: boolean
  fn?: Function
  exception?: Error
}

export const compileFn = (source: string): CompilationResult => {
  try {
    const fn = getOrCreateFn(source)
    return {error: false, fn}
  } catch (e) {
    return {error: true, exception: e as Error}
  }
}

export const calculateProperties = (componentStore: ComponentStore, form: Form) => {
  const data: Record<string, any> = {}
  Object.keys(componentStore.props).forEach(value => {
    data[value] = calculateProperty(componentStore, value, form)
  })
  return data
}
