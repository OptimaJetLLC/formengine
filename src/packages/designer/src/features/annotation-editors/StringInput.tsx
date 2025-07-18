import {cx} from '@emotion/css'
import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {useEffect, useMemo, useRef} from 'react'
import {Input} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import {useTranslationPart} from '../localization/hooks'
import type {AnnotationEditorProps} from './AnnotationEditorProps'
import {Hinted} from './Hinted'

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

  button {
    position: absolute;
    top: 4px;
    right: 14px;
    color: var(--rs-text-secondary);
    width: 12px;
    height: 12px;
  }
`

interface CleanButtonProps {
  onClick: () => void
}

const CleanButton = ({onClick}: CleanButtonProps) => {
  const getLabel = useTranslationPart('propertiesEditor')
  const cleanLabel = useMemo(() => getLabel('clean'), [getLabel])

  return <Hinted hint={cleanLabel}>
    <button className={cx(['rs-picker-clean', 'rs-btn-close'])} onClick={onClick}>
      <Close/>
    </button>
  </Hinted>
}

/**
 * The property editor for the string property type without a label.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ResizableStringInput = (props: AnnotationEditorProps) => {
  const {value = '', annotation, onChange, onClean} = props
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

  return <STextareaSizer ref={containerRef} data-testid={`resizable-string-input-${props.annotation.key}`}>
    <Input ref={inputRef} rows={1} name={annotation.key} value={value} onChange={onChange} size="xs" as="textarea"
           {...props.annotation.editorProps}/>
    <CleanButton onClick={onClean}/>
  </STextareaSizer>
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
