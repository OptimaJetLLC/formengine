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
  const data = addCustomValue(annotation as Property, value)
  const clean = () => delete componentStore.props[annotation.key]

  return <LabeledProperty annotation={annotation}>
    <SInputPicker value={value ?? ''} data={data} onChange={onChange} onClean={clean}
                  block cleanable creatable size={'xs'}/>
  </LabeledProperty>
}

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
