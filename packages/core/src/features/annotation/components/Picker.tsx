import {InputPicker} from 'rsuite'
import {LabeledInput} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'
import {Property} from '../utils/annotations/Property'

const addCustomValue = ({data}: Property, value: string) => {
  if (!data.find(item => item.value === value || item.label === value)) {
    data.push({value, label: value})
  }

  return data
}

export const Picker = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps({componentStore, annotation})
  const onClean = () => onChange(annotation.schema?.getDefault())
  const data = addCustomValue(annotation as Property, value)

  return (
    <LabeledInput>
      <label>{annotation.name}</label>
      <InputPicker block creatable value={value} onChange={onChange} onClean={onClean} data={data} size={'xs'}/>
    </LabeledInput>
  )
}
