import type {ComponentStore} from '../../../stores/ComponentStore'
import type {Setter} from '../../../types'
import type {SchemaType} from '../types/SchemaType'
import type {DataValidator} from './DataValidator'

/**
 * The context for working with data.
 */
export interface IDataContext {

  /**
   * @returns the initial data.
   */
  get initialData(): unknown

  /**
   * Creates a data validator for the field.
   * @param componentStore the component settings.
   * @param valueType the field's data type.
   * @param onError the callback function called when the validation error text is set.
   */
  createDataValidator(componentStore: ComponentStore, valueType: SchemaType,
                      onError: Setter<string | undefined>): DataValidator
}
