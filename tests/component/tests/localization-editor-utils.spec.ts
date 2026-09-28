import {CalculableResult, Language} from '@react-form-builder/core'
import {describe, expect, it, vi} from 'vitest'
import {
  buildConstrainedLocalizationDocument,
  buildLocalizationEditorKey,
  createLocalizationTestingFunction,
  getLocalizationEditorSaveValue,
  isWhitespaceOnlyLocalizationValue,
  normalizeLocalizationEditorValue,
  resolveCodeEditorSaveAction,
  resolveGenericCodeEditorSave,
  resolveLocalizationStoreValue,
  resolveValidateBeforeSave,
  stringifyLocalizationDefault,
  toLocalizationTestCalculableResult,
} from '../../../packages/designer/src/features/localization/localizationEditorUtils'

describe('isWhitespaceOnlyLocalizationValue', () => {
  it('detects whitespace-only values as bypass candidates', () => {
    expect(isWhitespaceOnlyLocalizationValue('   ')).toBe(true)
    expect(isWhitespaceOnlyLocalizationValue('\t \n')).toBe(true)
  })

  it('does not detect empty or non-whitespace values as bypass candidates', () => {
    expect(isWhitespaceOnlyLocalizationValue('')).toBe(false)
    expect(isWhitespaceOnlyLocalizationValue('abc')).toBe(false)
    expect(isWhitespaceOnlyLocalizationValue('  abc')).toBe(false)
  })
})

describe('stringifyLocalizationDefault', () => {
  it('returns an empty string for null and undefined', () => {
    expect(stringifyLocalizationDefault(null)).toBe('')
    expect(stringifyLocalizationDefault(undefined)).toBe('')
  })

  it('returns strings unchanged', () => {
    expect(stringifyLocalizationDefault('hello')).toBe('hello')
    expect(stringifyLocalizationDefault('')).toBe('')
  })

  it('converts numbers and booleans to strings', () => {
    expect(stringifyLocalizationDefault(42)).toBe('42')
    expect(stringifyLocalizationDefault(0)).toBe('0')
    expect(stringifyLocalizationDefault(true)).toBe('true')
    expect(stringifyLocalizationDefault(false)).toBe('false')
  })

  it('stringifies objects with formatting', () => {
    expect(stringifyLocalizationDefault({a: 1})).toBe('{\n  "a": 1\n}')
  })

  it('returns an empty string when JSON.stringify throws', () => {
    const circular: {self?: unknown} = {}
    circular.self = circular
    expect(stringifyLocalizationDefault(circular)).toBe('')
  })
})

describe('resolveLocalizationStoreValue', () => {
  it('returns the stored localization value when it is non-empty', () => {
    expect(resolveLocalizationStoreValue('stored-value', 'default')).toBe('stored-value')
    expect(resolveLocalizationStoreValue('   ', 'default')).toBe('   ')
  })

  it('falls back to the stringified current value when stored localization is empty', () => {
    expect(resolveLocalizationStoreValue('', 'default')).toBe('default')
    expect(resolveLocalizationStoreValue('', 42)).toBe('42')
    expect(resolveLocalizationStoreValue('', null)).toBe('')
  })
})

describe('normalizeLocalizationEditorValue', () => {
  const beginContextLine = 'locText.placeholder = '

  it('strips the begin context line when it is at the start', () => {
    expect(normalizeLocalizationEditorValue(`${beginContextLine}Hello`, beginContextLine)).toBe('Hello')
  })

  it('strips the begin context line when it appears later in the document', () => {
    expect(normalizeLocalizationEditorValue(`prefix\n${beginContextLine}Hello`, beginContextLine)).toBe('Hello')
  })

  it('removes a leading newline after the begin context line is stripped', () => {
    expect(normalizeLocalizationEditorValue(`${beginContextLine}\nHello`, beginContextLine)).toBe('Hello')
  })

  it('returns the source unchanged when the begin context line is missing', () => {
    expect(normalizeLocalizationEditorValue('Hello', beginContextLine)).toBe('Hello')
  })

  it('returns the source unchanged when the begin context line is empty', () => {
    expect(normalizeLocalizationEditorValue('Hello', '')).toBe('Hello')
  })
})

describe('buildConstrainedLocalizationDocument', () => {
  it('concatenates the begin context line and the editable body', () => {
    expect(buildConstrainedLocalizationDocument('locText.placeholder = ', 'Hello')).toBe('locText.placeholder = Hello')
  })

  it('returns the editable body when the begin context line is empty', () => {
    expect(buildConstrainedLocalizationDocument('', 'Hello')).toBe('Hello')
  })
})

describe('getLocalizationEditorSaveValue', () => {
  const beginContextLine = 'locText.placeholder = '

  it('returns the fallback value when the model value is unavailable', () => {
    expect(getLocalizationEditorSaveValue(undefined, 'fallback', beginContextLine)).toBe('fallback')
    expect(getLocalizationEditorSaveValue(null, 'fallback', beginContextLine)).toBe('fallback')
  })

  it('normalizes the model value when it is available', () => {
    expect(getLocalizationEditorSaveValue(`${beginContextLine}Hello`, 'fallback', beginContextLine)).toBe('Hello')
  })
})

