import type {ComponentProperty, ComponentStore} from '@react-form-builder/core'

const patchProps = (props?: Record<string, ComponentProperty>) => {
  if (!props) return

  Object.values(props).forEach(prop => {
    if (prop.computeType === 'localization') {
      delete prop.computeType
    }
  })
}

const patchComponentStore = (componentStore: ComponentStore) => {
  patchProps(componentStore.props)
  patchProps(componentStore.tooltipProps)
  componentStore.children?.forEach(child => {
    patchComponentStore(child)
  })
}

/**
 * Removes localization from the component store.
 * @param components the component stores.
 * @returns the component stores without localization.
 */
export const removePresetLocalization = (components: ComponentStore[]) => {
  const copy = JSON.parse(JSON.stringify(components)) as ComponentStore[]

  copy.forEach(componentStore => {
    patchComponentStore(componentStore)
  })

  return copy
}
