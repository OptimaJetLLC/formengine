import styled from '@emotion/styled'
import {startCase} from 'lodash'
import {TagPicker} from 'rsuite'
import {ItemDataType} from 'rsuite/cjs/@types/common'
import {LabeledProperty} from '../../ui/LabeledProperty'
import {PropertyAn} from '../utils/annotations/PropertyAn'
import {useEditor} from '../utils/useEditor'

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
