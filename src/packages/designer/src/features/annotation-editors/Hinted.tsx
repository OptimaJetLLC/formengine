import type {IconProps} from '@rsuite/icons/Icon'
import cx from 'clsx'
import type {ReactElement, ReactNode} from 'react'
import {useMemo} from 'react'
import type {WhisperProps} from 'rsuite'
import {IconButton, Tooltip, Whisper} from 'rsuite'
import type {TypeAttributes} from 'rsuite/esm/internals/types'
import {useTooltipPlacement} from '../../utils/TooltipPlacementContext'
import styles from './Hinted.module.css'

/**
 * React component properties for the {@link HintedLabel} component.
 */
interface HintedLabelProps {
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
interface HintedProps extends Omit<WhisperProps, 'speaker'> {
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
  const speaker = useMemo(() => <Tooltip>{hint}</Tooltip>, [hint])

  if (!hint) return <>{children}</>

  return <Whisper speaker={speaker} placement={placement} trigger={'hover'}>
    {children}
  </Whisper>
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
  const labelClassName = cx(styles.label, labelProps.className, hint && styles.hinted)
  if (!hint) return <label {...labelProps} className={labelClassName}>{children}</label>
  return (
    <Hinted hint={hint}>
      <label {...labelProps} className={labelClassName}>{children}</label>
    </Hinted>
  )
}

/**
 * React component properties for the {@link HintedIconButton} component.
 * @internal
 */
interface HintedIconButtonProps {
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
  /**
   * The tooltip placement.
   */
  hintPlacement: TypeAttributes.Placement
}

/**
 * The React form builder component that displays hinted icon button.
 * @param props the React component properties.
 * @param props.hint the tooltip text.
 * @param props.hintPlacement the tooltip placement.
 * @returns the React element.
 * @internal
 */
export const HintedIconButton = ({hint, hintPlacement, ...props}: HintedIconButtonProps) => {
  return <Hinted hint={hint} placement={hintPlacement ?? 'bottom'}>
    <IconButton {...props} size="xs"/>
  </Hinted>
}
