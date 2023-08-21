import type {RuleValidator} from './RuleValidator'
import type {ValidationRuleParameter} from './ValidationRuleParameter'

/**
 * External validation rule settings.
 */
export type ExternalValidationRuleSettings = {

  /**
   * Metadata of validation rule parameters.
   */
  params?: ValidationRuleParameter[]

  /**
   * The function that validates the value.
   */
  validate: RuleValidator
}
