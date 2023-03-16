import {Button} from 'antd'
import {ButtonHTMLType, ButtonShape, ButtonType} from 'antd/es/button/buttonHelpers'
import {SizeType} from 'antd/es/config-provider/SizeContext'
import {defineView, simplified} from 'fb-core'

// TODO use in render only view properties
export const antButtonView = defineView(Button)
  .typed('AntButton')
  .props({
    block: simplified.boolean,
    children: simplified.node.default('Ant Button'),
    danger: simplified.boolean,
    disabled: simplified.boolean,
    ghost: simplified.boolean,
    href: simplified.string.default(),
    htmlType: simplified.oneOf<ButtonHTMLType>().default('button'),
    loading: simplified.object<boolean | { delay?: number }>().default({delay: 5}),
    shape: simplified.oneOf<ButtonShape>().default('default'),
    size: simplified.oneOf<SizeType>().default('middle'),
    target: simplified.string,
    type: simplified.oneOf<ButtonType>().default('default'),
    // todo event
    // onClick: event
  })
  .build()
