import type {SchemaType} from './SchemaType'
import type {ValidationRuleSettings} from './ValidationRuleSettings'

/**
 * Value validation rules.
 */
export type BoundValueSchema = {
  type: SchemaType
  autoValidate?: boolean
  validations?: ValidationRuleSettings[]
}
