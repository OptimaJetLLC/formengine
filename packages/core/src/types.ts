import type {ReactNode} from 'react'

/**
 * React wrapper component properties.
 */
export interface WrapperProps {
  children: ReactNode
}

/**
 * Display resolution type.
 */
export type ViewMode = 'desktop' | 'mobile' | 'tablet'

/**
 * Properties of the root component of the form.
 */
export interface ScreenProps {
  children: ReactNode
}

/**
 * Value setting function type.
 */
export type Setter<T = any> = (value: T) => void
