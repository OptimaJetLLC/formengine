import styled from '@emotion/styled'
import React, {DetailedHTMLProps, LabelHTMLAttributes} from 'react'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../../utils/contexts/BuilderStoreContext'
import {BiDi} from '../../localization/consts'

export interface HintedLabelProps extends DetailedHTMLProps<LabelHTMLAttributes<HTMLLabelElement>, HTMLLabelElement> {
  hint?: string
}

export const HintedLabel = (props: HintedLabelProps) => {
  const store = useBuilderStore()

  const {hint, children, ...labelProps} = props
  if (!hint) return <label {...labelProps}>{children}</label>

  const placement = store.language.bidi == BiDi.RTL ? 'right' : 'left'
  return <Whisper placement={placement} speaker={<Tooltip>{hint}</Tooltip>} trigger={'hover'}>
    <SLabel {...labelProps}>{children}</SLabel>
  </Whisper>
}

const SLabel = styled.label`
  width: 100px;
  min-width: 80px;

  :hover {
    text-decoration: underline;
    text-decoration-style: dotted;
  }
`
