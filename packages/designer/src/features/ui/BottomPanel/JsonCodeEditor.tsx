import {CalculableResult, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import type {JsonCode} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../calculation/GenericCodeEditor'
import {Header} from './Header'

const RawJsonCodeEditor = (props: JsonCode) => {
  const {editorTitle, json, editorKey, onSave} = props
  const {t} = useTranslation()
  const builderStore = useBuilderStore()

  const handleClose = useCallback(() => builderStore.currentEditable = undefined, [builderStore])

  const handleCompile = useCallback((value: string) => {
    try {
      JSON.parse(value)
      return CalculableResult.success(t('testingEditor.compilationOk'))
    } catch (e) {
      return CalculableResult.error([e as Error])
    }
  }, [t])

  const handleSave = useCallback(code => {
    try {
      const object = JSON.parse(code)
      onSave(object)
    } catch (e) {
      // do nothing
    }
  }, [onSave])

  return <>
    <Header>{`${t('codeEditor.generic.json.title')} '${editorTitle}'`}</Header>
    <GenericCodeEditor key={editorKey}
                       source={json}
                       onSave={handleSave}
                       onClose={handleClose}
                       onCompile={handleCompile}
                       language="json"
                       compact
    />
  </>
}

export const JsonCodeEditor = namedObserver('JsonCodeEditor', RawJsonCodeEditor)
