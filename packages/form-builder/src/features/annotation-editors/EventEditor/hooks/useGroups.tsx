import {groupBy, useStore} from '@react-form-builder/core'

/**
 * @returns the {@link Record} with component tree elements grouped by component name.
 */
export const useGroups = () => {
  const viewerStore = useStore()
  const nodes = viewerStore.rootComponentData
    .allNodesAsArray
    .filter(node => Boolean(node.model?.actionsInitializer))

  return groupBy(nodes, value => value.model.name)
}
