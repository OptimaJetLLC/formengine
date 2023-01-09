import styled from '@emotion/styled'
import {Radio, RadioGroup as RRadioGroup, RadioGroupProps as RRadioGroupProps} from 'rsuite'
import {LabeledValue, toLabeledValues} from '../annotation/utils/LabeledValue'

export interface RadioGroupProps extends RRadioGroupProps<string> {
  items: LabeledValue[]
  label?: string
}

const Label = styled.div`
  padding: 8px 2px 8px 10px;
  display: inline-block;
  vertical-align: middle;
`

export const RadioGroup = ({items, label, ...props}: RadioGroupProps) => {
  return (
    <RRadioGroup {...props as any}>
      {label && <Label>{label}</Label>}
      {toLabeledValues(items).map(({value, label}, i) => (
        <Radio value={value} key={i}>{label ?? value}</Radio>
      ))
      }
    </RRadioGroup>
  )
}
