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
  /**
   * The value of the HTML "for" attribute.
   */
  htmlFor?: string
  /**
   * The React child node.
   */
  children: ReactNode
  /**
   * The tooltip value.
   */
  hint?: ReactNode
  /**
   * The name of the CSS class of the tooltip.
   */
  className?: string
}

/**
 * React component properties for the {@link Hinted} component.
 */
export interface HintedProps extends Omit<WhisperProps, 'speaker'> {
  /**
   * The tooltip value.
   */
  hint?: ReactNode
  /**
   * The tooltip React node.
   */
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
  const tooltipPlacement = useTooltipPlacement()
  const placement = props.placement ?? tooltipPlacement

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
  /**
   * The tooltip text.
   */
  hint: string
  /**
   * The onClick event handler of the button.
   */
  onClick: () => void
  /**
   * The button icon.
   */
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
