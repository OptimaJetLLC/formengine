import styled from '@emotion/styled'
import {Checkbox} from 'rsuite'
import {useEditor} from '../../utils/useEditor'
import LabeledProperty from '../ui/common/LabeledProperty'

export const BooleanInput = () => {
  const {value, onChange, annotation} = useEditor()
  return <LabeledProperty annotation={annotation}>
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
