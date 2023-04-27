import {define, node, oneOf, someOf, string, WrapperProps} from 'form-builder/view'
import {Tooltip, Whisper} from 'rsuite'
import {TypeAttributes} from 'rsuite/esm/@types/common'
import {OverlayTriggerType} from 'rsuite/esm/Overlay/OverlayTrigger'

interface RsTooltipProps extends WrapperProps {
  text: string
  placement: TypeAttributes.Placement
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
