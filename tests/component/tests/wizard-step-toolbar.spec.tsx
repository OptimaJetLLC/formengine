import {rsWizardStep} from '@react-form-builder/components-rsuite'
import {cfDisableToolbarAdd} from '@react-form-builder/core'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {createRef} from 'react'
import {describe, expect, it, vi} from 'vitest'
import {openToolbarActions} from '../util/openToolbarActions'
import {renderBuilder} from '../util/renderBuilder'

const form = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'wizard',
        type: 'RsWizard',
        children: [
          {
            key: 'rsWizardStep1',
            type: 'RsWizardStep',
            props: {label: {value: 'Step 1'}},
          },
        ],
      },
    ],
  },
}

const consoleErrorMessages = (spy: {mock: {calls: unknown[][]}}) =>
  spy.mock.calls.map((args: unknown[]) => args.map(String).join(' ')).join('\n')

describe('RsWizardStep', () => {
  it('forwards a ref to the step root element through the model observer wrapper', () => {
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const ref = createRef<HTMLDivElement>()
    const Step = rsWizardStep.build().model.component

    render(<Step ref={ref} />)

    expect(ref.current).toBeInstanceOf(HTMLDivElement)
    expect(consoleErrorMessages(consoleErrorSpy)).not.toMatch(/cannot be given refs/i)
    consoleErrorSpy.mockRestore()
  })

  it('opts out of toolbar add for wizard steps', () => {
    expect(rsWizardStep.build().model.isFeatureEnabled(cfDisableToolbarAdd)).toBe(true)
  })

  it('removes a wizard step without offering add placement', async () => {
    const {findByRole, findByTestId, queryByRole, queryByTestId} = await renderBuilder(form)

    fireEvent.click(await findByTestId('rsWizardStep1-editable-wrapper'))
    await openToolbarActions()

    expect(queryByRole('button', {name: 'Add'})).toBeNull()

    fireEvent.click(await findByRole('button', {name: 'Remove component'}))

    await waitFor(() => expect(queryByTestId('rsWizardStep1-editable-wrapper')).not.toBeInTheDocument())
  })
})
