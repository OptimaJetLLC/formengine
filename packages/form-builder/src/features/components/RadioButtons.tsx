import styled from '@emotion/styled'
import {Radio, RadioGroup as RRadioGroup} from 'rsuite'
import type {RadioGroupProps} from 'rsuite/esm/RadioGroup/RadioGroup'
import {LabeledValue} from '../annotation/utils/LabeledValue'

/**
 * The properties of the React {@link RadioButtons} component.
 */
export interface RadioButtonsProps extends RadioGroupProps {
  label?: string
  value?: string
  onChange: (value: string | number) => void
  items?: LabeledValue[]
}

/**
 * The React component that displays a group of radio buttons.
 * @param props the React component properties.
 * @param props.label the label for the group.
 * @param props.items the array with radio button data.
 * @param props.style the style of the component.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const RadioButtons = ({label, items, style, ...props}: RadioButtonsProps) => {
  return (
    <Container style={style}>
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
  flex: 1;

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
