import styled from '@emotion/styled'
import {IconProps} from '@rsuite/icons/lib/Icon'
import React from 'react'
import {Button, ButtonGroup, IconButton, IconButtonProps} from 'rsuite'
import {LabeledValue} from '../annotation/utils/LabeledValue'

export interface RadioButtonsProps {
  label?: string
  value?: string
  onChange: (value: string | number) => void
  items?: LabeledValue[]
}

export const RadioButtons = ({label, items, value, onChange, ...props}: RadioButtonsProps) => {
  return (
    <Container {...props}>
      <label>{label}</label>
      <ButtonGroup>
        {items?.map(({value: itemValue, label}) =>
          <InnerRadioButton
            key={itemValue} value={itemValue} label={label}
            onClick={() => onChange(itemValue)}
            appearance={itemValue === value ? 'primary' : 'default'}
          />
        )}
      </ButtonGroup>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

export interface RadioButtonProps extends IconButtonProps, LabeledValue {
  icon?: React.ReactElement<IconProps>;
}

export const InnerRadioButton = ({label, icon, value, ...props}: RadioButtonProps) => icon
  ? <IconButton icon={icon} {...props}>{label}</IconButton>
  : <Button {...props}>{label}</Button>
