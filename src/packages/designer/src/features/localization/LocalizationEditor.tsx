import type {IFormData} from '@react-form-builder/core'
import {CalculableResult, getEditableFormData, namedObserver, useStore} from '@react-form-builder/core'
import {action} from 'mobx'
import {useCallback, useEffect, useMemo, useRef, useState} from 'react'
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

const RawLocalizationEditor = ({editableProperty, onClose}: CalculableCodeEditorProps) => {
  const t = useTranslationPart('common')
  const builderStore = useBuilderStore()
  const locEngine = builderStore.viewer.form.localization.engine
  const localizationStringId = locEngine.getCompatibleId(`${editableProperty.componentKey}_${editableProperty.annotation.key}`)
  const testingEditor = useRef<TestingEditorRef>({})
  const {formData} = useStore()
  const initialData = useMemo(() => {
    return getEditableFormData(formData)
  }, [formData])

  const [language, setLanguage] = useState(builderStore.localizationLanguage)
  const initialValue = useMemo(() => {
    return editableProperty.getComputeCode('localization', {langCode: language.fullCode})
  }, [editableProperty, language])
  const [value, setValue] = useState(initialValue)
  useEffect(() => {
    setValue(initialValue)
  }, [initialValue, language, editableProperty])

  const handleSave = useCallback(() => {
    const result = testingEditor.current.test?.()
    if (result?.error || result?.exceptions) return
    action(() => editableProperty.setComputeCode(value, 'localization', {langCode: language.fullCode}))()
  }, [editableProperty, value, language.fullCode])

  const beginContextLine = `${localizationStringId} =`
  const endContextLine = ''

  const testingFunction = useCallback((formData: IFormData) => {
    if (!locEngine.testLocalization) {
      // If the localization testing function is not set, then we return a successful testing response with a message
      return CalculableResult.success('Localization testing function is missing')
    }

    const result = locEngine.testLocalization(
      value,
      localizationStringId,
      language,
      formData,
    )

    if (Array.isArray(result) && result.length > 0) {
      return CalculableResult.error(result as Array<Error>)
    }

    return CalculableResult.success(result)
  }, [locEngine, localizationStringId, value, language])

  return <Columns className={styles.columns}>
    <Rows className={styles.rows}>
      <CodeEditor key={`${editableProperty.annotation.key}_${language.fullCode}`} language={fluentLanguageId}
                  initialValue={initialValue}
                  beginContextLine={beginContextLine}
                  endContextLine={endContextLine} canEditBeginContextLine={true} onChange={setValue}/>
      <div className={styles.toolbar}>
        <ButtonGroup size={'sm'}>
          <Button appearance="primary" onClick={handleSave}>{t('save')}</Button>
          <Button appearance="ghost" onClick={onClose}>{t('close')}</Button>
        </ButtonGroup>
        <LocalizationPicker value={language.fullCode} onSelect={setLanguage}/>
      </div>
    </Rows>
    {locEngine.testLocalization &&
      <TestingEditor initialData={initialData} testingFunction={testingFunction} ref={testingEditor}/>
    }
  </Columns>
}

export const LocalizationEditor = namedObserver('LocalizationEditor', RawLocalizationEditor)
