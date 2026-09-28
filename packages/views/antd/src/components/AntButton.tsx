import {boolean, define, disabled, event, oneOf, string, useBuilderValue} from '@react-form-builder/core'
import type {ButtonProps} from 'antd'
import {Button} from 'antd'

const defaultContent = 'Ant Button'

const AntButton = ({children, ...props}: ButtonProps) => {
  const content = useBuilderValue(children, defaultContent)
  return <Button {...props}>{content}</Button>
}

export const antButton = define(AntButton, 'AntButton')
  .category('antd')
  .props({
    block: boolean.default(false),
    children: string.required.default(defaultContent).dataBound,
    danger: boolean.default(false),
    disabled: disabled.default(false),
    ghost: boolean.default(false),
    href: string,
    htmlType: string.default('button'),
    loading: boolean,
    shape: oneOf('default', 'circle', 'round').default('default'),
    size: oneOf('large', 'middle', 'small').default('middle'),
    target: string,
    type: oneOf('primary', 'ghost', 'dashed', 'link', 'text', 'default').default('default'),
    onClick: event,
  })
