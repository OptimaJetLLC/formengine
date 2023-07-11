import {createContext, createRef, RefObject, useContext} from 'react'

const EmptyRef = createRef<undefined>()

/**
 * The {@link RefObject} containing {@link Record} with overridden component properties.
 */
export type OverrideRef = RefObject<Record<string, any> | undefined>

const overridesContext = createContext<OverrideRef>(EmptyRef)
overridesContext.displayName = 'OverridesContext'

// todo rename all hooks that use context to names like useNameContext, where 'Name' is the name of the context.
// todo rename to useComponentPropertiesOverridesContext
export const useOverrides = (useContext<OverrideRef>).bind(null, overridesContext)
export const OverridesProvider = overridesContext.Provider
