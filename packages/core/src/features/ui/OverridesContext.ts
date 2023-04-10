import {createContext, createRef, RefObject, useContext} from 'react'

const EmptyRef = createRef<undefined>()

export type OverrideRef = RefObject<Record<string, any> | undefined>

const overridesContext = createContext<OverrideRef>(EmptyRef)
overridesContext.displayName = 'OverridesContext'

export const useOverrides = (useContext<OverrideRef>).bind(null, overridesContext)
export const OverridesProvider = overridesContext.Provider
