import styled from '@emotion/styled'
import {Checkbox} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {useEditor} from '../utils/useEditor'

export const BooleanInput = () => {
  const {value, onChange, annotation} = useEditor()
  return <LabeledProperty annotation={annotation}>
    <SCheckbox checked={!!value} onChange={(value, checked) => onChange(checked)}/>
  </LabeledProperty>
}

const SCheckbox = styled(Checkbox)`
  width: 100%;

  .rs-checkbox-checker {
    padding-left: 0;
    margin-left: -10px;
  }
`
