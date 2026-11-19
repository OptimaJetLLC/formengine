import {models, rSuiteComponents, view} from '@react-form-builder/components-rsuite'
import {BuilderView, createView, define, ErrorWrapperProps, FormViewer, FormViewerProps, PersistedForm} from '@react-form-builder/core'
import {FormBuilder, FormBuilderProps} from '@react-form-builder/designer'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import childForm from './forms/component-data-methods-child-form.json'
import parentForm from './forms/component-data-methods-form.json'

const getForm = (name?: string) => {
  if (name === 'component-data-methods-child-form') return JSON.stringify(childForm)
  return JSON.stringify(parentForm)
}

const CustomErrorMessage = ({error, children}: ErrorWrapperProps) => {
  const item = error ? <span data-testid="error-message">{error}</span> : null
  return (
    <div>
      {children}
      {item}
    </div>
  )
}

const customErrorMessage = define(CustomErrorMessage, 'CustomErrorMessage').category('test')

describe('ComponentTree tests', () => {
  it('Elements in component tree should not use component actions', async () => {
    const persistedForm: PersistedForm = {
      form: {
        key: 'Screen',
        type: 'Screen',
        props: {},
        children: [
          {
            key: 'rsDropdown1',
            type: 'RsDropdown',
            props: {},
            events: {
              onDidMount: [
                {
                  name: 'logOnDidMount',
                  type: 'custom',
                },
              ],
            },
            htmlAttributes: [
              {
                name: 'data-testid',
                value: 'test-dropdown',
              },
            ],
          },
        ],
      },
      localization: {},
      languages: [],
      defaultLanguage: '',
    }

    let onMountCount = 0

    const actions = {
      logOnDidMount: () => {
        onMountCount++
      },
    }

    const components = rSuiteComponents.map(d => d.build())
    const view = new BuilderView(components)
    const getForm = () => JSON.stringify(persistedForm)
    const customization: FormBuilderProps['customization'] = {
      Components_Tab_Content: {
        customRenderer: defaultElement => <div data-testid="test-components">{defaultElement}</div>,
      },
      Tree_Tab_Content: {
        customRenderer: defaultElement => <div data-testid="test-tree">{defaultElement}</div>,
      },
    }

    const {findByTestId, findByText} = render(<FormBuilder view={view} getForm={getForm} actions={actions} customization={customization} />)

    expect(await findByTestId('test-dropdown')).toBeInTheDocument()
    expect(onMountCount).toEqual(1)

    // switch to the Tree tab
    fireEvent.click(await findByText('Tree'))
    await waitFor(async () => expect(await findByTestId('test-tree')).toBeInTheDocument())
    expect(onMountCount).toEqual(1)

    // switch to the Components tab
    fireEvent.click(await findByText('Components'))
    await waitFor(async () => expect(await findByTestId('test-components')).toBeInTheDocument())
    expect(onMountCount).toEqual(1)
  })

  it('Should clear the form', async () => {
    const actions: FormViewerProps['actions'] = {
      buttonClickAction: e => {
        const root = e.sender.root
        root.clear()
      },
    }

    let formData = ''

    const initialValue = 'no name'
    const initialData = {name: initialValue, one: 'Magic'}
    const {findByTestId} = render(
      <FormViewer
        view={view}
        getForm={getForm}
        actions={actions}
        initialData={initialData}
        onFormDataChange={iFormData => {
          formData = JSON.stringify(iFormData.data)
        }}
      />
    )

    expect(await findByTestId('input1')).toHaveValue(initialValue)
    expect(await findByTestId('input2')).toHaveValue(initialValue)
    expect(await findByTestId('input3')).toHaveValue('Karl')
    const expectedData = {
      name: 'no name',
      rsInput3: 'Karl',
      repeaterOne: [
        {name: 'number one', rsInput6: 'Karl'},
        {name: 'number two', rsInput6: 'Karl'},
      ],
      one: 'Magic',
      three: 'three',
    }
    expect(formData).toEqual(JSON.stringify(expectedData))

    fireEvent.click(await findByTestId('actionButton'))

    expect(await findByTestId('input1')).toHaveValue('')
    expect(await findByTestId('input2')).toHaveValue('')
    expect(await findByTestId('input3')).toHaveValue('')

    expect(formData).toEqual(JSON.stringify({repeaterOne: []}))
  })

  it('Should reset the form', async () => {
    const actions: FormViewerProps['actions'] = {
      buttonClickAction: e => {
        const root = e.sender.root
        root.reset()
      },
    }

    let formData = ''

    const initialData = {
      name: 'Valley',
      rsInput3: 'Mann',
      repeaterOne: [
        {name: 'Stan', rsInput6: 'Gem'},
        {name: 'Kenny', rsInput6: 'Ten'},
      ],
      one: 'Vans',
      three: 'Goldie',
    }

    const {findByTestId} = render(
      <FormViewer
        view={view}
        getForm={getForm}
        actions={actions}
        initialData={initialData}
        onFormDataChange={iFormData => {
          formData = JSON.stringify(iFormData.data)
        }}
      />
    )

    expect(await findByTestId('two')).toHaveValue('Vans')
    expect(formData).toEqual(JSON.stringify(initialData))

    fireEvent.click(await findByTestId('actionButton'))

    expect(await findByTestId('two')).toHaveValue('')
    const expectedData = {
      rsInput3: 'Karl',
      repeaterOne: [
        {name: 'number one', rsInput6: 'Karl'},
        {name: 'number two', rsInput6: 'Karl'},
      ],
      three: 'three',
    }
    expect(formData).toEqual(JSON.stringify(expectedData))
  })

  it('Errors should be set on the form', async () => {
    const actions: FormViewerProps['actions'] = {
      buttonClickAction: async e => {
        const root = e.sender.root
        await root.validate()
      },
    }

    const errors = {
      name: 'name error',
      rsInput3: 'rsInput3 error',
      repeaterOne: [
        {name: 'first name error', rsInput6: 'first input error'},
        {name: 'second name error', rsInput6: 'second input error'},
      ],
      one: 'one error',
      three: 'three error',
    }

    const formValidators: FormViewerProps['formValidators'] = [() => Promise.resolve(errors as unknown as Record<string, string>)]

    let formErrors = ''

    const components = [...models, customErrorMessage.build().model]
    const customView = createView(components)

    const {findByTestId, findAllByTestId} = render(
      <FormViewer
        view={customView}
        getForm={getForm}
        actions={actions}
        formValidators={formValidators}
        onFormDataChange={iFormData => {
          formErrors = JSON.stringify(iFormData.errors)
        }}
      />
    )

    expect(await findByTestId('two')).toHaveValue('')

    fireEvent.click(await findByTestId('actionButton'))

    await waitFor(async () => expect(await findAllByTestId('error-message')).toHaveLength(12))
    const errorMessages = (await findAllByTestId('error-message')).map(element => element.innerHTML)
    expect(errorMessages).toEqual([
      'name error',
      'name error',
      'rsInput3 error',
      // first repeater element
      'first name error',
      'first name error',
      'first input error',
      // second repeater element
      'second name error',
      'second name error',
      'second input error',
      // template
      'one error',
      'one error',
      'three error',
    ])

    expect(formErrors).toEqual(JSON.stringify(errors))
  })
})
