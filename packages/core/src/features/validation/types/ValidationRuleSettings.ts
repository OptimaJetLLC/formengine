/**
 * The validation rule settings.
 */
export type ValidationRuleSettings = {

  /**
   * The unique key of the validation rule. The key is unique within the value type.
   */
  key: string,

  /**
   * Arguments of the validation rule.
   */
  args?: Record<string, any>
}
