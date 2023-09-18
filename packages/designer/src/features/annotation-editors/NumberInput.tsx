import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {InputNumber} from 'rsuite'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

/**
 * The property editor for the numeric property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const NumberInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation} = props
  const handleChange = (value: any) => {
    if (typeof value === 'string') {
      onChange(Number(value))
      return
    }
    onChange(value)
  }
  const inputNumberProps = {...annotation.editorProps, value}
  const closeButton = <Close onClick={onClean} style={{cursor: 'pointer'}}/>

  return <LabeledProperty {...props}>
    <SNumberInput {...inputNumberProps} onChange={handleChange} size={'xs'} postfix={closeButton}/>
  </LabeledProperty>
}

const SNumberInput = styled(InputNumber)`
  .rs-input-group-addon {
    padding: 1px 8px !important;
  }
`

export {NumberInput}
