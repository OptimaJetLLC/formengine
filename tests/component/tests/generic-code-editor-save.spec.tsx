import {CalculableResult} from '@react-form-builder/core'
import {fireEvent, render, screen} from '@testing-library/react'
import {forwardRef, useEffect, useImperativeHandle} from 'react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {GenericCodeEditor} from '../../../packages/designer/src/features/calculation/GenericCodeEditor'
import {resolveValidateBeforeSave} from '../../../packages/designer/src/features/localization/localizationEditorUtils'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}))

vi.mock('@react-form-builder/core', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@react-form-builder/core')>()
  return {
    ...actual,
    useStore: () => ({formData: {data: {name: 'Ada'}}}),
  }
})

const testSpy = vi.fn()

vi.mock('../../../packages/designer/src/features/ui/BottomPanel/TestingEditor', () => {
  const MockTestingEditor = forwardRef(({testingFunction}: { testingFunction: (data: unknown) => CalculableResult }, ref) => {
    useImperativeHandle(ref, () => ({
      test: () => {
        testSpy()
        return testingFunction({data: {name: 'Ada'}})
      },
    }), [testingFunction])

    return null
  })

  const MockTestRunner = forwardRef(({testingFunction}: { testingFunction: (data: unknown) => CalculableResult }, ref) => {
    useImperativeHandle(ref, () => ({
      test: () => {
        return testingFunction({data: {name: 'Ada'}})
      },
    }), [testingFunction])

    return null
  })

  return {
    TestingEditor: MockTestingEditor,
    TestRunner: MockTestRunner,
  }
})

vi.mock('../../../packages/designer/src/features/components/CodeEditor/CodeEditor', () => ({
  CodeEditor: ({onChange, initialValue}: { onChange: (value: string) => void, initialValue: string }) => {
    useEffect(() => {
      onChange(initialValue)
    }, [initialValue, onChange])

    return <textarea data-testid="mock-code-editor" defaultValue={initialValue}/>
  },
}))

describe('GenericCodeEditor save behavior', () => {
  beforeEach(() => {
    testSpy.mockReset()
    testSpy.mockReturnValue(CalculableResult.success('Hello'))
  })

  it('persists the current source when validation succeeds', () => {
    const onSave = vi.fn()
    render(<GenericCodeEditor source="Hello"
                              onSave={onSave}
                              onClose={vi.fn()}
                              onCompile={() => CalculableResult.success('Hello')}
                              compact={false}/>)

    fireEvent.click(screen.getByTestId('save-code-action-button'))

    expect(testSpy).toHaveBeenCalledOnce()
    expect(onSave).toHaveBeenCalledWith('Hello')
  })

  it('does not persist when validation fails', () => {
    testSpy.mockReturnValue(CalculableResult.error([new Error('invalid syntax')]))
    const onSave = vi.fn()
    render(<GenericCodeEditor source="broken {"
                              onSave={onSave}
                              onClose={vi.fn()}
                              onCompile={() => CalculableResult.error([new Error('invalid syntax')])}
                              compact={false}/>)

    fireEvent.click(screen.getByTestId('save-code-action-button'))

    expect(testSpy).toHaveBeenCalledOnce()
    expect(onSave).not.toHaveBeenCalled()
  })

  it('skips validation when validateBeforeSave returns skip-test', () => {
    const onSave = vi.fn()
    render(<GenericCodeEditor source="   "
                              validateBeforeSave={resolveValidateBeforeSave}
                              onSave={onSave}
                              onClose={vi.fn()}
                              onCompile={() => CalculableResult.error([new Error('invalid syntax')])}
                              compact={false}/>)

    fireEvent.click(screen.getByTestId('save-code-action-button'))

    expect(testSpy).not.toHaveBeenCalled()
    expect(onSave).toHaveBeenCalledWith('   ')
  })

  it('uses getSourceForSave when resolving the value to persist', () => {
    const onSave = vi.fn()
    render(<GenericCodeEditor source="ignored"
                              getSourceForSave={() => 'Persisted'}
                              validateBeforeSave={resolveValidateBeforeSave}
                              onSave={onSave}
                              onClose={vi.fn()}
                              onCompile={() => CalculableResult.success('Persisted')}
                              compact/>)

    fireEvent.click(screen.getByTestId('save-code-action-button'))

    expect(testSpy).not.toHaveBeenCalled()
    expect(onSave).toHaveBeenCalledWith('Persisted')
  })

  it('renders toolbarExtra content', () => {
    render(<GenericCodeEditor source="Hello"
                              onSave={vi.fn()}
                              onClose={vi.fn()}
                              onCompile={() => CalculableResult.success('Hello')}
                              toolbarExtra={<button data-testid="extra-toolbar-action">Extra</button>}/>)

    expect(screen.getByTestId('extra-toolbar-action')).toBeTruthy()
  })
})
