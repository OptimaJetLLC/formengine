import type {ComponentStore} from '@react-form-builder/core'

/**
 * Sets the render-when value, creating the property when it is missing.
 * @param store the component settings.
 * @param value the render-when expression.
 */
export const setRenderWhenValue = (store: ComponentStore, value: string) => {
  if (!store.renderWhen) {
    store.renderWhen = {value}
    return
  }
  store.renderWhen.value = value
}

/**
 * Stores a function used to compute whether the component renders.
 * @param store the component settings.
 * @param code the function source.
 */
export const setRenderWhenFunction = (store: ComponentStore, code: string) => {
  store.renderWhen ??= {}
  store.renderWhen.fnSource = code
  store.renderWhen.computeType = 'function'
}

/**
 * Clears the computed render-when type.
 * @param store the component settings.
 */
export const clearRenderWhenCompute = (store: ComponentStore) => {
  if (store.renderWhen) store.renderWhen.computeType = undefined
}

/**
 * Writes a component property value and its editor type.
 * @param store the component settings.
 * @param key the property key.
 * @param value the property value.
 * @param editorType the property editor type.
 */
export const setPropValue = (store: ComponentStore, key: string, value: unknown, editorType: string) => {
  store.props[key] ??= {}
  store.props[key].value = value
  store.props[key].editorType = editorType
}

/**
 * Ensures a property entry exists for the editor type.
 * @param store the component settings.
 * @param key the property key.
 * @param editorType the property editor type.
 */
export const ensureProp = (store: ComponentStore, key: string, editorType: string) => {
  store.props[key] ??= {editorType}
}
