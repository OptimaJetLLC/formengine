import styled from '@emotion/styled'
import {define, node, oneOf, size} from '@react-form-builder/core'

const RsContainer = styled.div`
  display: flex;
`

export const rsContainer = define(RsContainer)
  .type('RsContainer')
  .name('Container')
  .kind('container')
  .props({
    children: node.hinted('Component children')
  })
  .css({
    flexDirection: oneOf('column', 'row', 'column-reverse', 'row-reverse')
      .default('column'),
    gap: size.default('10px'),
    alignItems: oneOf('start', 'center', 'baseline', 'end', 'stretch'),
    justifyContent: oneOf('flex-start', 'flex-end', 'center', 'space-between', 'space-around',
      'space-evenly', 'start', 'end', 'left', 'right'),
    flexWrap: oneOf('wrap', 'nowrap', 'wrap-reverse'),
  })
