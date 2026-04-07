import {useEffect, useRef} from 'react'
import {Input} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {CleanButton} from './CleanButton'
import styles from './StringInput.module.css'

// The idea here is to have an offscreen element with exactly the same styles
// which can autoresize natively and stretch target the element via aligning
// inside the parent container.
// Sync styles via DOM api can cause lags with a lot of elements on the page.

interface ResizableStringInputProps extends AnnotationEditorProps {
  'data-testid'?: string
}

/**
 * The property editor for the string property type without a label.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ResizableStringInput = (props: ResizableStringInputProps) => {
  const {value = '', ['data-testid']: testId, annotation, onChange, onClean} = props
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const input = inputRef.current
    const container = containerRef.current
    if (input && container) {
      const style = globalThis.getComputedStyle(input)
      container.style.lineHeight = style.lineHeight
      container.style.fontSize = style.fontSize
    }
  }, [])

  return (
    <div ref={containerRef} className={styles.sizer} data-contents={value} data-testid={testId}>
      <Input ref={inputRef} rows={1} name={annotation.key} value={value} onChange={onChange} size="xs" as="textarea"
             {...props.annotation.editorProps}/>
      <CleanButton onClick={onClean}/>
    </div>
  )
}

/**
 * The property editor for the string property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const StringInput = (props: AnnotationEditorProps) => {
  return <LabeledProperty {...props} >
    <ResizableStringInput {...props} />
  </LabeledProperty>
}
