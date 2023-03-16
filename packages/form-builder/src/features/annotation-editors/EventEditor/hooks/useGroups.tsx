import {isEmpty} from 'lodash-es'
import {useBuilderStore} from '../../../../utils/BuilderStoreContext'
import {Node} from '../../../../utils/Node'

export const useGroups = () => {
  const store = useBuilderStore()
  const nodes = store.getAllNodes().filter(node => !isEmpty(node.model?.actions))
  return nodes.reduce((groups: Record<string, Node[]>, node: Node) => {
    const group: Node[] = (groups[node.model.name] || [])
    group.push(node)
    groups[node.model.name] = group
    return groups
  }, {})
}
