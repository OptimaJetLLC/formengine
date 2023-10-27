import {namedObserver} from '@react-form-builder/core'
import {Input} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import LabeledProperty from '../../components/LabeledProperty'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'

export const CustomValidatorEditor = namedObserver('CustomValidatorEditor', (props: AnnotationEditorProps) => {
  const {annotation, componentData, value, onChange} = props
  const builderStore = useBuilderStore()
  const componentKey = `${componentData.key}[${annotation.key}][${annotation.type}]`
  const handleEdit = () => builderStore.editCustomValidationCode(componentKey, value, getFunctionSignature(annotation.type), onChange)

  return (
    <LabeledProperty {...props}>
      <Input name={annotation.key} value={value ?? ''} onClick={handleEdit} size={'xs'}/>
    </LabeledProperty>
  )
})

const getFunctionSignature = (type?: string) => `/**
 * @param {${type}} value the validated value.
 * @return {boolean} the validation result.
 */
async (value) => {`
