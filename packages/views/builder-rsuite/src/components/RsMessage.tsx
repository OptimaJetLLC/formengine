import {boolean, define, oneOf, string} from 'form-builder'
import {Message} from 'rsuite'

export const rsMessage = define(Message)
  .typed('RsMessage')
  .props({
    // children: reactElements,
    closeable: boolean,
    header: string.default('Test'),
    type: oneOf('info', 'success', 'warning', 'error').default('info')
  })
