import type {ValidationRuleParameter} from './ValidationRuleParameter'
import type {ValidatorFactory} from './ValidatorFactory'

/**
 * Validation rule metadata required to create a validation function.
 */
export type ValidationRule = {
  validatorFactory: ValidatorFactory<any>
  params: ValidationRuleParameter[]
}
