import styled from '@emotion/styled'
import {PropertyAn} from 'fb-core'
import {isUndefined} from 'lodash-es'
import {InputPicker} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

const addCustomValue = ({data}: PropertyAn, value: string) => {
  if (isUndefined(value)) {
    return data
  }

  if (!data.find(item => item.value === value || item.label === value)) {
    data.push({value, label: value})
  }

  return data
}

export const Picker = () => {
  const {value, onChange, annotation, onRemove} = useEditor()
  const data = addCustomValue(annotation as PropertyAn, value)

  return <LabeledProperty annotation={annotation}>
    <SInputPicker value={value ?? ''} data={data} onChange={onChange} onClean={onRemove}
                  block cleanable creatable size={'xs'}/>
  </LabeledProperty>
}

const SInputPicker = styled(InputPicker)`
  width: 100%;
`
