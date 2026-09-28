import type {LabeledValue} from '@react-form-builder/core'
import cx from 'clsx'
import {Radio, RadioGroup as RRadioGroup} from 'rsuite'
import type {RadioGroupProps} from 'rsuite/esm/RadioGroup/RadioGroup'
import {Hinted} from '../annotation-editors/Hinted'
import styles from './RadioButtons.module.css'

/**
 * The radio button group element.
 */
export interface RadioButtonItem extends LabeledValue {
  /**
   * The radio button hint.
   */
  hint?: string
}

/**
 * The properties of the React {@link RadioButtons} component.
 */
export interface RadioButtonsProps extends RadioGroupProps {
  /**
   * The radio group label.
   */
  label?: string
  /**
   * The radio group value.
   */
  value?: string
  /**
   * The callback function called when a value in a radio group changes.
   * @param value the value.
   */
  onChange: (value: string | number) => void
  /**
   * The array of possible values.
   */
  items?: RadioButtonItem[]
}

/**
 * The React component that displays a group of radio buttons.
 * @param props the React component properties.
 * @param props.label the label for the group.
 * @param props.items the array with radio button data.
 * @param props.className the class of the component.
 * @param props.props the other properties of the component.
 * @returns the React element.
 */
export const RadioButtons = ({label, items, className, ...props}: RadioButtonsProps) => {
  return (
    <div className={cx(styles.container, className)}>
      {!!label && <label>{label}</label>}
      <RRadioGroup {...(props as any)} size={'xs'} inline appearance={'picker'}>
        {items?.map(({value, label, hint}, i) => (
          <Radio value={value} key={i}>
            <Hinted hint={hint} placement={'autoHorizontal'}>
              {label ?? value}
            </Hinted>
          </Radio>
        ))}
      </RRadioGroup>
    </div>
  )
}
