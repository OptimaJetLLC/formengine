import styled from '@emotion/styled'
import {BiDi} from '@react-form-builder/core'
import {ReactNode} from 'react'
import type {WhisperProps} from 'rsuite'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'

/**
 * React component properties for the {@link HintedLabel} component.
 */
export interface HintedLabelProps {
  htmlFor?: string
  children: ReactNode
  hint?: ReactNode
  className?: string
}

/**
 * React component properties for the {@link Hinted} component.
 */
export interface HintedProps extends Omit<WhisperProps, 'speaker'> {
  hint?: ReactNode
  speaker?: ReactNode
}

/**
 * The React form builder component that wraps the children component and displays the label with the tooltip.
 * @param props the React component properties.
 * @param props.hint the tooltip text.
 * @param props.children the wrapped children component.
 * @param props.labelProps the label component properties.
 * @returns the React element.
 * @internal
 */
export const HintedLabel = ({hint, children, ...labelProps}: HintedLabelProps) => {
  if (!hint) return <SLabel {...labelProps}>{children}</SLabel>
  return <Hinted hint={hint}>
    <SLabel {...labelProps} hinted>{children}</SLabel>
  </Hinted>
}

/**
 * The React form builder component that wraps the children component and displays a tooltip.
 * @param props the React component properties.
 * @param props.hint the tooltip text.
 * @param props.children the wrapped children component.
 * @returns the React element.
 * @internal
 */
export const Hinted = ({hint, children}: HintedProps) => {
  const store = useBuilderStore()
  if (!hint) return <>{children}</>

  const placement = store.language.bidi == BiDi.RTL ? 'right' : 'left'

  return <Whisper speaker={<Tooltip>{hint}</Tooltip>} placement={placement} trigger={'hover'}>
    {children}
  </Whisper>
}

const SLabel = styled.label<{ hinted?: boolean }>`
  min-width: 80px;

  ${({hinted}) => hinted && `
    :hover {
      text-decoration: underline;
      text-decoration-style: dotted;
    }
  `};
`
