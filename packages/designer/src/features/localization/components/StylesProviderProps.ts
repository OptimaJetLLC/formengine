import type {BiDi} from '@react-form-builder/core'
import type {ReactNode} from 'react'

/**
 * The properties of the component that loads styles.
 */
export interface StylesProviderProps {
  /**
   * The React child node.
   */
  children: ReactNode
  /**
   * The text layout type.
   */
  bidi: BiDi
}
