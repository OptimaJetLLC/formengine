import styled from '@emotion/styled'
import {startCase} from 'lodash-es'
import {TagPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/@types/common'
import {useEditor} from '../../utils/useEditor'
import {PropertyAn} from '../annotation/types/annotations/PropertyAn'
import LabeledProperty from '../components/LabeledProperty'

//TODO add custom items
const prepareData = ({data}: PropertyAn, values: string[]) => {
  const preparedData = data.map(di => {
    return {
      value: di.value,
      label: di.label
    } as ItemDataType
  })

  values.forEach(v => {
    if (!preparedData.find(d => d.value === v)) {
      preparedData.push({value: v, label: startCase(v)})
    }
  })

  return preparedData
}

export const MultiPicker = () => {
  const {value, onChange, annotation, onRemove} = useEditor()
  const data = prepareData(annotation as PropertyAn, value)

  return <LabeledProperty annotation={annotation}>
    <STagPicker value={value ?? []} data={data} onChange={onChange} onClean={onRemove}
                cleanable creatable size={'xs'}/>
  </LabeledProperty>
}

const STagPicker = styled(TagPicker)`
  width: 100%;
`
