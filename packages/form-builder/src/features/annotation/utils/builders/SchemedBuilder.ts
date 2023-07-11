import * as yup from 'yup'
import {BaseBuilder} from './BaseBuilder'

/**
 * The type that extracts the type T from yup.
 */
export type FromYup<T extends yup.AnySchema> = yup.TypeOf<T>

/**
 * The builder class to define the metadata property of the form builder component.
 * Used to describe the typed and validated properties of a component.
 */
export class SchemedBuilder<T> extends BaseBuilder<T> {

  /**
   * Marks the component property as required.
   * @returns the modified instance of the builder.
   */
  get required(): SchemedBuilder<NonNullable<T>> {
    return this.setup({schema: this.annotation.schema?.required()})
  }

  /**
   * Sets the default value for the component property.
   * @param value the default value.
   * @returns the modified instance of the builder.
   */
  default(value: T): this {
    return this.setup({schema: this.annotation.schema?.default(value)})
  }
}
