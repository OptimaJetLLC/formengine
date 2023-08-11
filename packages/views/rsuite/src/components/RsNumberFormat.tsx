import {array, boolean, define, number, oneOf, string} from '@react-form-builder/builder/view'
import {NumericFormat} from 'react-number-format'
import {NumericFormatProps} from 'react-number-format/types/types'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'
import {onChangeWrapped, WrappedInput} from './components/WrappedInput'

interface RsNumberFormatProps extends NumericFormatProps {
  label: string
}

const RsNumberFormat = ({style, className, label, onChange, value, ...props}: RsNumberFormatProps) => {
  const converterFn = (value: any) => {
    if (value === null || value === undefined || value instanceof Number) return value
    let preparedValue = value.toString()
    if (props.decimalSeparator) {
      preparedValue = preparedValue.replace(props.decimalSeparator, '.')
    }
    if (props.prefix) {
      preparedValue = preparedValue.startsWith(props.prefix) ? preparedValue.replace(props.prefix, '') : preparedValue
    }
    if (props.suffix) {
      preparedValue = preparedValue.endsWith(props.suffix) ? preparedValue.replace(props.suffix, '') : preparedValue
    }
    if (props.thousandSeparator && typeof props.thousandSeparator === 'string') {
      preparedValue = preparedValue.replaceAll(props.thousandSeparator, '')
    }
    return preparedValue
  }

  const onChangeWithConverter = (value: any) => onChange?.(converterFn(value))

  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <NumericFormat customInput={WrappedInput as any} {...props}
                   onChange={onChangeWrapped(onChangeWithConverter)} value={value ?? ''}/>
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
