import {LabeledValue} from '../LabeledValue'
import {Annotation} from './Annotation'

//Примитивы и объекты, хранящиеся в пропсах
export class Property extends Annotation {
  data!: LabeledValue[]
}
