import type {ValidationRuleSettings} from './ValidationRuleSettings'

/**
 * Value validation rules.
 */
export type BoundValueSchema = {
  autoValidate?: boolean
  validations?: ValidationRuleSettings[]
}
