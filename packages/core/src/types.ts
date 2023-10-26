import type {ReactNode} from 'react'

/**
 * React wrapper component properties.
 */
export interface WrapperProps {
  /**
   * The React child node.
   */
  children: ReactNode
}

/**
 * Display resolution type.
 */
export type ViewMode = 'desktop' | 'mobile' | 'tablet'

/**
 * Properties of the root component of the form. **Internal use only.**
 */
export interface ScreenProps {
  /**
   * The React child node.
   */
  children: ReactNode
}

/**
 * Value setting function type.
 * @param value the value.
 * @template T the value type.
 */
export type Setter<T = any> = (value: T) => void
