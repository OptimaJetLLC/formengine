import styled from '@emotion/styled'
import {useComponentData, useComponentTree, useComputed, useStore} from 'fb-core'
import {useEffect, useRef, useState} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useSelection} from '../hooks/useSelection'
import {Toolbar} from './Toolbar'

export const TreeNode = ({className}: { className: string }) => {
  const ComponentTree = useComponentTree()
  const data = useComponentData()
  const store = useStore()
  const deep = useComputed(() => findDepth(store.screen, data.componentStore.key) ?? 0)
  const [hovered, setHovered] = useState(false)
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, ref.current])

  return (
    <>
      <SDiv style={{paddingLeft: 10 * deep}} className={className} ref={ref}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <div>{`${data.key}`}</div>
        <label>{`${data.model.name}`}</label>
        {hovered && <Toolbar/>}
      </SDiv>
      <ComponentTree parentStore={data.componentStore} data={data.componentStore.children}/>
    </>
  )
}
const SDiv = styled.div`
  display: flex;
  flex-direction: row;
  font-weight: bold;
  padding: 8px;

  label {
    opacity: 0.4;
    margin-left: 10px;
  }

  &.hovered {
    background-color: var(--rs-listbox-option-selected-bg);
    cursor: pointer !important;
  }

  &.selected {
    background-color: var(--rs-listbox-option-selected-bg);
    color: var(--rs-listbox-option-selected-text);
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
