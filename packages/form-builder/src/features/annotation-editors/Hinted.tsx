import styled from '@emotion/styled'
import type {IconProps} from '@rsuite/icons/lib/Icon'
import type {ReactElement, ReactNode} from 'react'
import type {WhisperProps} from 'rsuite'
import {IconButton, Tooltip, Whisper} from 'rsuite'
import {useTooltipPlacement} from '../../utils/TooltipPlacementContext'

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
export const Hinted = ({hint, children, ...props}: HintedProps) => {
  const placement = props.placement ?? useTooltipPlacement()

  if (!hint) return <>{children}</>

  return <Whisper speaker={<Tooltip>{hint}</Tooltip>} placement={placement} trigger={'hover'}>
    {children}
  </Whisper>
}

/**
 * React component properties for the {@link HintedIconButton} component.
 * @internal
 */
export interface HintedIconButtonProps {
  hint: string
  onClick: () => void
  icon: ReactElement<IconProps>
}

/**
 * The React form builder component that displays hinted icon button.
 * @param props the React component properties.
 * @param props.hint the tooltip text.
 * @returns the React element.
 * @internal
 */
export const HintedIconButton = ({hint, ...props}: HintedIconButtonProps) => {
  return <Hinted hint={hint} placement={'bottom'}>
    <IconButton {...props} size="xs"/>
  </Hinted>
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
