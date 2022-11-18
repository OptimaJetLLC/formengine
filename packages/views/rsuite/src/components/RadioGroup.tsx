import {array, boolean, define, event, LabeledValue, oneOf, string, toLabeledValues} from 'fb-core'
import React from 'react'
import {Radio, RadioGroup as RRadioGroup, RadioGroupProps as RRadioGroupProps} from 'rsuite'

interface RadioGroupProps extends RRadioGroupProps<string> {
  items: LabeledValue[]
  label?: string
}

const RadioGroup = ({items, label, ...props}: RadioGroupProps) => {
  return (
    <div>
      <label>{label}</label>
      <RRadioGroup {...props as any}>
        {items.map(({value, label}, i) => (
          <Radio value={value} key={i}>{label ?? value}</Radio>
        ))
        }
      </RRadioGroup>
    </div>
  )
}

export const radioGroup = define(RadioGroup)
  .props({
    appearance: oneOf('default', 'picker').labeled('Default', 'Picker').default('default'),
    label: string.default('Radio'),
    defaultValue: string.default('a'),
    inline: boolean,
    onChange: event,
    items: array.default(toLabeledValues(['a', 'b', 'c'])),
  })

