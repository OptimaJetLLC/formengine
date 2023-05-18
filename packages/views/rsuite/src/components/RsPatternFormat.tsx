import {boolean, define, number, string} from '@react-form-builder/builder/view'
import {PatternFormat} from 'react-number-format'
import {PatternFormatProps} from 'react-number-format/types/types'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'
import {onChangeWrapped, WrappedInput} from './components/WrappedInput'

interface RsPatternFormatProps extends PatternFormatProps {
  label: string
}

const RsPatternFormat = ({style, className, label, format, onChange, value, ...props}: RsPatternFormatProps) => {
  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <PatternFormat customInput={WrappedInput as any} format={format ?? ''} {...props}
                   onChange={onChangeWrapped(onChange)} value={value ?? ''}/>
  </RsLabeledInput>
}

export const rsPatternFormat = define(RsPatternFormat)
  .type('RsPatternFormat')
  .props({
    label: string.default('Formatted input'),
    value: number.valued,
    ...inputProps,
    format: string,
    mask: string,
    patternChar: string,
    allowEmptyFormatting: boolean
  })
