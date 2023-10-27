import type {CustomValidationRules} from '../features/validation/types/CustomValidationRules'
import type {ValidationRuleSet} from '../features/validation/types/ValidationRuleSet'

/**
 * Validation rules for FormViewer.
 */
export type FormViewerValidationRules = {
  /**
   * The set of custom validators.
   */
  external?: CustomValidationRules
  /**
   * The set of internal validators.
   */
  internal: ValidationRuleSet
}
