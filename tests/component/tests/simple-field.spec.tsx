import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BiDi, ComponentStore, createView, FormViewer, Language, PersistedForm, View} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {expect} from 'vitest'
import {testLicense} from './testLicense'

function randomString(prefix?: string) {
  return `${prefix ?? ''}${new Date().toISOString()}`
}

const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)
const componentsView = createView(componentsMetadata)

interface SimpleFieldAppProps {
  formJson: object
  view?: View
  initialData?: Record<string, unknown>
}

const SimpleFieldApp = ({formJson, view, initialData}: SimpleFieldAppProps) => {
  return <FormViewer
    initialData={initialData}
    licenseKey={testLicense}
    view={view ?? componentsView}
    getForm={() => JSON.stringify(formJson)}
  />
}

const dataTestId = 'test-input'
const testComponentType = 'RsInput'
const defaultLanguageCode = 'en-US'

function createTestForm(modify?: (input: ComponentStore) => void,
                        modifyForm?: (form: PersistedForm) => void) {
  const componentStore = new ComponentStore('name', testComponentType)
  componentStore.htmlAttributes = [{
    'name': 'data-testid',
    'value': dataTestId
  }]
  modify?.(componentStore)

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [componentStore]
  const language = new Language('en', 'US', 'English', 'American English', BiDi.LTR)

  const form = {
    form: screen,
    localization: {},
    languages: [language],
    defaultLanguage: defaultLanguageCode
  } satisfies PersistedForm

  modifyForm?.(form)

  return form
}

function getModelWithDefaultValue(defaultValue: string) {
  const metadata = rSuiteComponents.map(definer => definer.build().model)
  const model = metadata.find(model => model.typeName === testComponentType)
  if (!model) {
    throw new Error(`Model for ${testComponentType} not found`)
  }
  const defaultProps = model.defaultProps ?? {}
  Object.assign(model, {
    ...model,
    defaultProps: {...defaultProps, value: defaultValue}
  })
  return model
}

