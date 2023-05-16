import styled from '@emotion/styled'
import {boolean, define, node, oneOf} from '@react-form-builder/builder/view'
import {Message} from 'rsuite'

const SMessage = styled(Message)`
  .rs-message-header {
    overflow: initial;
  }
`

export const rsMessage = define(SMessage)
  .type('RsMessage')
  .props({
    children: node,
    closeable: boolean,
    header: node,
    type: oneOf('info', 'success', 'warning', 'error').default('info')
  })
