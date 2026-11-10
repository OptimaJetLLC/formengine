import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import type {ComponentData} from '@react-form-builder/core'
import {BuilderView, define, oneOf} from '@react-form-builder/core'
import {act, fireEvent} from '@testing-library/react'
import {renderBuilder} from '../util/renderBuilder'
import {renderForm} from '../util/renderForm'

type OptionType = 'RsTab' | 'RsRadioGroup'

const createForm = (type: OptionType, values: string[]) => ({
  form: {
    key: 'Screen',
    type: 'Screen',
    children: [
      {
        key: 'options',
        type,
        props: {
          items: {value: values.map((value, index) => ({value, label: index === 0 ? 'First' : 'Second'}))},
          ...(type === 'RsTab' ? {showNavigation: {value: true}} : {}),
        },
      },
    ],
  },
})

const types: OptionType[] = ['RsTab', 'RsRadioGroup']

describe('Option list keys', () => {
  it.each(types)('%s renders repeated values without duplicate-key errors', async type => {
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const {findByRole} = renderForm(createForm(type, ['shared', 'shared']))
      const role = type === 'RsTab' ? 'tab' : 'radio'

      expect(await findByRole(role, {name: 'First'})).toBeInTheDocument()
      expect(await findByRole(role, {name: 'Second'})).toBeInTheDocument()
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      consoleError.mockRestore()
    }
  })

  it.each(types)('%s keeps the focused control mounted when its value changes', async type => {
    const {findByRole, getByRole, formData} = renderForm(createForm(type, ['first', 'second']))
    const role = type === 'RsTab' ? 'tab' : 'radio'
    const first = await findByRole(role, {name: 'First'})
    const data = (formData as ComponentData).findByKey('options')!

    act(() => first.focus())
    expect(first).toHaveFocus()

    act(() => {
      data.setUserDefinedProp('items', [
        {value: 'edited', label: 'First'},
        {value: 'second', label: 'Second'},
      ])
    })

    expect(getByRole(role, {name: 'First'})).toBe(first)
    expect(first).toHaveFocus()
  })

  it('renders repeated radio annotation values in the designer without duplicate-key errors', async () => {
    const Choice = ({choice}: {choice?: string}) => <span>{choice}</span>
    const choice = define(Choice, 'Choice').props({
      choice: oneOf('shared', 'shared').labeled('First', 'Second').setup({editor: 'radio'}),
    })
    const view = new BuilderView([...rSuiteComponents, choice].map(definer => definer.build()))
    const form = {
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [{key: 'choice', type: 'Choice'}],
      },
    }
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {})
    try {
      const {findByTestId, findByText} = await renderBuilder(form, {view})
      fireEvent.click(await findByTestId('choice-editable-wrapper'))

      expect(await findByText('First', {exact: true})).toBeVisible()
      expect(await findByText('Second', {exact: true})).toBeVisible()
      expect(consoleError).not.toHaveBeenCalled()
    } finally {
      consoleError.mockRestore()
    }
  })
})
