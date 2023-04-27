import styled from '@emotion/styled'
import {Checkbox} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../components/LabeledProperty'

export const BooleanInput = () => {
  const {value, onChange, annotation} = useEditor()
  return <LabeledProperty annotation={annotation} style={{height: 23}}>
    <SCheckbox checked={!!value} onChange={(value, checked) => onChange(checked)}/>
  </LabeledProperty>
}

export const SCheckbox = styled(Checkbox)`
  width: 100%;

  .rs-checkbox-checker {
    padding-left: 0;
    margin-left: -10px;
  }
`
