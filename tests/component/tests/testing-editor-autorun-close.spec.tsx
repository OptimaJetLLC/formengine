import {CalculableResult} from '@react-form-builder/core'
import {fireEvent, render, screen, waitFor} from '@testing-library/react'
import {beforeEach, describe, expect, it, vi} from 'vitest'
import {TestRunner} from '../../../packages/designer/src/features/ui/BottomPanel/TestingEditor'

let mockBuilderStore: {
  testingAutorun: boolean
  setTestingAutorun: (value: boolean) => void
}

vi.mock('react-i18next', () => ({
  useTranslation: () => {
    const t = (key: string) => key
    return [t, {exists: () => true}]
  },
}))

vi.mock('../../../packages/designer/src/utils/BuilderStoreContext', () => ({
  useBuilderStore: () => mockBuilderStore,
}))

describe('TestRunner autorun close', () => {
  beforeEach(() => {
    mockBuilderStore = {
      testingAutorun: true,
      setTestingAutorun: (value: boolean) => {
        mockBuilderStore.testingAutorun = value
      },
    }
  })

  it('hides the autorun result when the message is closed until inputs change', async () => {
    const testingFunction = () => CalculableResult.success('ok')
    const initialData = '{"data":{},"errors":{}}'
    const {rerender} = render(<TestRunner data={initialData} testingFunction={testingFunction} />)

    expect(await screen.findByTestId('test-result')).toBeInTheDocument()

    fireEvent.click(document.querySelector('.rs-btn-close')!)

    await waitFor(() => expect(screen.queryByTestId('test-result')).not.toBeInTheDocument())

    // Same inputs must keep the result hidden after a parent re-render (not only Message local close).
    rerender(<TestRunner data={initialData} testingFunction={testingFunction} />)
    expect(screen.queryByTestId('test-result')).not.toBeInTheDocument()

    rerender(<TestRunner data='{"data":{"x":1},"errors":{}}' testingFunction={testingFunction} />)

    expect(await screen.findByTestId('test-result')).toBeInTheDocument()
  })
})
