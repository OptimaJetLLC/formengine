import styled from '@emotion/styled'
import {ComponentTree, findTreeElementDepth, namedObserver, useComponentData} from '@react-form-builder/core'
import {ArrowDownLine as ArrowDownLineIcon, ArrowRightLine as ArrowRightLineIcon, Icon} from '@rsuite/icons'
import type {ComponentType} from 'react'
import {useCallback, useEffect, useRef, useState} from 'react'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../../utils/useComputed'
import {useSelection} from '../hooks/useSelection'
import {Toolbar} from './Toolbar'

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
  padding-inline-end: 8px;

  label {
    opacity: 0.4;
    margin-inline-start: 6px;
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

/**
 * TreeNode React component properties.
 */
export interface TreeNodeProps {
  /**
   * The CSS class name.
   */
  className: string

  /**
   * The component displaying an item.
   */
  componentDataViewer?: ComponentType
}

const iconStyle = {cursor: 'pointer'} as const

const RawTreeNode = ({className, componentDataViewer}: TreeNodeProps) => {
  const componentData = useComponentData()
  const {expanded: expandedNodes, viewer} = useBuilderStore()
  const [hovered, setHovered] = useState(false)
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  const findDepth = useCallback(() => findTreeElementDepth(viewer.form.componentTree, componentData) || 0,
    [componentData, viewer.form.componentTree])
  const depth = useComputed(findDepth)

  const expanded = expandedNodes.has(componentData)
  const toggleExpand = useCallback(() => {
    expandedNodes.has(componentData)
      ? expandedNodes.delete(componentData)
      : expandedNodes.add(componentData)
  }, [componentData, expandedNodes])

  const onMouseEnter = useCallback(() => setHovered(true), [])
  const onMouseLeave = useCallback(() => setHovered(false), [])

  useEffect(() => {
    if (selected && ref.current) {
      scrollIntoView(ref.current, {scrollMode: 'if-needed'})
    }
  }, [selected])

  const withChildren = (componentData.store.children?.length ?? 0) > 0
  const iconAs = expanded ? ArrowDownLineIcon : ArrowRightLineIcon

  return (
    <>
      <SNodeItem className={className} ref={ref}
                 onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
        <SIndent depth={depth}>
          {withChildren &&
            <Icon onClick={toggleExpand} as={iconAs} style={iconStyle}/>
          }
        </SIndent>
        <div data-testid={componentData.key}>{componentData.key}</div>
        <label>{componentData.model.name}</label>
        {hovered && <Toolbar compact/>}
      </SNodeItem>
      {expanded && componentData.children && <ComponentTree data={componentData.children} componentDataViewer={componentDataViewer}/>}
    </>
  )
}

export const TreeNode = namedObserver('TreeNode', RawTreeNode)
