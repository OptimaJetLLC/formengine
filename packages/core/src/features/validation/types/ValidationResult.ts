import type {ValidationRuleSettings} from './ValidationRuleSettings'

/**
 * The result of the validation.
 */
export type ValidationResult = {

  /**
   * The validation rule settings.
   */
  settings: ValidationRuleSettings

  /**
   * The validation error message text.
   */
  message?: string
}
