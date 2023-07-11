import styled from '@emotion/styled'
import {Close} from '@rsuite/icons'
import {InputNumber} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

/**
 * The property editor for the numeric property type.
 * @returns the React element.
 */
const NumberInput = () => {
  const {onChange, onRemove, value, annotation} = useEditor()
  const handleChange = (value: any) => {
    if (typeof value === 'string') {
      onChange(Number(value))
      return
    }
    onChange(value)
  }
  const inputNumberProps = {...annotation.editorProps, value}
  const closeButton = <Close onClick={onRemove} style={{cursor: 'pointer'}}/>

  return <LabeledProperty annotation={annotation}>
    <SNumberInput {...inputNumberProps} onChange={handleChange} size={'xs'} postfix={closeButton}/>
  </LabeledProperty>
}

const SNumberInput = styled(InputNumber)`
  .rs-input-group-addon {
    padding: 1px 8px !important;
  }
`

export {NumberInput}
