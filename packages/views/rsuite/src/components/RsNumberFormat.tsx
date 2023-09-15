import {array, boolean, define, number, oneOf, string} from '@react-form-builder/core'
import {isString} from '@react-form-builder/core'
import type {NumericFormatProps} from 'react-number-format'
import {NumericFormat} from 'react-number-format'
import {InputProps} from 'rsuite'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'
import {WrappedInput} from './components/WrappedInput'

interface RsNumberFormatProps extends NumericFormatProps<InputProps> {
  label: string
  onChange: (value: any) => void
}

function getSeparators(props: { thousandSeparator?: boolean | string, decimalSeparator?: string }) {
  let {decimalSeparator = '.'} = props
  let {thousandSeparator} = props
  if (thousandSeparator === true) thousandSeparator = ','

  if (thousandSeparator === decimalSeparator) {
    console.warn(`
        Decimal separator can't be same as thousand separator.
        thousandSeparator: ${thousandSeparator} (thousandSeparator = {true} is same as thousandSeparator = ",")
        decimalSeparator: ${decimalSeparator} (default value for decimalSeparator is .)
     `)
    thousandSeparator = undefined
    decimalSeparator = '.'
  }

  if (thousandSeparator && isString(thousandSeparator)) {
    if (thousandSeparator.indexOf('-') >= 0) {
      console.warn(`Thousand separator can't contain '-' character`)
      thousandSeparator = undefined
    } else if (thousandSeparator.match(/\d/g)) {
      console.warn(`Thousand separator should not contain numeric character`)
      thousandSeparator = undefined
    }
  }

  if (decimalSeparator.match(/\d/g)) {
    console.warn(`Decimal separator should not contain numeric character`)
    decimalSeparator = '.'
  }

  return {decimalSeparator, thousandSeparator}
}

const RsNumberFormat = ({style, className, label, onChange, value, ...props}: RsNumberFormatProps) => {
  const {decimalSeparator, thousandSeparator} = getSeparators(props)

  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <NumericFormat customInput={WrappedInput} {...props}
                   decimalSeparator={decimalSeparator} thousandSeparator={thousandSeparator}
                   onValueChange={values => onChange?.(values.value)}
                   value={value ?? ''}/>
  </RsLabeledInput>
}

export const rsNumberFormat = define(RsNumberFormat)
  .type('RsNumberFormat')
  .name('Number format')
  .props({
    label: string.default('Number input'),
    value: number.valued,
    ...inputProps,
    allowedDecimalSeparators: array.ofString,
    allowLeadingZeros: boolean,
    allowNegative: boolean.default(true),
    decimalScale: number,
    decimalSeparator: string,
    fixedDecimalScale: boolean,
    prefix: string,
    suffix: string,
    thousandsGroupStyle: oneOf('thousand', 'lakh', 'wan', 'none').default('none'),
    thousandSeparator: string,
  })
