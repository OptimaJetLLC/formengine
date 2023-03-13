import {boolean, define, event, number, string} from 'form-builder'
import {Input} from 'rsuite'
import {InputProps} from 'rsuite/esm/Input/Input'
import {readOnly, size} from '../commonProperties'
import {RsLabeledInput, RsRtlLabel} from './components/Labeled'

interface RsTextAreaProps extends InputProps {
  label: string
  rows: number
}

const RsTextArea = ({style, className, label, ...props}: RsTextAreaProps) => (
  <RsLabeledInput style={style} className={className}>
    <RsRtlLabel>{label}</RsRtlLabel>
    <Input as="textarea" {...props}/>
  </RsLabeledInput>
)

export const rsTextArea = define(RsTextArea)
  .props({
    label: string.default('Text area'),
    value: string.default('').valued,
    placeholder: string,
    rows: number.default(5).withEditorProps({min: 1}),
    size,
    disabled: boolean.hinted('Disabled component'),
    readOnly,
    onChange: event,
    onPressEnter: event
  })
