import {ReactNode} from 'react'
import {CustomActionDefinition} from './features/event'

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

// todo move to form-builder
/**
 * Display resolution type of the form builder.
 */
export type Device = 'any' | ViewMode

// todo rename to something like FormViewerFormRootComponent?
/**
 * Properties of the root component of the form.
 */
export interface ScreenProps {
  actions?: CustomActionDefinition[]
  children: ReactNode
  tooltipType: string
  errorConfig: object
}

/**
 * Value setting function type.
 */
export type Setter<T = any> = (value: T) => void
