import type {ExternalValidationRuleSettings} from './ExternalValidationRuleSettings'
import type {SchemaType} from './SchemaType'

/**
 * A set of metadata of external validation rules, grouped by rule name.
 */
export type ExternalValidationRules = Record<string, ExternalValidationRuleSettings>

/**
 * The set of metadata of external validation rules, grouped by the type of value being validated.
 */
export type ExternalValidators = Partial<Record<SchemaType, ExternalValidationRules>>
