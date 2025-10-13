import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {useCallback, useMemo} from 'react'
import {InputNumber} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const SNumberInput = styled(InputNumber)`
  .rs-input-group-addon {
    padding: 1px 8px !important;
  }
`

const closeButtonStyle = {cursor: 'pointer'} as const

/**
 * The property editor for the numeric property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const NumberInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation, componentData} = props
  const handleChange = useCallback((value: any) => {
    if (typeof value === 'string') {
      value = Number(value)
      value = isNaN(value) ? 0 : value
    }
    onChange(value)
  }, [onChange])
  const {calculateEditorProps, ...editorProps} = annotation.editorProps ?? {}
  const inputNumberProps = {
    ...editorProps,
    ...calculateEditorProps?.(componentData),
    value: typeof value === 'number' ? value : null,
  }
  const closeButton = useMemo(() => <Close onClick={onClean} style={closeButtonStyle}/>, [onClean])

  return <LabeledProperty {...props}>
    <SNumberInput {...inputNumberProps} onChange={handleChange} size={'xs'} postfix={closeButton}/>
  </LabeledProperty>
}

export {NumberInput}
