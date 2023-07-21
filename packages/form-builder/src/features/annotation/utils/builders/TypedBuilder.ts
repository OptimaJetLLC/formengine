import type {RuleValidator} from '@react-form-builder/core'
import type {ErrorMap} from '../../../validation'
import {BaseBuilder} from './BaseBuilder'

/**
 * The builder class to define the metadata property of the form builder component.
 * Used for properties where the property value can be validated.
 */
export class TypedBuilder<T> extends BaseBuilder<T> {

  /**
   * Marks the component property as required.
   * @returns the modified instance of the builder.
   */
  get required(): TypedBuilder<NonNullable<T>> {
    return this.setup({required: true}) as TypedBuilder<NonNullable<T>>
  }

  /**
   * Sets the default value for the component property.
   * @param value the default value.
   * @returns the modified instance of the builder.
   */
  default(value: T): this {
    return this.setup({default: value})
  }

  /**
   * Modifies the component property metadata builder with custom options.
   * @param options the custom options.
   * @returns the modified instance of the builder.
   */

  /**
   * Modifies the component property metadata builder with validation properties.
   * @param validator the validation function.
   * @param errorMap the validation error settings.
   * @returns the modified instance of the builder.
   */
  validated(validator: RuleValidator<T>, errorMap: ErrorMap): this {
    return this.setup({validator, errorMap})
  }
}
