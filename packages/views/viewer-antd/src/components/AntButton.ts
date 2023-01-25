import {Button} from 'antd'
import {ButtonHTMLType, ButtonShape, ButtonType} from 'antd/es/button/buttonHelpers'
import {SizeType} from 'antd/es/config-provider/SizeContext'
import {boolean, defineView, node, object, oneOf, string} from 'form-viewer'

// TODO use in render only view properties
export const antButtonView = defineView(Button)
  .typed('AntButton')
  .props({
    block: boolean,
    children: node.default('Ant Button'),
    danger: boolean,
    disabled: boolean,
    ghost: boolean,
    href: string.default(),
    htmlType: oneOf<ButtonHTMLType>().default('button'),
    loading: object<boolean | { delay?: number }>().default({delay: 5}),
    shape: oneOf<ButtonShape>().default('default'),
    size: oneOf<SizeType>().default('middle'),
    target: string,
    type: oneOf<ButtonType>().default('default'),
    // todo event
    // onClick: event
  })
  .build()
