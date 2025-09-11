import {AsyncFunction, CalculableResult, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import type {CustomValidationCode} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../calculation/GenericCodeEditor'
import {Header} from './Header'

const RawCustomValidationCodeEditor = (props: CustomValidationCode) => {
  const {t} = useTranslation()
  const builderStore = useBuilderStore()

  const beginContextLine = props.functionSignature
  const endContextLine = '}'

  const handleClose = useCallback(() => builderStore.currentEditable = undefined, [builderStore])
  const handleCompile = useCallback((value: string) => {
    const source = `${beginContextLine}\n${value}\n${endContextLine}`
    try {
      AsyncFunction(source)
      return CalculableResult.success(t('testingEditor.compilationOk'))
    } catch (e) {
      return CalculableResult.error([e as Error])
    }
  }, [beginContextLine, endContextLine, t])

  return <>
    <Header>{`${t('validation.editCustomValidationCode')} '${props.editorKey}'`}</Header>
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

export const CustomValidationCodeEditor = namedObserver('CustomValidationCodeEditor', RawCustomValidationCodeEditor)
