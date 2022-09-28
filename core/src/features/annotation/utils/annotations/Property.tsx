import {Annotation} from './Annotation'

//Примитивы и объекты, хранящиеся в пропсах
export class Property extends Annotation {
  data!: { label: string, value: string | number }[]
}
