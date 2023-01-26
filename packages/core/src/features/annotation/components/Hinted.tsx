import styled from '@emotion/styled'
import {ReactNode} from 'react'
import {Tooltip, Whisper} from 'rsuite'
import {WhisperProps} from 'rsuite/esm/Whisper/Whisper'
import {useBuilderStore} from '../../../utils/contexts/BuilderStoreContext'
import {BiDi} from '../../localization/bidi'

export interface HintedLabelProps extends HintedProps {
  htmlFor?: string
}

export interface HintedProps extends Omit<WhisperProps, 'speaker'> {
  hint?: ReactNode
  speaker?: ReactNode
}

export const HintedLabel = ({hint, children, ...labelProps}: HintedLabelProps) => {
  if (!hint) return <label {...labelProps}>{children}</label>
  return <Hinted hint={hint}>
    <SLabel {...labelProps}>{children}</SLabel>
  </Hinted>
}

export const Hinted = ({hint, children, speaker, ...props}: HintedProps) => {
  if (!hint) return <>{children}</>

  const store = useBuilderStore()
  const placement = store.language.bidi == BiDi.RTL ? 'right' : 'left'

  return <Whisper speaker={<Tooltip>{hint}</Tooltip>} placement={placement} trigger={'hover'} {...props}>
    {children}
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
