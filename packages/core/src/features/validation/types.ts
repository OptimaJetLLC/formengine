import {BaseSchema} from 'yup'

/**
 * A set of validation rules.
 */
export type Rules<T> = {
  [key in keyof Partial<T>]: Rule<T>
}

/**
 * The type of the validated object.
 */
export type SchemaType = 'string' | 'number' | 'boolean' | 'date' | 'object' | 'array'

/**
 * The type of validation scheme.
 */
export type ValidationSchema = {
  type: SchemaType
  autoTransform?: boolean
  rules: string[]
  data?: Record<string, any[]>
}

//TODO parameters from type of function
/**
 * The validation rule.
 */
export class Rule<T> {
  /**
   * Creates the validation rule.
   * @param name the rule name.
   * @param apply the value validation function.
   * @param params the array of rule parameters.
   * @param hint the rule hint.
   * @param description the human-readable description of the rule.
   */
  constructor(
    public name: string,
    public apply: (scheme: T, ...args: any[]) => T,
    public params: RuleParam[],
    public hint?: string,
    public description?: string,
  ) {
  }

}

/**
 * The validation rule parameter.
 */
export class RuleParam {

  /**
   * Creates a validation rule parameter.
   * @param name the parameter name.
   * @param type the parameter type.
   * @param required true if the parameter is mandatory, false otherwise.
   */
  constructor(
    public name: string,
    public type: string,
    public required: boolean = false
  ) {
  }
}

/**
 * Type for the validation scheme constructor.
 */
export type SchemaCtor = new () => BaseSchema
