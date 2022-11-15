import {isObject, upperFirst} from 'lodash'

export interface LabeledValue {
  value: string;
  label?: string;
}

export const labeledValue: LabeledValue = {label: '', value: ''}

export const toLabeledValues = (items: string[] | LabeledValue[]) =>
  items.map(item => ({
    value: isObject(item) ? item.value : item,
    label: isObject(item) ? item.label : upperFirst(item)
  }))
