import {isObject, upperFirst} from 'lodash-es'

export interface LabeledValue {
  value: string | number;
  label?: string;
}

export const labeledValue: LabeledValue = {label: '', value: ''}

export const toLabeledValues = (items: string[] | LabeledValue[], upper = true) =>
  items.map(item => ({
    value: isObject(item) ? item.value : item,
    label: isObject(item)
      ? item.label
      : (upper ? upperFirst(item) : item)
  }))
