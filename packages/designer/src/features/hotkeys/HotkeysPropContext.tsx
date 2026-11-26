import type {ReactNode} from 'react'
import {createContext, useContext} from 'react'
import type {DesignerHotkeysProp} from './types'

const HotkeysPropContext = createContext<DesignerHotkeysProp | undefined>(undefined)

type HotkeysPropProviderProps = {
  value: DesignerHotkeysProp | undefined
  children: ReactNode
}

/**
 * Provides the current FormBuilder `hotkeys` prop to descendants.
 * BuilderStore keeps the mount-time props object; this context tracks live updates.
 * @param props the provider properties.
 * @param props.value the current FormBuilder `hotkeys` prop.
 * @param props.children the React child nodes.
 * @returns the React element.
 */
export const HotkeysPropProvider = ({value, children}: HotkeysPropProviderProps) => {
  return <HotkeysPropContext.Provider value={value}>{children}</HotkeysPropContext.Provider>
}

/**
 * @returns the current FormBuilder `hotkeys` prop from context.
 */
export const useHotkeysProp = () => useContext(HotkeysPropContext)
