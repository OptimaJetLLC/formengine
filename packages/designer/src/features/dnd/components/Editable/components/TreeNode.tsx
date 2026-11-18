import {ComponentTree, findTreeElementDepth, getVisualChildren, namedObserver, useComponentData} from '@react-form-builder/core'
import {ArrowDownLine as ArrowDownLineIcon, ArrowRightLine as ArrowRightLineIcon, Icon} from '@rsuite/icons'
import cx from 'clsx'
import type {ComponentType, CSSProperties, MouseEvent} from 'react'
import {useCallback, useEffect, useMemo, useState} from 'react'
import {useDragLayer} from 'react-dnd'
import scrollIntoView from 'scroll-into-view-if-needed'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {useComputed} from '../../../../../utils/useComputed'
import {useSelection} from '../hooks/useSelection'
import {Toolbar} from './Toolbar'
import styles from './TreeNode.module.css'

/**
 * TreeNode React component properties.
 */
interface TreeNodeProps {
  /**
   * The CSS class name.
   */
  className: string

  /**
   * The component displaying an item.
   */
  componentDataViewer?: ComponentType
}

const RawTreeNode = ({className, componentDataViewer}: TreeNodeProps) => {
  const componentData = useComponentData()
  const {expanded: expandedNodes, viewer, leftPanel} = useBuilderStore()
  const {treeReveal} = leftPanel
  const [{selected}] = useSelection()
  const {isDragging} = useDragLayer(monitor => ({isDragging: monitor.isDragging()}))
  const [hovered, setHovered] = useState(false)
  const [row, setRow] = useState<HTMLDivElement | null>(null)

  const findDepth = useCallback(
    () => findTreeElementDepth(viewer.form.componentTree, componentData) || 0,
    [componentData, viewer.form.componentTree]
  )
  const depth = useComputed(findDepth)

  const expanded = expandedNodes.has(componentData)
  const toggleExpand = useCallback(() => {
    if (expandedNodes.has(componentData)) {
      expandedNodes.delete(componentData)
    } else {
      expandedNodes.add(componentData)
    }
  }, [componentData, expandedNodes])

  useEffect(() => {
    if (selected && row) {
      scrollIntoView(row, {scrollMode: 'if-needed'})
    }
  }, [row, selected])

  useEffect(() => {
    if (treeReveal?.key !== componentData.key || !row) {
      return
    }
    scrollIntoView(row, {scrollMode: 'if-needed'})
    leftPanel.clearTreeReveal(treeReveal.id)
  }, [componentData.key, leftPanel, row, treeReveal])

  const showToolbar = useCallback(() => setHovered(true), [])
  const hideToolbar = useCallback((event: MouseEvent<HTMLDivElement>) => {
    if (event.relatedTarget instanceof Node && event.currentTarget.contains(event.relatedTarget)) return
    setHovered(false)
  }, [])

  const visualChildren = getVisualChildren(componentData)
  const withChildren = visualChildren.length > 0
  const iconAs = expanded ? ArrowDownLineIcon : ArrowRightLineIcon
  const indentWidth = 14 * (depth + 1) + 14
  const indentStyle = useMemo(() => ({'--tree-node-indent-width': `${indentWidth}px`}) as CSSProperties, [indentWidth])

  return (
    <>
      <div
        ref={setRow}
        data-testid={componentData.key}
        className={cx(styles.nodeItem, className, selected && styles.selected)}
        onMouseEnter={showToolbar}
        onMouseMove={showToolbar}
        onMouseLeave={hideToolbar}
      >
        <div className={styles.indent} style={indentStyle}>
          {withChildren && <Icon onClick={toggleExpand} as={iconAs} className={styles.icon} />}
        </div>
        <div>{componentData.key}</div>
        <label>{componentData.model.name}</label>
        {hovered && !isDragging && row && <Toolbar compact anchor={row} />}
      </div>
      {expanded && withChildren && <ComponentTree data={visualChildren} componentDataViewer={componentDataViewer} />}
    </>
  )
}

export const TreeNode = namedObserver('TreeNode', RawTreeNode)
