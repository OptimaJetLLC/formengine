import type {IconDefinition} from '@fortawesome/fontawesome-common-types'
import * as faSitemap from '@fortawesome/free-solid-svg-icons/faSitemap.js'
import type {ComponentData} from '@react-form-builder/core'
import {namedObserver, useComponentData} from '@react-form-builder/core'
import cx from 'clsx'
import type {CSSProperties, MouseEvent} from 'react'
import {useCallback, useMemo, useRef} from 'react'
import type {WhisperInstance} from 'rsuite'
import {Popover, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../../../utils/BuilderStoreContext'
import {stopEvent} from '../../../../../utils/stopEvent'
import {Hinted} from '../../../../annotation-editors/Hinted'
import {FaIcon} from '../../../../components/Icons'
import {useTranslationPart} from '../../../../localization/hooks'
import styles from './NearbyTreeButton.module.css'
import {overlayRoot} from './overlayRoot'

interface NearbyTreeNode {
  data: ComponentData
  depth: number
  isCurrent: boolean
}

interface NearbyTreePopoverProps {
  nodes: NearbyTreeNode[]
  onSelectNode: (target: ComponentData) => (event: MouseEvent) => void
}

/**
 * Builds a nearby subtree: all ancestors, the current component, and its direct children.
 * @param current the currently selected component.
 * @returns the nearby tree nodes in display order.
 */
function getNearbyTreeNodes(current: ComponentData): NearbyTreeNode[] {
  const ancestors: ComponentData[] = []
  let ancestor = current.parent
  while (ancestor) {
    ancestors.unshift(ancestor)
    ancestor = ancestor.parent
  }

  const currentDepth = ancestors.length
  return [
    ...ancestors.map((data, depth) => ({data, depth, isCurrent: false})),
    {data: current, depth: currentDepth, isCurrent: true},
    ...current.children.map(child => ({data: child, depth: currentDepth + 1, isCurrent: false})),
  ]
}

const NearbyTreePopover = ({nodes, onSelectNode}: NearbyTreePopoverProps) => (
  <div className={styles.tree}>
    {nodes.map(node => (
      <button
        key={node.data.id}
        type="button"
        className={cx(styles.item, node.isCurrent && styles.current)}
        style={{'--nearby-tree-depth': node.depth} as CSSProperties}
        data-testid={`nearby-tree-item-${node.data.key}`}
        aria-current={node.isCurrent ? 'true' : undefined}
        onClick={onSelectNode(node.data)}
      >
        <span>{node.data.key}</span>
        <span className={styles.type}>{node.data.model.name}</span>
      </button>
    ))}
  </div>
)

const RawNearbyTreeButton = () => {
  const builderStore = useBuilderStore()
  const data = useComponentData()
  const t = useTranslationPart('toolbar')
  const whisperRef = useRef<WhisperInstance>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const hint = t('nearbyTree')
  const nodes = getNearbyTreeNodes(data)

  const onSelectNode = useCallback(
    (target: ComponentData) => (event: MouseEvent) => {
      stopEvent(event)
      whisperRef.current?.close()
      builderStore.selectNode(target)
    },
    [builderStore]
  )

  const getRoot = useCallback(() => overlayRoot(triggerRef.current), [])

  const speaker = useMemo(
    () => (
      <Popover className={styles.popover} arrow={false}>
        <NearbyTreePopover nodes={nodes} onSelectNode={onSelectNode} />
      </Popover>
    ),
    [nodes, onSelectNode]
  )

  return (
    <Whisper
      placement={builderStore.isRTL ? 'rightStart' : 'leftStart'}
      speaker={speaker}
      ref={whisperRef}
      trigger="click"
      preventOverflow
      container={getRoot}
    >
      <button
        type="button"
        ref={triggerRef}
        data-testid="nearby-tree-button"
        className={cx('nearby-tree-button', styles.trigger)}
        aria-label={hint}
      >
        <Hinted hint={hint} placement={'autoVertical'}>
          <FaIcon icon={faSitemap as unknown as IconDefinition} />
        </Hinted>
      </button>
    </Whisper>
  )
}

/**
 * Toolbar button that shows a nearby component subtree and selects a clicked node.
 * @returns the nearby tree button.
 */
export const NearbyTreeButton = namedObserver('NearbyTreeButton', RawNearbyTreeButton)
