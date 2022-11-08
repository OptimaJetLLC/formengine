import _ from 'lodash'
import {useBuilderStore} from '../../../../utils/contexts/BuilderStoreContext'
import {Node} from '../../../../utils/Node'

export const useGroups = () => {
  const store = useBuilderStore()
  const nodes = store.getAllNodes().filter(node => !_.isEmpty(node.model?.actions))
  return nodes.reduce((groups: Record<string, Node[]>, node: Node) => {
    const group: Node[] = (groups[node.model.name] || [])
    group.push(node)
    groups[node.model.name] = group
    return groups
  }, {})
}
