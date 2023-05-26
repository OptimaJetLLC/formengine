import styled from '@emotion/styled'
import {useComponentData, useComponentTree, useComputed} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine.js'
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine.js'
import {observer} from 'mobx-react'
import {useCallback, useEffect, useRef, useState} from 'react'
import {IconButton} from 'rsuite'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useSelection} from '../hooks/useSelection'
import {Toolbar} from './Toolbar'

export const TreeNode = observer(({className}: { className: string }) => {
  const ComponentTree = useComponentTree()
  const data = useComponentData()
  const store = useBuilderStore()
  const deep = useComputed(() => findDepth(store.viewer.screen, data.store.key) ?? 0)
  const [hovered, setHovered] = useState(false)
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  const expanded = store.expanded.has(data.store)
  const toggleExpand = useCallback(() => {
    store.expanded.has(data.store)
      ? store.expanded.delete(data.store)
      : store.expanded.add(data.store)
  }, [])

  useEffect(() => {
    if (selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, ref.current])

  return (
    <>
      <SDiv style={{paddingLeft: 10 * deep}} className={className} ref={ref}
            onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <IconButton size="xs" onClick={toggleExpand} appearance="subtle"
                    icon={<Icon as={expanded ? ArrowDownLineIcon : ArrowRightLineIcon}/>}/>
        <div>{`${data.key}`}</div>
        <label>{`${data.model.name}`}</label>
        {hovered && <Toolbar compact/>}
      </SDiv>
      {data.store.children && <ComponentTree parentStore={data.store} data={data.store.children}/>}
    </>
  )
})

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
  for (const child of value.children) {
    const childNode = findDepth(child, key, depth)
    if (childNode) return childNode
  }

  return
}
