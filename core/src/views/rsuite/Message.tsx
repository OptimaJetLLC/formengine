import {define} from '../../features/define'
import {boolean, oneOf, string} from '../../features/annotation'
import {Message} from 'rsuite'

export const message = define(Message)
  .props({
    // children: reactElements,
    closeable: boolean,
    header: string.default('Test'),
    type: oneOf('info', 'success', 'warning', 'error').default("info")
  })
