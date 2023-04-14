import {ReactNode} from 'react'
import {CustomActionDefinition} from './features/event'
import {ComponentStore} from './stores/ComponentStore'

export type WrapperProps = { children: ReactNode }

export type ViewMode = 'desktop' | 'mobile' | 'tablet'

export type Device = 'any' | ViewMode

export interface ScreenProps {
  actions?: CustomActionDefinition[]
  children: ReactNode,
  tooltipType: string
}

export interface ComponentTreeProps {
  parentStore?: ComponentStore
  data?: ComponentStore[]
}
