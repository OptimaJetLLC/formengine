import styled from '@emotion/styled'
import {useComponentData, useComponentTree} from '@react-form-builder/core'
import {Icon} from '@rsuite/icons'
import ArrowDownLineIcon from '@rsuite/icons/ArrowDownLine.js'
import ArrowRightLineIcon from '@rsuite/icons/ArrowRightLine.js'
import {observer} from 'mobx-react'
import {useCallback, useEffect, useRef, useState} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../../utils/useComputed'
import {useSelection} from '../hooks/useSelection'
import {Toolbar} from './Toolbar'

export const TreeNode = observer(({className}: { className: string }) => {
  const ComponentTree = useComponentTree()
  const componentData = useComponentData()
  const {expanded: expandedNodes, viewer} = useBuilderStore()
  const deep = useComputed(() => findDepth(viewer.screen, componentData.key) ?? 0)
  const [hovered, setHovered] = useState(false)
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  const expanded = expandedNodes.has(componentData.store)
  const toggleExpand = useCallback(() => {
    expandedNodes.has(componentData.store)
      ? expandedNodes.delete(componentData.store)
      : expandedNodes.add(componentData.store)
  }, [])

  useEffect(() => {
    if (selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected, ref.current])

  return (
    <>
      <SNodeItem className={className} ref={ref}
                 onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        <SIndent deep={deep}>
          {componentData.store.children &&
            <Icon onClick={toggleExpand} as={expanded ? ArrowDownLineIcon : ArrowRightLineIcon} style={{cursor: 'pointer'}}/>
          }
        </SIndent>
        <div>{`${componentData.key}`}</div>
        <label>{`${componentData.model.name}`}</label>
        {hovered && <Toolbar compact/>}
      </SNodeItem>
      {expanded && componentData.children && <ComponentTree data={componentData.children}/>}
    </>
  )
})

const SIndent = styled.div<{ deep: number }>`
  min-width: ${({deep}) => 14 * (deep + 1) + 14}px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: end;
  padding-inline-end: 4px;
`

const SNodeItem = styled.div`
  display: flex;
  flex: 1;
  justify-content: start;
  flex-direction: row;
  padding-block: 8px;
  padding-right: 8px;

  label {
    opacity: 0.4;
    margin-left: 6px;
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

function findDepth<T extends { key: string, children?: T[] }>(value: T, key?: string, depth = 0): number | undefined {
  if (value.key === key) return depth

  if (!value.children) return

  depth = depth + 1
  for (const child of value.children) {
    const childNode = findDepth(child, key, depth)
    if (childNode) return childNode
  }

  return
}
