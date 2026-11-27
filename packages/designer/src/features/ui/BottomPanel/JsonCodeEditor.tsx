import {CalculableResult, namedObserver} from '@react-form-builder/core'
import {useCallback} from 'react'
import {useTranslation} from 'react-i18next'
import type {JsonCode} from '../../../stores/BuilderStore'
import {useBuilderStore} from '../../../utils/BuilderStoreContext'
import {GenericCodeEditor} from '../../calculation/GenericCodeEditor'
import {Header} from './Header'

const RawJsonCodeEditor = (props: JsonCode) => {
  const {editorTitle, json, editorKey, onSave, onValidate} = props
  const {t} = useTranslation()
  const builderStore = useBuilderStore()

  const handleClose = useCallback(() => {
    builderStore.closeCurrentEditable()
  }, [builderStore])

  const handleCompile = useCallback(
    (value: string) => {
      try {
        if (onValidate) {
          onValidate(value)
        } else {
          JSON.parse(value)
        }
        return CalculableResult.success(t('testingEditor.compilationOk'))
      } catch (e) {
        return CalculableResult.error([e as Error])
      }
    },
    [t, onValidate]
  )

  const handleSave = useCallback(
    (code: string) => {
      try {
        const object = JSON.parse(code)
        onSave(object)
      } catch (e) {
        // do nothing
      }
    },
    [onSave]
  )

  return (
    <>
      <Header>{`${t('codeEditor.generic.json.title')} '${editorTitle}'`}</Header>
      <GenericCodeEditor
        key={editorKey}
        source={json}
        onSave={handleSave}
        onClose={handleClose}
        onCompile={handleCompile}
        language="json"
        autoformat
        compact
      />
    </>
  )
}

export const JsonCodeEditor = namedObserver('JsonCodeEditor', RawJsonCodeEditor)
