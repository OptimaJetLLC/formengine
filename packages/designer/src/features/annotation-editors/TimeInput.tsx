import {timeFormat} from '@react-form-builder/core'
import {format as formatDate, parse} from 'date-fns'
import {useCallback, useMemo} from 'react'
import {DatePicker} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const parseTimeValue = (value: any, format: string) => {
  if (typeof value === 'string') {
    const parsedDate = parse(value, format, new Date())
    if (!isNaN(parsedDate.getTime())) {
      return parsedDate
    }
    console.error('Invalid time string:', value)
    return null
  }
  return value
}

/**
 * The property editor for the time property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const TimeInput = (props: AnnotationEditorProps) => {
  const {onChange, onClean, value, annotation} = props
  const editorProps = useMemo(() => annotation.editorProps ?? {}, [annotation])
  const parsedValue = useMemo(() => parseTimeValue(value, timeFormat), [value])

  const handleChange = useCallback(value => {
    const formatted = value ? formatDate(value, timeFormat) : value
    onChange?.(formatted)
  }, [onChange])

  return <LabeledProperty {...props}>
    <DatePicker editable={false} cleanable={true} placement={'auto'}
                value={parsedValue ?? null} onChange={handleChange} onClean={onClean} {...editorProps} format={timeFormat} size={'xs'}/>
  </LabeledProperty>
}
