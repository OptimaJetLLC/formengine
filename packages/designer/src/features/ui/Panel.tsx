import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import {ArrowDownLine} from '@rsuite/icons'
import type {PropsWithChildren} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {TooltipPlacementProvider} from '../../utils/TooltipPlacementContext'
import type {PanelPlacement} from './PanelPlacement'

interface CollapsedSizeProps {
  collapsedSize?: number
}

/**
 * Properties of the form builder panel.
 */
export interface PanelProps extends PropsWithChildren<any>, CollapsedSizeProps {
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
  onCollapse?: Function
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
  const handleCollapse = () => store.setPanelVisible(placement, !visible)
  const tooltipPlacement = placement === 'right' ? 'autoHorizontal' : 'auto'

  return <PanelContainer className={cx(className, placement, {collapsed})} {...props}>
    <TooltipPlacementProvider value={tooltipPlacement}>
      <ContentContainer className={cx({collapsed, hideCollapsed})}>{children}</ContentContainer>
    </TooltipPlacementProvider>
    <HideButton className={cx(placement, {collapsed})} onClick={handleCollapse}>
      <ArrowDownLine className={'icon'}/>
    </HideButton>
  </PanelContainer>
}

export const Panel = namedObserver('Panel', RawPanel)

const transition = '200ms ease-in-out'

export const ContentContainer = styled.div`
  min-height: 0;
  display: flex;
  flex-direction: column;
  flex: 1;
  transition: opacity ${transition}, width 0ms 200ms;

  .right &, .left & {
    width: 280px;
    overflow: hidden;
  }

  &.collapsed.hideCollapsed {
    opacity: 0;

    .right &, .left & {
      width: 0;
    }
  }
`

export const HideButton = styled.div`
  position: absolute;
  display: flex;
  overflow: hidden;
  align-items: center;
  cursor: pointer;
  border-radius: 20px;

  .icon {
    font-size: 2em;
    opacity: 0.6;
    position: absolute;
  }

  &.right, &.left {
    width: 20px;
    height: 80px;
    inset-block-start: 50%;
    transform: translateY(-50%);

    .icon {
      inset-inline-end: -5px;
    }
  }

  &.bottom {
    left: 50%;
    width: 80px;
    height: 20px;
    justify-content: center;
    inset-block-start: -10px;
    transform: translateX(-50%);

    .icon {
      inset-block-end: -5px;
    }
  }

  &.left {
    inset-inline-end: -15px;

    .icon {
      transform: rotate(90deg);
    }
  }

  &.right {
    inset-inline-start: -15px;

    .icon {
      transform: rotate(-90deg);
    }
  }


  &.collapsed {
    &.left .icon {
      transform: rotate(-90deg);
    }

    &.right .icon {
      transform: rotate(90deg);
    }

    &.bottom .icon {
      transform: rotate(180deg);
    }
  }
`

export const PanelContainer = styled.div<CollapsedSizeProps>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 5px;
  transition: width ${transition}, height ${transition};

  &.right, &.left {
    max-height: 1200px;
    width: 290px;
  }

  &.right {
    box-shadow: none;
  }

  &.bottom {
    height: 380px;
    width: 100%;
    margin-block: 0;
  }

  &.collapsed {
    &.right, &.left {
      width: ${props => props.collapsedSize ?? 5}px;
    }

    &.bottom {
      height: ${props => props.collapsedSize ?? 5}px;
    }
  }
`
