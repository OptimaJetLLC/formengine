import {useBuilderStore} from './BuilderStoreContext'

/**
 * Returns true if one component is selected and the specified feature is enabled.
 * @param feature the component feature name.
 * @returns true if one component is selected and the specified feature is enabled.
 */
export const useIsSelectedComponentFeatureEnabled = (feature: string) => {
  const builderStore = useBuilderStore()
  const selectedComponent = builderStore?.oneSelectedComponentData
  return !!selectedComponent?.model?.isFeatureEnabled(feature)
}
