/**
 * Sorts an array of nodes by their distance from the root of the tree. **Internal use only.**
 * @param tree the root node of the tree.
 * @param nodesArray the array of nodes to sort.
 * @returns the sorted array of nodes.
 */
export function sortByPositionInTree<T extends { children?: T[] }>(tree: T, nodesArray: T[]): T[] {
  const result: T[] = []
  const allNodesSorted = () => nodesArray.length === result.length

  const addNodes = (treeNode: T, array: T[]) => {
    if (allNodesSorted()) return true

    if (array.includes(treeNode)) result.push(treeNode)
    if (!treeNode.children) return

    for (const child of treeNode.children) {
      if (allNodesSorted() || addNodes(child, array)) return true
    }
  }

  addNodes(tree, nodesArray)
  return result
}
