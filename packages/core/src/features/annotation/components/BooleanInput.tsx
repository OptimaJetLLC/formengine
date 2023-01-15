import styled from '@emotion/styled'
import {Checkbox} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

export const BooleanInput = ({componentStore, annotation}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps({componentStore, annotation})
  return <LabeledProperty componentStore={componentStore} annotation={annotation}>
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
