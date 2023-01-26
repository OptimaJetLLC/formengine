import {LabeledValue} from '../LabeledValue'
import {Annotation} from './Annotation'

//Примитивы и объекты, хранящиеся в пропсах
export class PropertyAn extends Annotation {
  data!: LabeledValue[]
}

export const isProperty = (value: Annotation): value is PropertyAn => {
  return value instanceof PropertyAn
}
