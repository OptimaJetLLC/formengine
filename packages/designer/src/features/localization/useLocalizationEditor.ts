import type {IFormData, Language} from '@react-form-builder/core'
import {getEditableFormData, useStore} from '@react-form-builder/core'
import {useCallback, useMemo} from 'react'
import type {EditableProperty} from '../../stores/BuilderStore'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import type {GenericCodeEditorProps} from '../calculation/GenericCodeEditor'
import {fluentLanguageId} from './consts'
import {
  buildLocalizationEditorKey,
  createLocalizationTestingFunction,
  resolveValidateBeforeSave,
  resolveLocalizationStoreValue,
} from './localizationEditorUtils'

/**
 * Parameters for the {@link useLocalizationEditor} hook.
 */
interface UseLocalizationEditorParams {
  /**
   * The editable property being localized.
   */
  editableProperty: EditableProperty
}

type LocalizationGenericCodeEditorProps = Omit<GenericCodeEditorProps, 'onClose'>

/**
 * Manages localization editor state, persistence, and testing behavior.
 * @param params hook parameters.
 * @param params.editableProperty the editable property being localized.
 * @returns localization editor state and GenericCodeEditor props.
 */
export const useLocalizationEditor = ({editableProperty}: UseLocalizationEditorParams) => {
  const builderStore = useBuilderStore()
  const localization = builderStore.viewer.form.localization
  const locEngine = localization.engine
  const localizationStringId = localization.getLocalizationItemId(editableProperty.componentKey, editableProperty.annotation.key)
  const language = builderStore.localizationLanguage
  const {formData} = useStore()
  const initialTestData = useMemo(() => getEditableFormData(formData), [formData])
  const storedLocalizationValue = editableProperty.getComputeCode('localization', {langCode: language.fullCode})
  const source = resolveLocalizationStoreValue(storedLocalizationValue, editableProperty.currentValue)
  const beginContextLine = `${localizationStringId} = `
  const editorKey = buildLocalizationEditorKey(editableProperty.annotation.key, language.fullCode)

  const applyLocalization = useCallback((next: string) => {
    editableProperty.setComputeCode(next, 'localization', {langCode: language.fullCode})
  }, [editableProperty, language.fullCode])

  const handleLanguageSelect = useCallback((selectedLanguage: Language) => {
    builderStore.applyDesignerLanguageSelection(selectedLanguage)
  }, [builderStore])

  const handleClear = useCallback(() => {
    applyLocalization('')
  }, [applyLocalization])

  const onCompile = useCallback(
    (sourceCode: string, formData: IFormData) => createLocalizationTestingFunction({
      testLocalization: locEngine.testLocalization?.bind(locEngine),
      getEditorValueForSave: () => sourceCode,
      localizationStringId,
      language,
    })(formData),
    [language, locEngine, localizationStringId],
  )

  const genericCodeEditorProps: LocalizationGenericCodeEditorProps = {
    language: fluentLanguageId,
    beginContextLine,
    canEditBeginContextLine: true,
    source,
    editorKey,
    validateBeforeSave: resolveValidateBeforeSave,
    onSave: applyLocalization,
    onCompile,
    initialTestData,
    compact: !locEngine.testLocalization,
  }

  return {
    language,
    handleLanguageSelect,
    handleClear,
    genericCodeEditorProps,
  }
}
