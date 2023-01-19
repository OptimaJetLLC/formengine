import styled from '@emotion/styled'
import {Radio, RadioGroup as RRadioGroup} from 'rsuite'
import {LabeledValue} from '../annotation/utils/LabeledValue'

export interface RadioButtonsProps {
  label?: string
  value?: string
  onChange: (value: string | number) => void
  items?: LabeledValue[]
}

export const RadioButtons = ({label, items, ...props}: RadioButtonsProps) => {
  return (
    <Container>
      {!!label && <label>{label}</label>}
      <RRadioGroup {...props as any} size={'xs'} inline appearance={'picker'}>
        {items?.map(({value, label}, i) => (
          <Radio value={value} key={i}>{label ?? value}</Radio>
        ))
        }
      </RRadioGroup>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .rs-radio-group {
    width: 100%;
    justify-content: space-evenly;
  }

  .rs-radio-checker {
    min-height: 27px;
    max-height: 27px;
    margin: 0 7px !important;

    label {
      line-height: 14px !important;
      padding: 4px 0 !important;
    }
  }
`
