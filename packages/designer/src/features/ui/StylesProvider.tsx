import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import type {ComponentProps} from 'react'

const builderClassName = 'optimajet-formbuilder'

const SDiv = styled.div`
  height: 100%;
`

const RawStylesProvider = (props: ComponentProps<any>) => {
  return <SDiv className={builderClassName}>
    {props.children}
  </SDiv>
}

export const StylesProvider = namedObserver('StylesProvider', RawStylesProvider)
