import type {SchemaType} from './SchemaType'

/**
 * Describes the settings of the validation rule parameter.
 */
export type ValidationRuleParameter = {
  key: string
  type: SchemaType,
  required: boolean
  default?: unknown
  editorType?: string
}
