/**
 * Common CSS block properties.
 */
export interface AreaProps {
  backgroundColor?: string
}

/**
 * Common CSS text properties.
 */
export interface TextProps extends AreaProps {
  alignment?: string
  fontSize?: number
  fontWeight?: string
  color?: string
}
