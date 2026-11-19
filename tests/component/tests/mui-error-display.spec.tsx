import {MuiLocalizationProvider, MuiViewerWrapper, models, components as muiComponents} from '@react-form-builder/components-material-ui'
import {BuilderView, type ComponentData, createView} from '@react-form-builder/core'
import {fireEvent, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderBuilder} from '../util/renderBuilder'
import {renderViewerForm} from '../util/renderViewerForm'
import {switchToViewerMode} from './designerUtils'

const view = createView(models).withViewerWrapper(MuiViewerWrapper).withViewerWrapper(MuiLocalizationProvider)
const builderView = new BuilderView(muiComponents).withViewerWrapper(MuiViewerWrapper).withViewerWrapper(MuiLocalizationProvider)

interface ValidationCase {
  componentType: string
  validationKey: 'required' | 'truthy'
}

const validationCases: ValidationCase[] = [
  {componentType: 'MuiDatePicker', validationKey: 'required'},
  {componentType: 'MuiTextField', validationKey: 'required'},
  {componentType: 'MuiSelect', validationKey: 'required'},
  {componentType: 'MuiRadioGroup', validationKey: 'required'},
  {componentType: 'MuiCheckbox', validationKey: 'truthy'},
  {componentType: 'MuiSwitch', validationKey: 'truthy'},
  {componentType: 'MuiFormControlLabel', validationKey: 'truthy'},
]

const findField = (formData: ComponentData) => formData.allComponentFields?.find(item => item.dataKey === 'field')?.field

interface FallbackCase {
  componentType: 'MuiCheckbox' | 'MuiSwitch' | 'MuiFormControlLabel'
  role: 'checkbox' | 'switch'
  name: string
}

const fallbackCases: FallbackCase[] = [
  {componentType: 'MuiCheckbox', role: 'checkbox', name: 'Checkbox label'},
  {componentType: 'MuiSwitch', role: 'switch', name: 'Label'},
  {componentType: 'MuiFormControlLabel', role: 'checkbox', name: 'Label'},
]

const createForm = ({componentType, validationKey}: ValidationCase) => {
  const message = `${componentType} validation error`
  return {
    message,
    form: {
      errorType: 'MuiErrorWrapper',
      form: {
        key: 'Screen',
        type: 'Screen',
        props: {},
        children: [
          {
            key: 'field',
            type: componentType,
            props: {},
            schema: {
              validations: [{key: validationKey, args: {message}}],
            },
          },
        ],
      },
    },
  }
}

describe('Material UI validation error display', () => {
  it('shows a date picker error after the first validation in the designer preview', async () => {
    const {form, message} = createForm({componentType: 'MuiDatePicker', validationKey: 'required'})
    const {findByRole, findByTestId, findByText} = await renderBuilder(form, {view: builderView})
    await switchToViewerMode(findByText)
    const dateInput = await findByRole('group', {name: 'Label'})

    fireEvent.click(await findByTestId('viewer-validate-button'))

    await waitFor(() => expect(dateInput).toHaveAttribute('aria-invalid', 'true'))
    expect(dateInput).toHaveAccessibleDescription(message)
  })

  it('shows a checkbox error after the first validation in the designer preview', async () => {
    const {form, message} = createForm({componentType: 'MuiCheckbox', validationKey: 'truthy'})
    const {findByRole, findByTestId, findByText} = await renderBuilder(form, {view: builderView})
    await switchToViewerMode(findByText)
    const checkbox = await findByRole('checkbox', {name: 'Checkbox label'})

    fireEvent.click(await findByTestId('viewer-validate-button'))

    await waitFor(() => expect(checkbox).toHaveAttribute('aria-invalid', 'true'))
    expect(checkbox).toHaveAccessibleDescription(message)
  })

  it.each(fallbackCases)('marks $componentType invalid after validating an empty form', async ({componentType, role, name}) => {
    const {form, message} = createForm({componentType, validationKey: 'truthy'})
    const {formData, getByRole} = renderViewerForm(view, form)

    await asyncAct(async () => await formData.validate())

    const control = getByRole(role, {name})
    expect(control).toHaveAttribute('aria-invalid', 'true')
    expect(control).toHaveAccessibleDescription(message)
  })

  it.each(validationCases)('shows an error for $componentType after validating an empty form', async validationCase => {
    const {form, message} = createForm(validationCase)
    const {formData, getByText} = renderViewerForm(view, form)

    const errors = await asyncAct(async () => await formData.validate())

    expect(errors).toStrictEqual({field: message})
    expect(getByText(message)).toBeInTheDocument()
  })

  it('clears the date picker error after a valid date is set', async () => {
    const {form, message} = createForm({componentType: 'MuiDatePicker', validationKey: 'required'})
    const {formData, queryByText} = renderViewerForm(view, form)

    await asyncAct(async () => await formData.validate())
    expect(queryByText(message)).toBeInTheDocument()

    const field = findField(formData as ComponentData)
    await asyncAct(async () => field?.setValue(new Date('2026-10-21T00:00:00.000Z')))

    const errors = await asyncAct(async () => await formData.validate())

    expect(errors).toStrictEqual({})
    expect(queryByText(message)).not.toBeInTheDocument()
  })

  it('clears the checkbox error after it is checked', async () => {
    const {form, message} = createForm({componentType: 'MuiCheckbox', validationKey: 'truthy'})
    const {formData, queryByText, getByRole} = renderViewerForm(view, form)

    await asyncAct(async () => await formData.validate())
    expect(queryByText(message)).toBeInTheDocument()
    expect(getByRole('checkbox', {name: 'Checkbox label'})).toHaveAttribute('aria-invalid', 'true')

    const field = findField(formData as ComponentData)
    await asyncAct(async () => field?.setValue(true))

    const errors = await asyncAct(async () => await formData.validate())

    expect(errors).toStrictEqual({})
    expect(queryByText(message)).not.toBeInTheDocument()
    expect(getByRole('checkbox', {name: 'Checkbox label'})).not.toHaveAttribute('aria-invalid')
  })
})
