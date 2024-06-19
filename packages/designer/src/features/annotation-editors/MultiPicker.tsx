import styled from '@emotion/styled'
import {PropertyAnnotation} from '@react-form-builder/core'
import {startCase} from 'lodash-es'
import {TagPicker} from 'rsuite'
import type {ItemDataType} from 'rsuite/esm/internals/types'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const prepareData = ({data}: PropertyAnnotation, values: string[]) => {
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

/**
 * The property editor for property of type "multiple select", displays values as select.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const MultiPicker = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation, onClean} = props
  const data = prepareData(annotation as PropertyAnnotation, value)

  return <LabeledProperty {...props}>
    <STagPicker value={value ?? []} data={data} onChange={onChange} onClean={onClean}
                cleanable creatable size={'xs'} placement={'auto'}/>
  </LabeledProperty>
}

const STagPicker = styled(TagPicker)`
  width: 100%;
`
