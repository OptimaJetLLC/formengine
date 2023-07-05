import {useEffect, useRef, useState} from 'react'
import {Input} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

export const StringInput = () => {
  const {value, onChange, annotation} = useEditor()
  const [rowsCount, setRowsCount] = useState(0)
  const ref = useRef<HTMLTextAreaElement>(null)
  const isBigText = value?.length > 15 || rowsCount >= 2

  useEffect(() => {
    ref.current?.focus()
    // For set caret on last symbol
    ref.current?.setSelectionRange(value?.length, value?.length)
  }, [isBigText])

  useEffect(() => {
    const linesCount = (value?.match(/\n/g) || []).length as number + 1
    setRowsCount(linesCount > 5 ? 5 : linesCount)
  }, [value])

  const onPressEnter = () => {
    if (rowsCount < 2) setRowsCount(2)
  }

  return (
    <LabeledProperty annotation={annotation} style={{flexWrap: isBigText ? 'wrap' : 'initial'}}>
      <Input name={annotation.key} value={value ?? ''} onPressEnter={onPressEnter} onChange={onChange} size={'xs'}
             as={isBigText ? 'textarea' : undefined} rows={rowsCount} ref={ref}/>
    </LabeledProperty>
  )
}
