import type {CalculableResult, IFormData, ILocalizationEngine, Language} from '@react-form-builder/core'
import {CalculableResult as CalculableResultFactory, isBoolean, isNumber, isString, isUndefined} from '@react-form-builder/core'
import {buildConstrainedDocument, extractEditableBody} from '../components/CodeEditor/constrainedDocument'

/**
 * Returns true when the localization value contains only whitespace characters.
 * @param value localization value.
 * @returns true when the value is whitespace-only and not empty.
 */
export const isWhitespaceOnlyLocalizationValue = (value: string) => value !== '' && value.trim() === ''

/**
 * Converts a property value to a string suitable as the localization editor default.
 * @param value the current property value.
 * @returns the string representation for the editor.
 */
export const stringifyLocalizationDefault = (value: unknown): string => {
  if (value === null || isUndefined(value)) return ''
  if (isString(value)) return value
  if (isNumber(value) || isBoolean(value)) return String(value)
  try {
    return JSON.stringify(value, null, 2)
  } catch {
    return ''
  }
}

/**
 * Resolves the editor value from stored localization or the property default.
 * @param storedLocalizationValue the persisted localization source for the selected language.
 * @param currentValue the current property value used when no localization is stored.
 * @returns the value to display in the editor.
 */
export const resolveLocalizationStoreValue = (storedLocalizationValue: string, currentValue: unknown): string => {
  return storedLocalizationValue !== '' ? storedLocalizationValue : stringifyLocalizationDefault(currentValue)
}

/**
 * Extracts the editable Fluent body from a constrained editor document.
 * @param source the full editor document value.
 * @param beginContextLine the fixed prefix line before the editable body.
 * @returns the normalized editable body.
 */
export const normalizeLocalizationEditorValue = (source: string, beginContextLine: string): string => {
  if (!beginContextLine) {
    return source
  }
  const extracted = extractEditableBody(source, beginContextLine, true, undefined)
  return extracted.startsWith('\n') ? extracted.slice(1) : extracted
}

/**
 * Builds the full constrained editor document for a Fluent localization entry.
 * @param beginContextLine the fixed prefix line before the editable body.
 * @param fluentBody the editable Fluent body.
 * @returns the document value for the constrained editor.
 */
export const buildConstrainedLocalizationDocument = (beginContextLine: string, fluentBody: string): string => {
  if (!beginContextLine) {
    return fluentBody
  }
  return buildConstrainedDocument(fluentBody, beginContextLine, true, undefined)
}

/**
 * Resolves the value to persist from the Monaco model or the in-memory editor state.
 * @param modelValue the current Monaco model value when available.
 * @param fallbackValue the in-memory editor body value.
 * @param beginContextLine the fixed prefix line before the editable body.
 * @returns the normalized body value to save.
 */
export const getLocalizationEditorSaveValue = (
  modelValue: string | undefined | null,
  fallbackValue: string,
  beginContextLine: string
): string => {
  if (typeof modelValue !== 'string') return fallbackValue
  return normalizeLocalizationEditorValue(modelValue, beginContextLine)
}

/**
 * Maps a localization engine test result to a calculable result for the testing panel.
 * @param result the localization engine test output.
 * @returns the calculable result for display in the testing editor.
 */
export const toLocalizationTestCalculableResult = (result: unknown): CalculableResult => {
  if (Array.isArray(result) && result.length > 0) {
    return CalculableResultFactory.error(result as Array<Error>)
  }

  return CalculableResultFactory.success(result)
}

/**
 * Builds the React key used to remount the localization code editor when the language changes.
 * @param propertyKey the editable property key.
 * @param languageFullCode the selected language full code.
 * @returns the editor remount key.
 */
export const buildLocalizationEditorKey = (propertyKey: string, languageFullCode: string): string => {
  return `${propertyKey}_${languageFullCode}`
}

type CodeEditorSaveAction = 'save' | 'abort'

/**
 * The validation mode used before saving a code editor value.
 */
export type ValidateBeforeSaveResult = 'skip-test' | 'continue'

/**
 * Resolves whether a code editor save should proceed after extracting the editor body.
 * @param extractedBody the normalized editor body value.
 * @param testResult the optional testing panel result for non-whitespace values.
 * @returns the save action to perform.
 */
export const resolveCodeEditorSaveAction = (
  extractedBody: string,
  testResult?: Pick<CalculableResult, 'error' | 'exceptions'>
): CodeEditorSaveAction => {
  if (isWhitespaceOnlyLocalizationValue(extractedBody)) return 'save'
  if (testResult?.error || testResult?.exceptions) return 'abort'
  return 'save'
}

/**
 * Resolves whether validation should be skipped before saving a code editor value.
 * @param value the editor body value.
 * @returns the validation mode for the save action.
 */
export const resolveValidateBeforeSave = (value: string): ValidateBeforeSaveResult => {
  return isWhitespaceOnlyLocalizationValue(value) ? 'skip-test' : 'continue'
}

/**
 * Resolves whether the generic code editor should persist the current value.
 * @param valueToSave the value that would be persisted.
 * @param options optional validation and testing results.
 * @param options.validateBeforeSave the optional validation mode resolver.
 * @param options.testResult the optional testing panel result.
 * @returns the save action to perform.
 */
export const resolveGenericCodeEditorSave = (
  valueToSave: string,
  options?: {
    validateBeforeSave?: (value: string) => ValidateBeforeSaveResult
    testResult?: Pick<CalculableResult, 'error' | 'exceptions'>
  }
): CodeEditorSaveAction => {
  const skipTest = options?.validateBeforeSave?.(valueToSave) === 'skip-test'
  const testResult = skipTest ? undefined : options?.testResult
  return resolveCodeEditorSaveAction(valueToSave, testResult)
}

/**
 * Creates the testing function used by the localization editor testing panel.
 * @param params localization testing dependencies.
 * @param params.testLocalization the optional localization engine test function.
 * @param params.getEditorValueForSave the function that returns the editor body to test.
 * @param params.localizationStringId the localization string identifier.
 * @param params.language the selected language.
 * @returns the testing function for the testing editor.
 */
export const createLocalizationTestingFunction = (params: {
  testLocalization?: ILocalizationEngine['testLocalization']
  getEditorValueForSave: () => string
  localizationStringId: string
  language: Language
}) => {
  return (formData: IFormData): CalculableResult => {
    if (!params.testLocalization) {
      return CalculableResultFactory.success('Localization testing function is missing')
    }

    const result = params.testLocalization(params.getEditorValueForSave(), params.localizationStringId, params.language, formData)

    return toLocalizationTestCalculableResult(result)
  }
}
