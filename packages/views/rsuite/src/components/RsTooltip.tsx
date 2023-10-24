import {define, node, oneOf, someOf, string, WrapperProps} from '@react-form-builder/core'
import {Tooltip, Whisper} from 'rsuite'
import type {TypeAttributes} from 'rsuite/esm/@types/common'
import type {OverlayTriggerType} from 'rsuite/esm/Overlay/OverlayTrigger'

/**
 * The properties of RsTooltip component.
 */
export interface RsTooltipProps extends WrapperProps {
  /**
   * The tooltip text.
   */
  text: string
  /**
   * The placement of a tooltip.
   */
  placement: TypeAttributes.Placement
  /**
   * The tooltip trigger.
   */
  trigger: OverlayTriggerType
}

const RsTooltip = ({text, placement, trigger, children}: RsTooltipProps) => {
  if (!children) return null

  return <Whisper placement={placement} trigger={trigger} speaker={<Tooltip>{text}</Tooltip>}>
    <div>{children}</div>
  </Whisper>
}

export const rsTooltip = define(RsTooltip)
  .type('RsTooltip')
  .name('Tooltip')
  .props({
    text: string.required.default('Tooltip message...').hinted('Tooltip text'),
    children: node,
    placement: oneOf('top', 'bottom', 'right', 'left', 'bottomStart', 'bottomEnd',
      'topStart', 'topEnd', 'leftStart', 'rightStart', 'leftEnd', 'rightEnd', 'auto',
      'autoVertical', 'autoVerticalStart', 'autoVerticalEnd', 'autoHorizontal', 'autoHorizontalStart')
      .required.default('bottom'),
    trigger: someOf('click', 'hover', 'focus', 'active', 'contextMenu')
      .required.default(['hover'])
  })
