import {ComponentTree, findTreeElementDepth, namedObserver, useComponentData} from '@react-form-builder/core'
import {ArrowDownLine as ArrowDownLineIcon, ArrowRightLine as ArrowRightLineIcon, Icon} from '@rsuite/icons'
import cx from 'clsx'
import type {ComponentType, CSSProperties} from 'react'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
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
  const {expanded: expandedNodes, viewer} = useBuilderStore()
  const [hovered, setHovered] = useState(false)
  const [{selected}] = useSelection()
  const ref = useRef<HTMLDivElement>(null)

  const findDepth = useCallback(() => findTreeElementDepth(viewer.form.componentTree, componentData) || 0,
    [componentData, viewer.form.componentTree])
  const depth = useComputed(findDepth)

  const expanded = expandedNodes.has(componentData)
  const toggleExpand = useCallback(() => {
    if (expandedNodes.has(componentData)) {
      expandedNodes.delete(componentData)
    } else {
      expandedNodes.add(componentData)
    }
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
  const indentWidth = 14 * (depth + 1) + 14
  const indentStyle = useMemo(() => ({'--tree-node-indent-width': `${indentWidth}px`} as CSSProperties), [indentWidth])

  return (
    <>
      <div
        ref={ref}
        className={cx(styles.nodeItem, className, hovered && styles.hovered, selected && styles.selected)}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className={styles.indent} style={indentStyle}>
          {withChildren && <Icon onClick={toggleExpand} as={iconAs} className={styles.icon}/>}
        </div>
        <div data-testid={componentData.key}>{componentData.key}</div>
        <label>{componentData.model.name}</label>
        {hovered && <Toolbar compact/>}
      </div>
      {expanded && componentData.children && <ComponentTree data={componentData.children} componentDataViewer={componentDataViewer}/>}
    </>
  )
}

export const TreeNode = namedObserver('TreeNode', RawTreeNode)
