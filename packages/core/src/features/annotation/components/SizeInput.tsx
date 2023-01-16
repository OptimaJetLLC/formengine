import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import React from 'react'
import {Input, InputNumber, InputPicker} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'
import {toLabeledValues} from '../utils/LabeledValue'

type InputValue = string | number;
export const OtherMeasure = 'other'
export const SizeMeasures = ['px', '%', 'em', 'vw', 'vh']
export const SizeKeywords = ['max-content', 'min-content', 'fit-content', 'auto']
const options = toLabeledValues([...SizeMeasures, ...SizeKeywords, OtherMeasure], false)

const SizeInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value: {value, measure}, onChange} = makeAnnotationProps({componentStore, annotation})

  const onChangeValue = (value: InputValue) => onChange({value, measure})
  const onChangeMeasure = (measure: string) => onChange(makeMeasured(measure, value))

  const input = measure === OtherMeasure
    ? <Input value={value} size={'xs'} onChange={onChangeValue}/>
    : <InputNumber value={value} size={'xs'} onChange={onChangeValue}/>

  return (
    <LabeledProperty annotation={annotation}>
      <Container>
        {needValue(measure) && input}
        <SPicker value={measure} onChange={onChangeMeasure} data={options}
                 className={cx({withValue: needValue(measure)})}
                 creatable cleanable={false} placement={'bottomEnd'} size={'xs'}/>
      </Container>
    </LabeledProperty>
  )
}

const needValue = (measure: string) => !SizeKeywords.includes(measure)
const makeMeasured = (measure: string, value: InputValue) => ({
  value: needValue(measure) ? value : '',
  measure
})

const Container = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
  align-items: center;
`

const SPicker = styled(InputPicker)`
  width: auto;

  &.withValue {
    width: min-content;
    min-width: 70px;
  }
`

export {SizeInput}
