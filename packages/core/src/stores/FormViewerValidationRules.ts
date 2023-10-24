import type {ExternalValidationRules} from '../features/validation/types/ExternalValidationRules'
import type {ValidationRuleSet} from '../features/validation/types/ValidationRuleSet'

/**
 * Validation rules for FormViewer.
 */
export type FormViewerValidationRules = {
  /**
   * The set of external validators.
   */
  external?: ExternalValidationRules
  /**
   * The set of internal validators.
   */
  internal: ValidationRuleSet
}
