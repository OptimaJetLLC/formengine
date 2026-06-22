import {AsyncFunction, CalculableResult, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import type {EditableFormValidator} from '../../../stores/EditableFormValidator'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../calculation/GenericCodeEditor'
import {Header} from './Header'

const beginContextLine = `/**
 * @param {Record<string, unknown>} formData the form data.
 * @returns {Record<string, string> | undefined} the validation result.
 */
async (formData) => {`
const endContextLine = '}'

const RawFormValidatorCodeEditor = (props: EditableFormValidator) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()

  const handleClose = useCallback(() => {
    builderStore.closeCurrentEditable()
  }, [builderStore])
  const handleCompile = useCallback((value: string) => {
    const source = `${beginContextLine}\n${value}\n${endContextLine}`
    try {
      AsyncFunction(source)
      return CalculableResult.success(t('testingEditor.compilationOk'))
    } catch (e) {
      return CalculableResult.error([e as Error])
    }
  }, [t])

  return <>
    <Header>{t('validation.editFormValidatorCode')}</Header>
    <GenericCodeEditor key={props.editorKey}
                       beginContextLine={beginContextLine}
                       endContextLine={endContextLine}
                       source={props.code}
                       onSave={props.onSave}
                       onClose={handleClose}
                       onCompile={handleCompile}
                       compact
    />
  </>
}

export const FormValidatorCodeEditor = namedObserver('FormValidatorCodeEditor', RawFormValidatorCodeEditor)
