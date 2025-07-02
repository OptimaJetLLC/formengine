import {boolean, define, disabled, event, oneOf, string} from '@react-form-builder/core'
import {Button} from 'antd'

export const antButton = define(Button, 'AntButton')
  .name('Ant Button')
  .props({
    block: boolean.hinted('Option to fit button width to its parent width').default(false),
    children: string.required.named('Content').hinted('Caption').default('Ant Button').dataBound,
    danger: boolean.hinted('Set the danger status of button').default(false),
    disabled: disabled.hinted('Disabled state of button').default(false),
    ghost: boolean.hinted('Make background transparent and invert text and border colors').default(false),
    href: string.hinted('Redirect url of link button'),
    htmlType: string.hinted(<>Set the original html type of button,
      see: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type" target="_blank">MDN</a></>)
      .default('button'),
    loading: boolean.hinted('Set the loading status of button').default(true),
    shape: oneOf('default', 'circle', 'round').hinted('Can be set button shape').default('default'),
    size: oneOf('large', 'middle', 'small').hinted('Set the size of button').default('middle'),
    target: string.hinted('Same as target attribute of a, works when href is specified'),
    type: oneOf('primary', 'ghost', 'dashed', 'link', 'text', 'default')
      .hinted('Can be set to primary ghost dashed link text default').default('default'),
    onClick: event
  })
