import {LabeledValue} from '../../utils/LabeledValue'
import {Annotation} from './Annotation'

//Primitives and objects stored in properties
/**
 * Metadata for the component property for the form builder.
 */
export class PropertyAn extends Annotation {
  /**
   * Possible values for the property.
   */
  data!: LabeledValue[]
}

/**
 * Type predicate, asserts that the value is an instance of PropertyAn. **Internal use only.**
 * @param value the value.
 * @returns true if the value is an instance of PropertyAn, false otherwise.
 */
export const isProperty = (value: Annotation): value is PropertyAn => {
  return value instanceof PropertyAn
}
