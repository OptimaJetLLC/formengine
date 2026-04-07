import type {Options} from './Options'
import type {CustomizableKey} from './types'

/**
 * The map of customizations for the FormBuilder components.
 */
export type CustomizationMap = Partial<Record<CustomizableKey, Options>>
