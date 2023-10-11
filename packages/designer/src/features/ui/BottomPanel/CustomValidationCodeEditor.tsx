import {AsyncFunction, BaseCompilationResult, namedObserver} from '@react-form-builder/core'
import {useTranslation} from 'react-i18next'
import {CustomValidationCode} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../calculation/GenericCodeEditor'
import {Header} from './Header'

export const CustomValidationCodeEditor = namedObserver('CustomValidationCodeEditor', (props: CustomValidationCode) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()

  const beginContextLine = props.functionSignature
  const endContextLine = '}'

  const handleClose = () => builderStore.currentEditable = undefined

  const handleCompile = (value: string): BaseCompilationResult => {
    const source = `${beginContextLine}\n${value}\n${endContextLine}`
    try {
      AsyncFunction(source)
    } catch (e) {
      return {error: true, exceptions: [e as Error]}
    }
    return {error: false}
  }

  return <>
    <Header>{t('validation.editCustomValidationCode')} '{props.editorKey}'</Header>
    <GenericCodeEditor key={props.editorKey}
                       beginContextLine={beginContextLine}
                       endContextLine={endContextLine}
                       source={props.code}
                       onSave={props.onSave}
                       onClose={handleClose}
                       onCompile={handleCompile}
    />
  </>
})
