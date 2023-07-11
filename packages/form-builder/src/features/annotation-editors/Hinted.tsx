import styled from '@emotion/styled'
import {ReactNode} from 'react'
import type {WhisperProps} from 'rsuite'
import {Tooltip, Whisper} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import {BiDi} from '../localization/bidi'

/**
 * React component properties for the {@link HintedLabel} component.
 */
export interface HintedLabelProps extends HintedProps {
  htmlFor?: string
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
 * @param props.speaker the display element (unused).
 * @param props.props the other properties of the component.
 * @returns the React element.
 * @internal
 */
export const Hinted = ({hint, children, speaker, ...props}: HintedProps) => {
  const store = useBuilderStore()
  if (!hint) return <>{children}</>

  const placement = store.language.bidi == BiDi.RTL ? 'right' : 'left'

  return <Whisper speaker={<Tooltip>{hint}</Tooltip>} placement={placement} trigger={'hover'} {...props}>
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
