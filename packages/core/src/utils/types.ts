import {ReactNode} from 'react'

export type WrapperProps = { children: ReactNode }

export type ViewMode = 'desktop' | 'mobile' | 'tablet'

export type Device = 'any' | ViewMode
