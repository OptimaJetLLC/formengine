import {boolean, defineBuilder, event, oneOf, string} from 'form-builder'
import {antButtonView} from 'viewer-antd'

export const antButton = defineBuilder(antButtonView)
  .named('AntButton')
  .props({
    block: boolean.hinted('Option to fit button width to its parent width'),
    children: string.required.named('Content').hinted('Caption'),
    danger: boolean.hinted('Set the danger status of button'),
    disabled: boolean.hinted('Disabled state of button'),
    ghost: boolean.hinted('Make background transparent and invert text and border colors'),
    href: string.hinted('Redirect url of link button'),
    htmlType: string.hinted(<>Set the original html type of button,
      see: <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/button#attr-type" target="_blank">MDN</a></>),
    // icon: node.hinted('Set the icon component of button'), // todo enable after DnD fix
    loading: boolean.hinted('Set the loading status of button'), // todo boolean | { delay: number }
    shape: oneOf('default', 'circle', 'round').hinted('Can be set button shape'),
    size: oneOf('large', 'middle', 'small').hinted('Set the size of button'),
    target: string.hinted('Same as target attribute of a, works when href is specified'),
    type: oneOf('primary', 'ghost', 'dashed', 'link', 'text', 'default')
      .hinted('Can be set to primary ghost dashed link text default'),
    onClick: event
  })
