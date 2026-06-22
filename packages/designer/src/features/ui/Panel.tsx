import {namedObserver} from '@react-form-builder/core'
import {ArrowDownLine} from '@rsuite/icons'
import cx from 'clsx'
import type {HTMLAttributes, PropsWithChildren} from 'react'
import {forwardRef, useCallback} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {TooltipPlacementProvider} from '../../utils/TooltipPlacementContext'
import styles from './Panel.module.css'
import type {PanelPlacement} from './PanelPlacement'

/**
 * Container div for panel layout. Uses CSS variable --panel-collapsed-size.
 */
export const PanelContainer = forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({className, ...props}, ref) => {
    return (
      <div
        ref={ref}
        className={cx(styles.container, className)}
        {...props}
      />
    )
  }
)
PanelContainer.displayName = 'PanelContainer'

/**
 * Properties of the form builder panel.
 */
export interface PanelProps extends PropsWithChildren<any> {
  /**
   * The panel placement.
   */
  placement: PanelPlacement
  /**
   * Flag, if true the collapsed panel will be hidden, false otherwise.
   */
  hideCollapsed?: boolean
  /**
   * Callback function called when the panel is collapsed/expanded.
   */
  onCollapse?: () => void
}

const RawPanel = ({
                    children,
                    placement = 'left',
                    hideCollapsed = true,
                    className,
                    onCollapse,
                    ...props
                  }: PanelProps) => {
  const store = useBuilderStore()
  const visible = !!store.openedPanels?.includes(placement)
  const collapsed = !visible
  const handleCollapse = useCallback(() => store.setPanelVisible(placement, !visible), [store, placement, visible])
  const tooltipPlacement = placement === 'right' ? 'autoHorizontal' : 'auto'

  return (
    <div {...props} className={cx(styles.container, className, placement, {collapsed})}>
      <TooltipPlacementProvider value={tooltipPlacement}>
        <div className={cx(styles.contentContainer, {collapsed, hideCollapsed})}>{children}</div>
      </TooltipPlacementProvider>
      <div className={cx(styles.hideButton, placement, {collapsed})} onClick={handleCollapse}>
        <ArrowDownLine className="icon"/>
      </div>
    </div>
  )
}

export const Panel = namedObserver('Panel', RawPanel)
