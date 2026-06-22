import {BuilderView, define, type RuleValidator, string} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {asyncAct} from '../../common/lib/asyncAct'
import {getPropertyInput} from '../util/controls'
import {renderBuilder} from '../util/renderBuilder'

const TestComponent = define(() => <div data-testid="test-component"/>, 'TestComponent')
  .props({
    myText: string.valued.uncontrolledValue('').required,
  })
  .build()

const slowValidator: RuleValidator = async (value: string) => {
  await new Promise<void>((resolve) => setTimeout(resolve, 300))
  return value !== 'bad'
}

const DelayValidated = define(() => <div data-testid="delayed-validation"/>, 'DelayValidated')
  .props({
    flagged: string.valued.uncontrolledValue('').validated(slowValidator, {message: 'must not be bad'}),
  })
  .build()

const Input = (props: { value?: string }) => {
  return <input {...props} />
}

const myInput = define(Input, 'TestInput')
  .props({
    value: string.valued.uncontrolledValue(''),
  })
  .build()

const formRequiredText = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'req-c',
        type: 'TestComponent',
        htmlAttributes: [{name: 'data-testid', value: 'pe-req-comp'}],
      },
    ],
  },
}

const formDuplicateKey = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'alpha',
        type: 'TestInput',
        htmlAttributes: [{name: 'data-testid', value: 'pe-alpha'}],
      },
      {
        key: 'beta',
        type: 'TestInput',
        htmlAttributes: [{name: 'data-testid', value: 'pe-beta'}],
      },
    ],
  },
}

const formSlowAndPlain = {
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'slow-a',
        type: 'DelayValidated',
        htmlAttributes: [{name: 'data-testid', value: 'delayed-validation'}],
      },
      {
        key: 'plain-b',
        type: 'TestInput',
        htmlAttributes: [{name: 'data-testid', value: 'plain-test-input'}],
      },
    ],
  },
}

describe('Property editor Erroneous (designer)', () => {
  it('shows async schema validation for a required valued property when the value is empty', async () => {
    const view = new BuilderView([TestComponent])
    const {findByTestId, findByText} = await renderBuilder(formRequiredText, {view})

    const testComponent = await findByTestId('test-component')

    fireEvent.click(testComponent)
    fireEvent.click(await findByTestId('Main_Tab'))

    expect(await findByText('This property is required!')).toBeInTheDocument()
  })

  it('shows parent-driven error (showError) for a duplicate component key and clears it when the key is unique', async () => {
    const view = new BuilderView([myInput])
    const {findByTestId, queryByText} = await renderBuilder(formDuplicateKey, {view})

    fireEvent.click(await findByTestId('pe-beta'))
    fireEvent.click(await findByTestId('Main_Tab'))

    const keyInput = await getPropertyInput(findByTestId, 'pe-beta', 'key')
    fireEvent.change(keyInput, {target: {value: 'alpha'}})

    await waitFor(() => {
      expect(queryByText('Key must be unique')).toBeInTheDocument()
    })

    fireEvent.change(keyInput, {target: {value: 'gamma'}})

    await waitFor(() => {
      expect(queryByText('Key must be unique')).not.toBeInTheDocument()
    })
  })

  it('completes when switching away while async property validation is pending', async () => {
    const view = new BuilderView([DelayValidated, myInput])
    const {findByTestId} = await renderBuilder(formSlowAndPlain, {view})

    fireEvent.click(await findByTestId('delayed-validation'))
    fireEvent.click(await findByTestId('Main_Tab'))

    const flaggedWrapper = await findByTestId('flagged-labeled-wrapper')
    const flaggedInput = flaggedWrapper.querySelector('textarea')
    expect(flaggedInput).not.toBeNull()
    fireEvent.change(flaggedInput!, {target: {value: 'bad'}})

    fireEvent.click(await findByTestId('plain-test-input'))

    await asyncAct(async () => {
      await new Promise<void>((resolve) => setTimeout(resolve, 500))
    })

    expect(await findByTestId('plain-test-input')).toBeInTheDocument()
  })
})
