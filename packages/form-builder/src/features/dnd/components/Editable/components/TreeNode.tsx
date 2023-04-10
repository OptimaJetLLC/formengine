import styled from '@emotion/styled'
import {useComponentData, useComponentTree, useComputed, useStore} from 'fb-core'

export const TreeNode = () => {
  const ComponentTree = useComponentTree()
  const data = useComponentData()
  const store = useStore()
  const deep = useComputed(() => findDepth(store.screen, data.componentStore.key) ?? 0)

  return (
    <>
      <SDiv style={{paddingLeft: 10 * deep}}>
        <div>{`${data.key}`}</div>
        <label>{`${data.model.name}`}</label>
      </SDiv>
      <ComponentTree parentStore={data.componentStore} data={data.componentStore.children}/>
    </>
  )
}
const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  margin: 8px;

  label {
    opacity: 0.4;
    margin-left: 10px;
  }
`

export function findDepth<T extends { key: string, children?: T[] }>(value: T, key?: string, depth = 0): number | undefined {
  if (value.key === key) return depth

  if (!value.children) return

  depth = depth + 1
  for (let child of value.children) {
    let childNode = findDepth(child, key, depth)
    if (childNode) return childNode
  }

  return
}
