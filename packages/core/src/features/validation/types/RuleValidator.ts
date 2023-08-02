import type {IStore} from '../../../stores/IStore'

/**
 * The result of validation of a single rule, true means validation was successful,
 * false means validation failed, string means error message.
 */
export type RuleValidatorResult = string | boolean

/**
 * The function that checks the value and returns the result of the rule validation, see {@link RuleValidatorResult}.
 */
export type RuleValidator<T = any> = (value: T, store: IStore) => RuleValidatorResult | Promise<RuleValidatorResult>
