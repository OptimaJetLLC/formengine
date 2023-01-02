import styled from '@emotion/styled'
import {isUndefined} from 'lodash'
import {InputPicker} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'
import {Property} from '../utils/annotations/Property'

const addCustomValue = ({data}: Property, value: string) => {
  if (isUndefined(value)) {
    return data
  }

  if (!data.find(item => item.value === value || item.label === value)) {
    data.push({value, label: value})
  }

  return data
}

export const Picker = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps({componentStore, annotation})
  const onClean = () => onChange(annotation.schema?.getDefault())
  const data = addCustomValue(annotation as Property, value)

  return <LabeledProperty annotation={annotation}>
    <SInputPicker block cleanable creatable value={value} onChange={onChange}
                 onClean={onClean} data={data} size={'xs'}/>
  </LabeledProperty>
}

const SInputPicker = styled(InputPicker)`
  width: 100%;
 `
