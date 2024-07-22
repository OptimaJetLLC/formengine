import styled from '@emotion/styled'
import {useEffect, useRef} from 'react'
import {Input} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

// The idea here is to have an offscreen element with exactly the same styles
// which can autoresize natively and stretch target the element via aligning
// inside the parent container.
// Sync styles via DOM api can cause lags with a lot of elements on the page.
const STextareaSizer = styled.div`
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;
  width: 100%;

  &::after,
  & > textarea {
    min-width: 1em !important;
    width: auto !important;
    height: 100% !important;
    grid-area: 2 / 1;
    resize: none !important;
    max-height: 6em !important;
  }

  &::after {
    content: attr(data-contents) ' ';
    visibility: hidden;
    // text behaviour must match with textarea
    font-size: inherit !important;
    white-space: pre-wrap;
    overflow-wrap: break-word;
  }
`

/**
 * The property editor for the string property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const StringInput = (props: AnnotationEditorProps) => {
  const {value = '', annotation, onChange} = props
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      container.dataset.contents = value
    }
  }, [value])

  useEffect(() => {
    const input = inputRef.current
    const container = containerRef.current
    if (input && container) {
      const style = window.getComputedStyle(input)
      container.style.lineHeight = style.lineHeight
      container.style.fontSize = style.fontSize
    }
  }, [])

  return (
    <LabeledProperty {...props} >
      <STextareaSizer ref={containerRef}>
        <Input ref={inputRef} rows={1} name={annotation.key} value={value} onChange={onChange} size="xs" as="textarea"
               {...props.annotation.editorProps}/>
      </STextareaSizer>
    </LabeledProperty>
  )
}
