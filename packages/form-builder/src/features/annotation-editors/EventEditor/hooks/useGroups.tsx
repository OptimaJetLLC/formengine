import {groupBy} from '@react-form-builder/core'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'

export const useGroups = () => {
  const store = useBuilderStore()
  const nodes = store.getAllNodes().filter(node => Boolean(node.model?.actionsInitializer))

  return groupBy(nodes, value => value.model.name)
}
