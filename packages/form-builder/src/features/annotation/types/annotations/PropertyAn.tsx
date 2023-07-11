import {LabeledValue} from '../../utils/LabeledValue'
import {Annotation} from './Annotation'

//Примитивы и объекты, хранящиеся в пропсах
/**
 * Metadata for the component property for the form builder.
 */
export class PropertyAn extends Annotation {
  data!: LabeledValue[]
}

/**
 * Type predicate, asserts that the value is an instance of PropertyAn.
 * @param value the value.
 * @returns true if the value is an instance of PropertyAn, false otherwise.
 */
export const isProperty = (value: Annotation): value is PropertyAn => {
  return value instanceof PropertyAn
}
