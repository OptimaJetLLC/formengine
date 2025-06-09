import {namedObserver} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {Button} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import LabeledProperty from '../../components/LabeledProperty'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'

const getFunctionSignature = (type?: string) => `/**
 * @param {${type}} value the validated value.
 * @param {IFormData} form the form.
 * @return {boolean} the validation result.
 */
async (value, form) => {`

const RawCustomValidatorEditor = (props: AnnotationEditorProps) => {
  const {annotation, componentData, value, onChange} = props
  const builderStore = useBuilderStore()
  const componentKey = `${componentData.key}[${annotation.key}][${annotation.type}]`
  const handleEdit = () => builderStore.editCustomValidationCode(componentKey, value, getFunctionSignature(annotation.type), onChange)
  const {t} = useTranslation()
  const label = t(`annotation.${annotation.key}.hint`)

  return (
    <LabeledProperty {...props}>
      <Button name={annotation.key} onClick={handleEdit} size={'xs'} appearance={'ghost'} block style={{borderStyle: 'dashed'}}>
        {label}
      </Button>
    </LabeledProperty>
  )
}

export const CustomValidatorEditor = namedObserver('CustomValidatorEditor', RawCustomValidatorEditor)
