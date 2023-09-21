import {namedObserver} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {Button, Input} from 'rsuite'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'

export const CustomValidatorEditor = namedObserver('CustomValidatorEditor', (props: AnnotationEditorProps) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()
  const componentKey = `${props.componentData.key}[${props.annotation.key}][${props.annotation.type}]`
  const functionSignature = `/**
 * @param {${props.annotation.type}} value the validated value.
 * @return {boolean} the validation result.
 */
async (value) => {`

  const handleEdit = () => builderStore.editCustomValidationCode(componentKey, props.value, functionSignature, props.onChange)

  return <>
    <Input value={props.value ?? ''} readOnly disabled/>
    <Button block style={{marginTop: 6}} onClick={handleEdit}>{t('validation.editCode')}</Button>
  </>
})
