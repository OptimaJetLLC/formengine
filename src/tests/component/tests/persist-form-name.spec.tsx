import {BuilderView} from '@react-form-builder/core'
import {FormBuilder} from '@react-form-builder/designer'
import {allComponentsBuilder} from '@react-form-builder/tests-common/lib/all-components'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {expect} from 'vitest'
import {MockFormStorage} from '../util/mockFormStorage'

const defaultFormName = 'default-form'
const secondFormName = 'second-form'

const formNames = [defaultFormName, secondFormName]

const view = new BuilderView(allComponentsBuilder)

describe('The persistFormName prop in FormBuilder', function () {
  beforeAll(() => globalThis.FORM_BUILDER_DESIGNER_DISABLE_LOCAL_STORAGE = 'false')

  it('when enabled, should save the form name between sessions', async () => {
    const onLoadForm = vi.fn()
    const formStorage = new MockFormStorage({onLoadForm, formNames})
    const builderComponent = (
      <FormBuilder formName={defaultFormName} view={view} formStorage={formStorage}
                   getForm={formStorage.getForm}/>
    )

    const {findByTestId, unmount} = render(builderComponent)
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(defaultFormName))

    fireEvent.click(await findByTestId('Forms_Tab'))
    fireEvent.click(await findByTestId(`form-list-open-item-${secondFormName}`))
    await waitFor(async () => expect(await findByTestId(secondFormName)).toBeInTheDocument())

    unmount()
    onLoadForm.mockClear()

    render(builderComponent)
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(secondFormName))
    await waitFor(async () => expect(await findByTestId(secondFormName)).toBeInTheDocument())
  })

  it('when disabled, should not save the form name between sessions', async () => {
    const onLoadForm = vi.fn()
    const formStorage = new MockFormStorage({onLoadForm, formNames})
    const builderComponent = (
      <FormBuilder formName={defaultFormName} view={view} formStorage={formStorage}
                   getForm={formStorage.getForm} persistFormName={false}/>
    )

    const {findByTestId, unmount} = render(builderComponent)
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(defaultFormName))

    fireEvent.click(await findByTestId('Forms_Tab'))
    fireEvent.click(await findByTestId(`form-list-open-item-${secondFormName}`))
    await waitFor(async () => expect(await findByTestId(secondFormName)).toBeInTheDocument())

    unmount()
    onLoadForm.mockClear()

    render(builderComponent)
    await waitFor(() => expect(onLoadForm).toHaveBeenLastCalledWith(defaultFormName))
    await waitFor(async () => expect(await findByTestId(defaultFormName)).toBeInTheDocument())
  })
})
