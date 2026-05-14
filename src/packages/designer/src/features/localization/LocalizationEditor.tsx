import type {OnMount} from '@monaco-editor/react'
import type {IFormData} from '@react-form-builder/core'
import {CalculableResult, getEditableFormData, isNumber, isString, isUndefined, namedObserver, useStore} from '@react-form-builder/core'
import {action} from 'mobx'
import type {editor} from 'monaco-editor'
import {useCallback, useMemo, useRef, useState} from 'react'
import {Button, ButtonGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {CalculableCodeEditorProps} from '../calculation/CalculableCodeEditor'
import {CodeEditor} from '../components/CodeEditor/CodeEditor'
import {Columns, Rows} from '../components/Containers'
import type {TestingEditorRef} from '../ui/BottomPanel/TestingEditor'
import {TestingEditor} from '../ui/BottomPanel/TestingEditor'
import {LocalizationPicker} from './components/LocalizationPicker'
import {fluentLanguageId} from './consts'
import {useTranslationPart} from './hooks'
import styles from './LocalizationEditor.module.css'

/**
 * Returns true when the localization value contains only whitespace characters.
 * @param value localization value.
 * @returns true when the value is whitespace-only and not empty.
 */
export const isWhitespaceOnlyLocalizationValue = (value: string) => value !== '' && value.trim() === ''

const stringifyLocalizationDefault = (value: unknown): string => {
  if (value === null || isUndefined(value)) return ''
  if (isString(value)) return value
  if (isNumber(value) || typeof value === 'boolean') return String(value)
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return ''
  }
}

const RawLocalizationEditor = ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const t = useTranslationPart('common')
  const tPanel = useTranslationPart('bottomPanel')
  const builderStore = useBuilderStore()
  const locEngine = builderStore.viewer.form.localization.engine
  const localizationStringId = locEngine.getCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const testingEditor = useRef<TestingEditorRef>({})
  const [language, setLanguage] = useState(builderStore.localizationLanguage)
  const codeEditorRef = useRef<editor.IStandaloneCodeEditor>(null)
  const {formData} = useStore()
  const initialData = useMemo(() => getEditableFormData(formData), [formData])
  const storedLocalizationValue = editableProperty.getComputeCode('localization', {langCode: language.fullCode})
  const storeValue = storedLocalizationValue !== '' ? storedLocalizationValue : stringifyLocalizationDefault(editableProperty.currentValue)
  const [value, setValue] = useState(storeValue)
  const [prevValue, setPrevValue] = useState(storeValue)
  const beginContextLine = `${localizationStringId} = `
  const codeEditorKey = `${editableProperty.annotation.key}_${language.fullCode}`
  const endContextLine: string = ''

  const applyLocalization = useCallback((next: string) => {
    action(() => editableProperty.setComputeCode(next, 'localization', {langCode: language.fullCode}))()
  }, [editableProperty, language.fullCode])

  if (storeValue !== prevValue) {
    setPrevValue(storeValue)
    setValue(storeValue)
  }

  const normalizeEditorValue = useCallback((source: string) => {
    let normalized = source

    if (beginContextLine) {
      const prefixAt = normalized.startsWith(beginContextLine) ? 0 : normalized.indexOf(beginContextLine)
      if (prefixAt !== -1) {
        normalized = normalized.slice(prefixAt + beginContextLine.length)
      }
    }
    if (endContextLine && normalized.endsWith(endContextLine)) {
      normalized = normalized.slice(0, normalized.length - endContextLine.length)
    }
    if (beginContextLine && normalized.startsWith('\n')) {
      normalized = normalized.slice(1)
    }
    if (endContextLine && normalized.endsWith('\n')) {
      normalized = normalized.slice(0, normalized.length - 1)
    }

    return normalized
  }, [beginContextLine, endContextLine])

  const getEditorValueForSave = useCallback(() => {
    const modelValue = codeEditorRef.current?.getModel()?.getValue()
    if (typeof modelValue !== 'string') return value
    return normalizeEditorValue(modelValue)
  }, [normalizeEditorValue, value])

  const writeConstrainedDocument = useCallback(
    (fluentBody: string) => {
      const model = codeEditorRef.current?.getModel()
      if (!model || !beginContextLine) return
      const contentDelimiter = ''
      const postfix = endContextLine ? `\n${endContextLine}` : ''
      model.setValue(beginContextLine + contentDelimiter + fluentBody + postfix)
    },
    [beginContextLine, endContextLine],
  )

  const syncEditorAfterPersist = useCallback(() => {
    const persistedBody = editableProperty.getComputeCode('localization', {langCode: language.fullCode}) ?? ''
    writeConstrainedDocument(persistedBody)
    setValue(persistedBody)
  }, [editableProperty, language.fullCode, writeConstrainedDocument])

  const handleEditorMount = useCallback<OnMount>((editor) => {
    codeEditorRef.current = editor
  }, [])

  const handleSave = useCallback(() => {
    const extractedBody = getEditorValueForSave()
    if (isWhitespaceOnlyLocalizationValue(extractedBody)) {
      applyLocalization(extractedBody)
      syncEditorAfterPersist()
      return
    }

    const result = testingEditor.current.test?.()
    if (result?.error || result?.exceptions) return
    applyLocalization(extractedBody)
    syncEditorAfterPersist()
  }, [applyLocalization, getEditorValueForSave, syncEditorAfterPersist])

  const handleClear = useCallback(() => {
    applyLocalization('')
    syncEditorAfterPersist()
  }, [applyLocalization, syncEditorAfterPersist])

  const testingFunction = useCallback((formData: IFormData) => {
    if (!locEngine.testLocalization) {
      // If the localization testing function is not set, then we return a successful testing response with a message
      return CalculableResult.success('Localization testing function is missing')
    }

    const result = locEngine.testLocalization(
      getEditorValueForSave(),
      localizationStringId,
      language,
      formData,
    )

    if (Array.isArray(result) && result.length > 0) {
      return CalculableResult.error(result as Array<Error>)
    }

    return CalculableResult.success(result)
  }, [getEditorValueForSave, locEngine, localizationStringId, language])

  return <Columns className={styles.columns}>
    <Rows className={styles.rows}>
      <CodeEditor key={codeEditorKey}
                  language={fluentLanguageId}
                  initialValue={storeValue}
                  beginContextLine={beginContextLine}
                  endContextLine={endContextLine}
                  canEditBeginContextLine={true}
                  onMount={handleEditorMount}
                  onChange={setValue}/>
      <div className={styles.toolbar}>
        <ButtonGroup size={'sm'}>
          <Button appearance="primary" onClick={handleSave}>{t('save')}</Button>
          <Button appearance="ghost" onClick={onClose}>{t('close')}</Button>
        </ButtonGroup>
        <LocalizationPicker value={language.fullCode} onSelect={setLanguage}/>
        <Button appearance="ghost" data-testid="localization-editor-clear" size="sm"
                onClick={handleClear}>{tPanel('clearLocalization')}</Button>
      </div>
    </Rows>
    {locEngine.testLocalization &&
      <TestingEditor initialData={initialData} testingFunction={testingFunction} ref={testingEditor}/>
    }
  </Columns>
}

export const LocalizationEditor = namedObserver('LocalizationEditor', RawLocalizationEditor)
