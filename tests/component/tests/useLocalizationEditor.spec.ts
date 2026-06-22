import {CalculableResult, Language} from '@react-form-builder/core'
import {act} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {useLocalizationEditor} from '../../../packages/designer/src/features/localization/useLocalizationEditor'
import {EditableProperty} from '../../../packages/designer/src/stores/BuilderStore'
import {renderHook} from '../config/renderHook'

const enUS = new Language('en', 'US', 'English', 'American English')
const deDE = new Language('de', 'DE', 'German', 'German')

let mockBuilderStore: {
  localizationLanguage: Language
  applyDesignerLanguageSelection: ReturnType<typeof vi.fn>
  viewer: {
    selectedLanguage?: Language
    form: {
      localization: {
        engine: {
          testLocalization?: ReturnType<typeof vi.fn>
        }
        getLocalizationItemId: ReturnType<typeof vi.fn>
      }
    }
  }
}

let mockFormData: { data: Record<string, unknown> }
let storedValues: Record<string, string>
let setComputeCode: EditableProperty['setComputeCode']
let getComputeCode: EditableProperty['getComputeCode']

vi.mock('../../../packages/designer/src/utils/BuilderStoreContext', () => ({
  useBuilderStore: () => mockBuilderStore,
}))

vi.mock('@react-form-builder/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@react-form-builder/core')>()
  return {
    ...actual,
    useStore: () => ({formData: mockFormData}),
  }
})

const createEditableProperty = (currentValue: unknown = 'Default label') => {
  return new EditableProperty(
    vi.fn(),
    setComputeCode,
    getComputeCode,
    vi.fn(),
    vi.fn(),
    {key: 'placeholder', name: 'placeholder'} as EditableProperty['annotation'],
    'locText',
    currentValue,
  )
}

describe('useLocalizationEditor', () => {
  beforeEach(() => {
    storedValues = {}
    setComputeCode = vi.fn((value: string, type: string, opts?: { langCode?: string }) => {
      if (type === 'localization' && opts?.langCode) {
        storedValues[opts.langCode] = value
      }
    }) as EditableProperty['setComputeCode']
    getComputeCode = vi.fn((type: string, opts?: { langCode?: string }) => {
      if (type === 'localization' && opts?.langCode) {
        return storedValues[opts.langCode] ?? ''
      }
      return ''
    }) as EditableProperty['getComputeCode']
    mockFormData = {data: {name: 'Ada'}}
    mockBuilderStore = {
      localizationLanguage: enUS,
      applyDesignerLanguageSelection: vi.fn((language: Language) => {
        mockBuilderStore.localizationLanguage = language
        mockBuilderStore.viewer.selectedLanguage = language
      }),
      viewer: {
        selectedLanguage: enUS,
        form: {
          localization: {
            engine: {
              testLocalization: vi.fn().mockReturnValue('Hello'),
            },
            getLocalizationItemId: vi.fn((componentKey: string, propertyKey: string) => `${componentKey}.${propertyKey}`),
          },
        },
      },
    }
  })

  it('uses the current property value when stored localization is empty', () => {
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty('Default label')}))

    expect(result.current.genericCodeEditorProps.source).toBe('Default label')
    expect(result.current.genericCodeEditorProps.beginContextLine).toBe('locText.placeholder = ')
  })

  it('uses stored localization when it is available for the selected language', () => {
    storedValues['en-US'] = 'Stored value'
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty('Default label')}))

    expect(result.current.genericCodeEditorProps.source).toBe('Stored value')
  })

  it('changes the editor key when the language changes', () => {
    const {result, rerender} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    expect(result.current.genericCodeEditorProps.editorKey).toBe('placeholder_en-US')

    act(() => {
      result.current.handleLanguageSelect(deDE)
    })
    rerender()

    expect(result.current.genericCodeEditorProps.editorKey).toBe('placeholder_de-DE')
  })

  it('syncs the designer and viewer language through applyDesignerLanguageSelection', () => {
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    act(() => {
      result.current.handleLanguageSelect(deDE)
    })

    expect(mockBuilderStore.applyDesignerLanguageSelection).toHaveBeenCalledWith(deDE)
    expect(mockBuilderStore.localizationLanguage).toBe(deDE)
    expect(mockBuilderStore.viewer.selectedLanguage).toBe(deDE)
  })

  it('loads stored localization for the newly selected language', () => {
    storedValues['de-DE'] = 'Hallo'
    const {result, rerender} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty('Default label')}))

    act(() => {
      result.current.handleLanguageSelect(deDE)
    })
    rerender()

    expect(result.current.genericCodeEditorProps.source).toBe('Hallo')
  })

  it('persists localization with the selected language code', () => {
    const {result, rerender} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    act(() => {
      result.current.handleLanguageSelect(deDE)
    })
    rerender()
    act(() => {
      result.current.genericCodeEditorProps.onSave('Hallo')
    })

    expect(setComputeCode).toHaveBeenCalledWith('Hallo', 'localization', {langCode: 'de-DE'})
  })

  it('skips validation for whitespace-only values', () => {
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    expect(result.current.genericCodeEditorProps.validateBeforeSave?.('   ')).toBe('skip-test')
    expect(result.current.genericCodeEditorProps.validateBeforeSave?.('Hello')).toBe('continue')
  })

  it('does not expose Monaco-specific save hooks', () => {
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    expect(result.current.genericCodeEditorProps).not.toHaveProperty('getSourceForSave')
    expect(result.current.genericCodeEditorProps).not.toHaveProperty('onEditorMount')
  })

  it('clears localization for the selected language', () => {
    storedValues['en-US'] = 'Hello'
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    act(() => {
      result.current.handleClear()
    })

    expect(setComputeCode).toHaveBeenCalledWith('', 'localization', {langCode: 'en-US'})
  })

  it('reports whether localization testing is available', () => {
    const {result, rerender} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    expect(result.current.genericCodeEditorProps.compact).toBe(false)

    mockBuilderStore.viewer.form.localization.engine.testLocalization = undefined
    rerender()

    expect(result.current.genericCodeEditorProps.compact).toBe(true)
  })

  it('normalizes null form data for the testing editor', () => {
    mockFormData = {data: {name: null}}
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))

    expect(result.current.genericCodeEditorProps.initialTestData).toStrictEqual({name: ''})
  })

  it('delegates compile requests to the localization engine', () => {
    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))
    const compileResult = result.current.genericCodeEditorProps.onCompile('Hello {$name}', {data: {name: 'Ada'}} as any)

    expect(mockBuilderStore.viewer.form.localization.engine.testLocalization).toHaveBeenCalledWith(
      'Hello {$name}',
      'locText.placeholder',
      enUS,
      {data: {name: 'Ada'}},
    )
    expect(compileResult.error).toBeFalsy()
    expect((compileResult as CalculableResult).result).toBe('Hello')
  })

  it('calls testLocalization with the localization engine as receiver', () => {
    const engine = mockBuilderStore.viewer.form.localization.engine
    engine.testLocalization = vi.fn(function (this: typeof engine, localization: string) {
      expect(this).toBe(engine)
      return localization
    })

    const {result} = renderHook(() => useLocalizationEditor({editableProperty: createEditableProperty()}))
    const compileResult = result.current.genericCodeEditorProps.onCompile('Hello', {data: {}} as any)

    expect(engine.testLocalization).toHaveBeenCalledOnce()
    expect((compileResult as CalculableResult).result).toBe('Hello')
  })
})
