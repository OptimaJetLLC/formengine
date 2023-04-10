import {createContext, useContext} from 'react'

const isTreeContext = createContext(false)
isTreeContext.displayName = 'IsTreeContext'

export const useIsTree = (useContext<boolean>).bind(null, isTreeContext)
export const IsTreeProvider = isTreeContext.Provider
