import styled from '@emotion/styled'
import {ComponentTree, findTreeElementDepth, namedObserver, useComponentData} from '@react-form-builder/core'
import {ArrowDownLine as ArrowDownLineIcon, ArrowRightLine as ArrowRightLineIcon, Icon} from '@rsuite/icons'
import {useCallback, useEffect, useRef, useState} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../../utils/useComputed'
import {useSelection} from '../hooks/useSelection'
import {Toolbar} from './Toolbar'

/**
 * TreeNode React component properties.
 */
export interface TreeNodeProps {
  /**
   * The CSS class name.
   */
  className: string
}

export const TreeNode = namedObserver('TreeNode', ({className}: TreeNodeProps) => {
  const componentData = useComponentData()
  const {expanded: expandedNodes, viewer} = useBuilderStore()
  const depth = useComputed(() => findTreeElementDepth(viewer.form.componentTree, componentData) ?? 0)
  const [hovered, setHovered] = useState(false)
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  const expanded = expandedNodes.has(componentData)
  const toggleExpand = useCallback(() => {
    expandedNodes.has(componentData)
      ? expandedNodes.delete(componentData)
      : expandedNodes.add(componentData)
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
        <SIndent depth={depth}>
          {componentData.store.children &&
            <Icon onClick={toggleExpand} as={expanded ? ArrowDownLineIcon : ArrowRightLineIcon} style={{cursor: 'pointer'}}/>
          }
        </SIndent>
        <div>{componentData.key}</div>
        <label>{componentData.model.name}</label>
        {hovered && <Toolbar compact/>}
      </SNodeItem>
      {expanded && componentData.children && <ComponentTree data={componentData.children}/>}
    </>
  )
})

const SIndent = styled.div<{ depth: number }>`
  min-width: ${({depth}) => 14 * (depth + 1) + 14}px;
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


