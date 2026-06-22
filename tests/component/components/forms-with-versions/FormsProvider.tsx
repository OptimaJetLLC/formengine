import {createContext, useContext} from 'react'
import type {FormStorage} from './FormsStorage'

interface IFormsContext {
  formName?: string
  formVersion?: number
  formStorage?: FormStorage
  setFormVersion?: (version?: number) => void
}

export const FormsContext = createContext<IFormsContext>({})

/**
 * @returns the FormsContext
 */
export const useFormsContext = () => useContext(FormsContext)
