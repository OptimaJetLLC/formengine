import type {WrapperProps} from '@react-form-builder/core'
import {define, node, oneOf, someOf, string} from '@react-form-builder/core'
import {Tooltip} from 'antd'

type ActionType = 'hover' | 'focus' | 'click' | 'contextMenu'
type TooltipPlacement =
  | 'top'
  | 'left'
  | 'right'
  | 'bottom'
  | 'topLeft'
  | 'topRight'
  | 'bottomLeft'
  | 'bottomRight'
  | 'leftTop'
  | 'leftBottom'
  | 'rightTop'
  | 'rightBottom'

interface AntTooltipProps extends WrapperProps {
  text: string
  placement: TooltipPlacement
  trigger?: ActionType | ActionType[]
}

const tooltipStyle = {width: '100%', height: '100%'}

const AntTooltip = ({text, placement, trigger, children, ...props}: AntTooltipProps) => {
  if (!children) return null

  return (
    <Tooltip placement={placement} trigger={trigger} title={text}>
      <div style={tooltipStyle} {...props}>
        {children}
      </div>
    </Tooltip>
  )
}

export const antTooltip = define(AntTooltip, 'AntTooltip')
  .category('antd')
  .props({
    text: string.required.default('Tooltip message...').dataBound,
    children: node,
    placement: oneOf(
      'top',
      'left',
      'right',
      'bottom',
      'topLeft',
      'topRight',
      'bottomLeft',
      'bottomRight',
      'leftTop',
      'leftBottom',
      'rightTop',
      'rightBottom'
    ).required.default('bottom'),
    trigger: someOf('hover', 'focus', 'click', 'contextMenu').required.default(['hover']),
  })
  .componentRole('tooltip')