describe('toLocalizationTestCalculableResult', () => {
  it('returns an error result for a non-empty error array', () => {
    const errors = [new Error('invalid syntax')]
    const result = toLocalizationTestCalculableResult(errors)

    expect(result.error).toBe(true)
    expect(result.result).toBeUndefined()
  })

  it('returns a success result for an empty error array', () => {
    const result = toLocalizationTestCalculableResult([])

    expect(result.error).toBeFalsy()
    expect(result.result).toStrictEqual([])
  })

  it('returns a success result for a resolved localization string', () => {
    const result = toLocalizationTestCalculableResult('Hello')

    expect(result.error).toBeFalsy()
    expect(result.result).toBe('Hello')
  })
})

describe('buildLocalizationEditorKey', () => {
  it('combines the property key and language code', () => {
    expect(buildLocalizationEditorKey('placeholder', 'en-US')).toBe('placeholder_en-US')
    expect(buildLocalizationEditorKey('label', 'de-DE')).toBe('label_de-DE')
  })
})

describe('resolveCodeEditorSaveAction', () => {
  it('saves whitespace-only values without requiring a successful test result', () => {
    expect(resolveCodeEditorSaveAction('   ')).toBe('save')
    expect(resolveCodeEditorSaveAction('   ', CalculableResult.error([new Error('failed')]))).toBe('save')
  })

  it('aborts save when the test result contains an error', () => {
    expect(resolveCodeEditorSaveAction('Hello', CalculableResult.error([new Error('failed')]))).toBe('abort')
  })

  it('aborts save when the test result contains exceptions', () => {
    expect(resolveCodeEditorSaveAction('Hello', new CalculableResult(false, undefined, [new Error('failed')]))).toBe('abort')
  })

  it('saves valid values when testing succeeds', () => {
    expect(resolveCodeEditorSaveAction('Hello', CalculableResult.success('Hello'))).toBe('save')
    expect(resolveCodeEditorSaveAction('Hello')).toBe('save')
  })
})

describe('resolveValidateBeforeSave', () => {
  it('skips validation for whitespace-only values', () => {
    expect(resolveValidateBeforeSave('   ')).toBe('skip-test')
  })

  it('continues validation for other values', () => {
    expect(resolveValidateBeforeSave('')).toBe('continue')
    expect(resolveValidateBeforeSave('Hello')).toBe('continue')
  })
})

describe('resolveGenericCodeEditorSave', () => {
  it('skips testing when validateBeforeSave returns skip-test', () => {
    expect(
      resolveGenericCodeEditorSave('   ', {
        validateBeforeSave: resolveValidateBeforeSave,
        testResult: CalculableResult.error([new Error('failed')]),
      })
    ).toBe('save')
  })

  it('aborts save when validation fails for non-whitespace values', () => {
    expect(
      resolveGenericCodeEditorSave('Hello', {
        validateBeforeSave: resolveValidateBeforeSave,
        testResult: CalculableResult.error([new Error('failed')]),
      })
    ).toBe('abort')
  })

  it('saves when validation succeeds for non-whitespace values', () => {
    expect(
      resolveGenericCodeEditorSave('Hello', {
        validateBeforeSave: resolveValidateBeforeSave,
        testResult: CalculableResult.success('Hello'),
      })
    ).toBe('save')
  })
})

describe('createLocalizationTestingFunction', () => {
  const language = new Language('en', 'US', 'English', 'American English')

  it('returns a success message when testLocalization is unavailable', () => {
    const testingFunction = createLocalizationTestingFunction({
      getEditorValueForSave: () => 'Hello',
      localizationStringId: 'locText.placeholder',
      language,
    })

    const result = testingFunction({data: {}} as any)

    expect(result.error).toBeFalsy()
    expect(result.result).toBe('Localization testing function is missing')
  })

  it('delegates to the localization engine and maps errors', () => {
    const testLocalization = vi.fn().mockReturnValue([new Error('invalid syntax')])
    const testingFunction = createLocalizationTestingFunction({
      testLocalization,
      getEditorValueForSave: () => 'broken {',
      localizationStringId: 'locText.placeholder',
      language,
    })

    const formData = {data: {name: 'Ada'}} as any
    const result = testingFunction(formData)

    expect(testLocalization).toHaveBeenCalledWith('broken {', 'locText.placeholder', language, formData)
    expect(result.error).toBe(true)
  })

  it('returns a success result for a resolved localization string', () => {
    const testLocalization = vi.fn().mockReturnValue('Hello Ada')
    const testingFunction = createLocalizationTestingFunction({
      testLocalization,
      getEditorValueForSave: () => 'Hello {$name}',
      localizationStringId: 'locText.placeholder',
      language,
    })

    const result = testingFunction({data: {name: 'Ada'}} as any)

    expect(result.error).toBeFalsy()
    expect(result.result).toBe('Hello Ada')
  })
})
