import styled from '@emotion/styled'
import {containerStyles, define, node} from '@react-form-builder/core'

const RsContainer = styled.div`
  display: flex;
`
const {flexDirection, gap} = containerStyles

export const rsContainer = define(RsContainer, 'RsContainer')
  .name('Container')
  .kind('container')
  .props({
    children: node.hinted('Component children')
  })
  .css({
    ...containerStyles,
    flexDirection: flexDirection.default('column'),
    gap: gap.default('10px')
  })
