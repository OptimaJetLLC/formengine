import {boolean, define, node, oneOf} from 'form-builder'
import {Message} from 'rsuite'

export const rsMessage = define(Message)
  .typed('RsMessage')
  .props({
    children: node,
    closeable: boolean,
    header: node,
    type: oneOf('info', 'success', 'warning', 'error').default('info')
  })
