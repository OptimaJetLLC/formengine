import {boolean, define, event, number, string} from '@react-form-builder/core'
import type {InputProps} from 'rsuite'
import {Input} from 'rsuite'
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

export const rsTextArea = define(RsTextArea, 'RsTextArea')
  .name('Text area')
  .props({
    label: string.default('Text area'),
    value: string.default('').valued,
    placeholder: string,
    rows: number.default(5).withEditorProps({min: 1}),
    size,
    disabled: boolean.hinted('Disabled component').default(false),
    readOnly,
    onChange: event,
    onPressEnter: event
  })
