import * as yup from 'yup'
import {EditorType, Enum} from '../../types'
import {BaseBuilder} from './BaseBuilder'
import {OneOfBuilder} from './OneOfBuilder'
import {FromYup, SchemedBuilder} from './SchemedBuilder'
import {SomeOfBuilder} from './SomeOfBuilder'

/**
 * The builder class to define the metadata property of the form builder component.
 */
export class AnnotationBuilder<T> extends BaseBuilder<T> {

  /**
   * Creates a component property metadata builder.
   * @param editor property editor type.
   */
  constructor(editor: EditorType) {
    super()
    this.annotation = {editor}
  }

  static create = <T>(editor: EditorType) => new this<T>(editor)

  /**
   * Sets the validation scheme for the component property.
   * @param schema the validation scheme.
   * @returns the instance of the metadata property builder.
   */
  schemed<T extends yup.AnySchema>(schema: T) {
    return new SchemedBuilder<FromYup<T>>().setup({...this.options, ...this.annotation, schema: schema})
  }

  /**
   * Sets the property as a "single select" property.
   * @param values the possible values for the property.
   * @returns the instance of the metadata property builder.
   */
  oneOf<U extends string | number, D extends [U, ...U[]]>(...values: D) {
    const result = new OneOfBuilder<Enum<D>>().setup({...this.options, ...this.annotation, schema: yup.mixed()})
    result.values = values
    return result
  }

  /**
   * Sets the property as a "multiple select" property.
   * @param values the possible values for the property.
   * @returns the instance of the metadata property builder.
   */
  someOf<U extends string | number, D extends [U, ...U[]]>(...values: D) {
    const result = new SomeOfBuilder<Enum<D>>().setup({...this.options, ...this.annotation, schema: yup.mixed()})
    result.values = values
    return result
  }
}
