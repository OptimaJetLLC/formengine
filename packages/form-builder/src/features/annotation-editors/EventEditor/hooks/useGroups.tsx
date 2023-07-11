import {groupBy} from '@react-form-builder/core'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'

/**
 * @returns the {@link Record} with component tree elements grouped by component name.
 */
export const useGroups = () => {
  const store = useBuilderStore()
  const nodes = store.getAllNodes().filter(node => Boolean(node.model?.actionsInitializer))

  return groupBy(nodes, value => value.model.name)
}
