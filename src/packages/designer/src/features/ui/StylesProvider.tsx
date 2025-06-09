import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {namedObserver} from '@react-form-builder/core'
import type {ComponentProps} from 'react'
import {useBuilderStore} from '../../utils/BuilderStoreContext'

const builderClassName = 'optimajet-formbuilder'

const SDiv = styled.div`
  height: 100%;
`

const RawStylesProvider = (props: ComponentProps<any>) => {
  const {theme} = useBuilderStore()
  return <SDiv className={cx(builderClassName, theme)}>
    {props.children}
  </SDiv>
}

export const StylesProvider = namedObserver('StylesProvider', RawStylesProvider)
