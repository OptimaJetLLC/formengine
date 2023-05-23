import {boolean, define, number, set, string} from '@react-form-builder/builder/view'
import {NumericFormat} from 'react-number-format'
import {NumericFormatProps} from 'react-number-format/types/types'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'
import {onChangeWrapped, WrappedInput} from './components/WrappedInput'

interface RsNumberFormatProps extends NumericFormatProps {
  label: string
}

const RsNumberFormat = ({style, className, label, onChange, value, ...props}: RsNumberFormatProps) => {
  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <NumericFormat customInput={WrappedInput as any} {...props}
                   onChange={onChangeWrapped(onChange)} value={value ?? ''}/>
  </RsLabeledInput>
}

export const rsNumberFormat = define(RsNumberFormat)
  .type('RsNumberFormat')
  .name('Number format')
  .props({
    label: string.default('Number input'),
    value: number.valued,
    ...inputProps,
    allowedDecimalSeparators: set,
    allowLeadingZeros: boolean,
    allowNegative: boolean.default(true),
    decimalScale: number,
    decimalSeparator: string,
    fixedDecimalScale: boolean,
    prefix: string,
    suffix: string,
    thousandsGroupStyle: string
  })
