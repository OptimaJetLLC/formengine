import {array, boolean, define, event, LabeledValue, oneOf, string, toLabeledValues} from '@react-form-builder/builder/view'
import {Radio, RadioGroup, RadioGroupProps} from 'rsuite'
import {readOnly} from '../commonProperties'

interface RsRadioGroupProps extends RadioGroupProps<string> {
  items: LabeledValue[]
  label?: string
}

const RsRadioGroup = ({items, label, ...props}: RsRadioGroupProps) => {
  return (
    <div>
      <label>{label}</label>
      <RadioGroup {...props as any}>
        {items.map(({value, label}, i) => (
          <Radio value={value} key={i}>{label ?? value}</Radio>
        ))
        }
      </RadioGroup>
    </div>
  )
}

export const rsRadioGroup = define(RsRadioGroup)
  .props({
    name: string.default('RadioGroup').hinted('Radio group name'),
    appearance: oneOf('default', 'picker').labeled('Default', 'Picker').default('default'),
    label: string.default('Radio'),
    disabled: boolean.hinted('The disable of component'),
    readOnly,
    defaultValue: string,
    inline: boolean,
    onChange: event,
    items: array.default(toLabeledValues(['a', 'b', 'c'])),
    value: string.valued.hinted('Radio group value')
  })

