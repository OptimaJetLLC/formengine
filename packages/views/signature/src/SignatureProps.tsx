import type {ComponentPropsWithoutRef, CSSProperties} from 'react'

/**
 * The Signature pad properties.
 */
export interface SignatureProps
  extends Omit<ComponentPropsWithoutRef<'canvas'>, 'width' | 'height' | 'onChange'> {
  /**
   * The initial data URL for drawing the signature image.
   */
  value?: string

  /**
   * The label for the component.
   */
  label?: string
  /**
   * Clear button label.
   */
  clearButtonText?: string
  /**
   * The canvas width.
   * @default 300
   */
  width?: number

  /**
   * The canvas height.
   * @default 150
   */
  height?: number

  /**
   * The line width.
   * @default 1.5
   */
  lineWidth?: number

  /**
   * Triggered after stroke update.
   */
  onChange?: (value?: string) => void

  /**
   * The pen color.
   */
  penColor?: CSSProperties['fill']

  /**
   * The background color.
   */
  backgroundColor?: CSSProperties['fill']

  /**
   * Flag, if true - the component is running in read-only mode.
   */
  readOnly?: boolean
}
