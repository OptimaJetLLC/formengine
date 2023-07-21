import type {RuleValidator} from './RuleValidator'

/**
 * The validation function factory.
 */
export type ValidatorFactory<Params> = (args: Params) => RuleValidator
