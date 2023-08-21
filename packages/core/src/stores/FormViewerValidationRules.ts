import type {ExternalValidationRules} from '../features/validation/types/ExternalValidationRules'
import type {ValidationRuleSet} from '../features/validation/types/ValidationRuleSet'

/**
 * Validation rules for FormViewer.
 */
export type FormViewerValidationRules = {
  external?: ExternalValidationRules
  internal: ValidationRuleSet
}
