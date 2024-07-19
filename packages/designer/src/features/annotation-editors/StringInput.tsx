import {useEffect, useRef, useState} from 'react'
import {Input} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for the string property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const StringInput = (props: AnnotationEditorProps) => {
  const {value, onChange, annotation} = props
  const [rowsCount, setRowsCount] = useState(0)
  const ref = useRef<HTMLTextAreaElement>(null)
  const textBig = value?.length > 15 || rowsCount >= 2
  const [isBigText, setIsBigText] = useState(textBig)
  const [textSizeChanged, setTextSizeChanged] = useState(false)

  const handleChange = (value: string) => {
    if (textBig !== isBigText) {
      setTextSizeChanged(true)
      setIsBigText(textBig)
    }
    onChange(value)
  }

  useEffect(() => {
    if (!textSizeChanged) return
    setTextSizeChanged(false)
    ref.current?.focus()
    // For set caret on last symbol
    ref.current?.setSelectionRange(value?.length, value?.length)
  }, [textSizeChanged, value?.length])

  useEffect(() => {
    const linesCount = (value?.match(/\n/g) || []).length as number + 1
    setRowsCount(linesCount > 5 ? 5 : linesCount)
  }, [value])

  const onPressEnter = () => {
    if (rowsCount < 2) setRowsCount(2)
  }

  return (
    <LabeledProperty {...props} style={{flexWrap: isBigText ? 'wrap' : 'initial'}}>
      <Input name={annotation.key} value={value ?? ''} onPressEnter={onPressEnter} onChange={handleChange} size={'xs'}
             as={isBigText ? 'textarea' : undefined} rows={rowsCount} ref={ref} {...props.annotation.editorProps}/>
    </LabeledProperty>
  )
}