describe(`SimpleField test`, function () {
  it('Input should have an empty value', async () => {
    const form = createTestForm()
    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue('')
  })

  it('Input should have an default value', async () => {
    const defaultValue = randomString('defaultValue')
    const form = createTestForm((input) => {
      input.props.value = {value: defaultValue}
    })

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('Input should have a model default value', async () => {
    const defaultValue = randomString('defaultValue')
    const model = getModelWithDefaultValue(defaultValue)
    const view = createView([model])
    const form = createTestForm()

    const {findByTestId} = render(<SimpleFieldApp formJson={form} view={view}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('Input value should override the default model value', async () => {
    const model = getModelWithDefaultValue('a default model value')
    const view = createView([model])
    const defaultValue = randomString('defaultValue')
    const form = createTestForm((input) => {
      input.props.value = {value: defaultValue}
    })

    const {findByTestId} = render(<SimpleFieldApp formJson={form} view={view}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('Input should have an initial data value', async () => {
    const defaultValue = randomString('defaultValue')
    const initialData = {name: defaultValue}
    const form = createTestForm()

    const {findByTestId} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('The initial data should override the value of the model', async () => {
    const model = getModelWithDefaultValue('a default model value')
    const view = createView([model])
    const defaultValue = randomString('defaultValue')
    const initialData = {name: defaultValue}
    const form = createTestForm()

    const {findByTestId} = render(<SimpleFieldApp formJson={form} view={view} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('The initial data should override the value of component', async () => {
    const defaultValue = randomString('defaultValue')
    const initialData = {name: defaultValue}
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue'}
    })

    const {findByTestId} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('The initial data should override the value of the model and the value of the component', async () => {
    const model = getModelWithDefaultValue('a default model value')
    const view = createView([model])
    const defaultValue = randomString('defaultValue')
    const initialData = {name: defaultValue}
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue'}
    })

    const {findByTestId} = render(<SimpleFieldApp formJson={form} view={view} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('Input should have a function value', async () => {
    const fnValue = randomString('fnValue')
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue', computeType: 'function', fnSource: `return '${fnValue}'`}
    })

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(fnValue)
  })

  it('Input should have a localization value', async () => {
    const localeValue = randomString('localeValue')
    const form = createTestForm((input) => {
        input.props.value = {value: 'defaultValue', computeType: 'localization'}
      }, (form) => {
        form.localization[defaultLanguageCode] = {
          name: {component: {value: localeValue}}
        }
      }
    )

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(localeValue)
  })

  it('Input should have a [NOT LOCALIZED] value', async () => {
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue', computeType: 'localization'}
    })

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue('[NOT LOCALIZED]')
  })

  it('Input should have a [NOT LOCALIZED] value (no default localization)', async () => {
    const form = createTestForm((input) => {
        input.props.value = {value: 'defaultValue', computeType: 'localization'}
      }, (form) => {
        form.localization['de-DE'] = {
          name: {component: {value: randomString('de-DE')}}
        }
      }
    )

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue('[NOT LOCALIZED]')
  })

  it('Input should have a [NOT LOCALIZED] value (de-DE default lang)', async () => {
    const form = createTestForm((input) => {
        input.props.value = {value: 'defaultValue', computeType: 'localization'}
      }, (form) => {
        form.localization['de-DE'] = {
          name: {component: {value: randomString('de-DE')}}
        }
        form.defaultLanguage = 'de-DE'
      }
    )

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue('[NOT LOCALIZED]')
  })

  it('Input should have a localized value (de-DE default lang)', async () => {
    const localeValue = randomString('de')
    const form = createTestForm((input) => {
        input.props.value = {value: 'defaultValue', computeType: 'localization'}
      }, (form) => {
        form.localization['de-DE'] = {
          name: {component: {value: localeValue}}
        }
        form.languages.push(new Language('de', 'DE', 'German', 'German', BiDi.LTR))
        form.defaultLanguage = 'de-DE'
      }
    )

    const {findByTestId} = render(<SimpleFieldApp formJson={form}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(localeValue)
  })

  it('Input must have a function value from initialData', async () => {
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue', computeType: 'function', fnSource: 'return `last name: ${form.data.surname}`'}
    }, ({form}) => {
      form.children?.push(new ComponentStore('surname', testComponentType))
    })

    const initialData = {name: 'name value', surname: randomString('surname')}
    const {findByTestId} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(`last name: ${initialData.surname}`)
  })

  it('Input must have a function value from an updated initialData', async () => {
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue', computeType: 'function', fnSource: 'return `last name: ${form.data.surname}`'}
    }, ({form}) => {
      form.children?.push(new ComponentStore('surname', testComponentType))
    })

    const initialData = {name: 'name value', surname: randomString('surname')}
    const {findByTestId, findByDisplayValue, rerender} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(`last name: ${initialData.surname}`)

    const newData = {name: 'new name', surname: randomString('updated surname')}
    rerender(<SimpleFieldApp formJson={form} initialData={newData}/>)
    expect(await findByDisplayValue(newData.surname)).toHaveValue(newData.surname)
  })

  it('Input must have a updated initialData', async () => {
    const form = createTestForm()

    const initialData = {name: randomString('first render')}
    const {findByTestId, findByDisplayValue, rerender} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(initialData.name)

    const newData = {name: randomString('second render')}
    rerender(<SimpleFieldApp formJson={form} initialData={newData}/>)
    expect(await findByDisplayValue(newData.name)).toHaveValue(newData.name)
  })

  it('Input must have a default value after reset', async () => {
    const defaultValue = randomString('default-')
    const form = createTestForm((input) => {
      input.props.value = {value: defaultValue}
    }, ({form}) => {
      const resetButton = new ComponentStore('reset', 'RsButton')
      resetButton.props.children = {value: 'Reset'}
      resetButton.events = {'onClick': [{'name': 'reset', 'type': 'common'}]}
      form.children?.push(resetButton)
    })

    const initialData = {name: `first render`}
    const {findByTestId, findByText} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(initialData.name)

    const resetButton = await findByText('Reset')
    fireEvent.click(resetButton)

    expect(await findByTestId(dataTestId)).toHaveValue(defaultValue)
  })

  it('Input must have a default value after clear', async () => {
    const defaultValue = randomString('default-')
    const form = createTestForm((input) => {
      input.props.value = {value: defaultValue}
    }, ({form}) => {
      const clearButton = new ComponentStore('clear', 'RsButton')
      clearButton.props.children = {value: 'Clear'}
      clearButton.events = {'onClick': [{'name': 'clear', 'type': 'common'}]}
      form.children?.push(clearButton)
    })

    const defaultModelValue = randomString('model-default-')
    const model = getModelWithDefaultValue(defaultModelValue)
    const view = createView([...componentsMetadata.filter(model => model.typeName !== testComponentType), model])
    const initialData = {name: `first render`}

    const {findByTestId, findByText} = render(<SimpleFieldApp formJson={form} initialData={initialData} view={view}/>)
    expect(await findByTestId(dataTestId)).toHaveValue(initialData.name)

    const clearButton = await findByText('Clear')
    fireEvent.click(clearButton)

    expect(await findByTestId(dataTestId)).toHaveValue(defaultModelValue)
  })

  it('The value entered should override the default value', async () => {
    const form = createTestForm()

    const {findByTestId, findByDisplayValue} = render(<SimpleFieldApp formJson={form}/>)
    const nameInput = await findByTestId(dataTestId)
    expect(nameInput).toHaveValue('')

    const newValue = randomString('new value')
    fireEvent.change(nameInput, {target: {value: newValue}})
    expect(await findByDisplayValue(newValue)).toBeInTheDocument()
  })

  it('The value entered should not override the computed value', async () => {
    const form = createTestForm((input) => {
      input.props.value = {value: 'defaultValue', computeType: 'function', fnSource: 'return `ginger-${form.data.middleName}`'}
    }, ({form}) => {
      form.children?.push(new ComponentStore('middleName', testComponentType))
    })

    const initialData = {name: 'name value', middleName: randomString('middle name value')}
    const {findByTestId, findByDisplayValue} = render(<SimpleFieldApp formJson={form} initialData={initialData}/>)
    const nameInput = await findByTestId(dataTestId)
    expect(nameInput).toHaveValue(`ginger-${initialData.middleName}`)

    fireEvent.change(nameInput, {target: {value: randomString('new value')}})
    expect(await findByDisplayValue(`ginger-${initialData.middleName}`)).toBeInTheDocument()
  })
})
