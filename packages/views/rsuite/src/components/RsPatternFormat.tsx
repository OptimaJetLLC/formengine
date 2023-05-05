import {boolean, define, number, string} from 'form-builder/view'
import {PatternFormat} from 'react-number-format'
import {PatternFormatProps} from 'react-number-format/types/types'
import {inputProps} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'
import {onChangeWrapped, WrappedInput} from './components/WrappedInput'

interface RsPatternFormatProps extends PatternFormatProps {
  label: string
}

const RsPatternFormat = ({style, className, label, format, onChange, ...props}: RsPatternFormatProps) => {
  return <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <PatternFormat customInput={WrappedInput as any} format={format ?? ''} {...props}
                   onChange={onChangeWrapped(onChange)}/>
  </RsLabeledInput>
}

export const rsPatternFormat = define(RsPatternFormat)
  .props({
    label: string.default('Formatted input'),
    value: number.valued,
    ...inputProps,
    format: string,
    mask: string,
    patternChar: string,
    allowEmptyFormatting: boolean
  })
