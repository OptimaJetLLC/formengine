import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {BiDi, ComponentStore, createView, FormViewer, Language, PersistedForm, View} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'
import {eachComponentStore} from './eachComponentStore'

function randomString(prefix?: string) {
  return `${prefix ?? ''}${new Date().toISOString()}`
}

const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)
const componentsView = createView(componentsMetadata)

interface SimpleFieldAppProps {
  view?: View
  initialData?: Record<string, unknown>
  modifyForm?: (form: PersistedForm, name?: string) => void
}

const SimpleFieldApp = ({view, initialData, modifyForm}: SimpleFieldAppProps) => {
  const wrappedGetForm = useCallback(
    (name?: string) => {
      const form = getForm(name)
      modifyForm?.(form, name)
      return JSON.stringify(form)
    },
    [modifyForm]
  )

  return <FormViewer formName="root" initialData={initialData} view={view ?? componentsView} getForm={wrappedGetForm} />
}

const testComponentType = 'RsInput'
const slotComponentType = 'Slot'
const defaultLanguageCode = 'en-US'

function addTestDataId(componentStore: ComponentStore, value: string) {
  componentStore.htmlAttributes = [
    {
      name: 'data-testid',
      value: value,
    },
  ]
}

const sonInputTestId = 'sonInputTestId'
const fatherInputTestId = 'fatherInputTestId'
const fatherInSlotTestId = 'fatherInSlotTestId'
const grandfatherInputTestId = 'grandfatherInputTestId'
const grandfatherInSlotTestId = 'grandfatherInSlotTestId'
const rootInputTestId = 'rootInputTestId'

const allTestInputs: Record<string, string> = {
  sonInput: sonInputTestId,
  fatherInput: fatherInputTestId,
  fatherInSlot: fatherInSlotTestId,
  grandfatherInput: grandfatherInputTestId,
  grandfatherInSlot: grandfatherInSlotTestId,
  rootInput: rootInputTestId,
}

const allInputTestIds = Object.values(allTestInputs)
const allInputKeys = Object.keys(allTestInputs)

function screenToPersistedForm(screen: ComponentStore) {
  return {
    form: screen,
    localization: {},
    languages: [],
    defaultLanguage: defaultLanguageCode,
  } satisfies PersistedForm
}

function createSonForm() {
  const sonInput = new ComponentStore('sonInput', testComponentType)
  sonInput.props.label = {value: 'Son'}
  addTestDataId(sonInput, sonInputTestId)
  const sonSlot = new ComponentStore('sonSlot', slotComponentType)

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [sonInput, sonSlot]

  return screenToPersistedForm(screen)
}

function createFatherForm() {
  const fatherInput = new ComponentStore('fatherInput', testComponentType)
  fatherInput.props.label = {value: 'Father'}
  addTestDataId(fatherInput, fatherInputTestId)
  const fatherSlot = new ComponentStore('fatherSlot', slotComponentType)
  const templateSon = new ComponentStore('templateSon', 'Template:son')

  const fatherInSlot = new ComponentStore('fatherInSlot', testComponentType)
  fatherInSlot.props.label = {value: 'Father in slot'}
  fatherInSlot.slot = 'sonSlot'
  addTestDataId(fatherInSlot, fatherInSlotTestId)
  templateSon.children = [fatherInSlot]

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [fatherInput, fatherSlot, templateSon]

  return screenToPersistedForm(screen)
}

function createGrandfatherForm() {
  const grandfatherInput = new ComponentStore('grandfatherInput', testComponentType)
  grandfatherInput.props.label = {value: 'GrandFather'}
  addTestDataId(grandfatherInput, grandfatherInputTestId)
  const grandfatherSlot = new ComponentStore('grandfatherSlot', slotComponentType)
  const templateFather = new ComponentStore('templateFather', 'Template:father')
  templateFather.props.storeDataInParentForm = {value: false}

  const grandfatherInSlot = new ComponentStore('grandfatherInSlot', testComponentType)
  grandfatherInSlot.props.label = {value: 'GrandFather in slot'}
  grandfatherInSlot.slot = 'fatherSlot'
  addTestDataId(grandfatherInSlot, grandfatherInSlotTestId)
  templateFather.children = [grandfatherInSlot]

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [grandfatherInput, grandfatherSlot, templateFather]

  return screenToPersistedForm(screen)
}

function createRootForm() {
  const templateGrandfather = new ComponentStore('templateGrandfather', 'Template:grandfather')
  const rootInput = new ComponentStore('rootInput', testComponentType)
  rootInput.slot = 'grandfatherSlot'
  addTestDataId(rootInput, rootInputTestId)
  templateGrandfather.children = [rootInput]

  const screen = new ComponentStore('Screen', 'Screen')
  screen.children = [templateGrandfather]

  return screenToPersistedForm(screen)
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
    defaultProps: {...defaultProps, value: defaultValue},
  })
  return model
}

function getForm(name?: string) {
  if (!name) {
    throw new Error('Name is required')
  }
  let form: PersistedForm | undefined = undefined

  switch (name) {
    case 'root':
      form = createRootForm()
      break
    case 'son':
      form = createSonForm()
      break
    case 'father':
      form = createFatherForm()
      break
    case 'grandfather':
      form = createGrandfatherForm()
      break
  }

  if (!form) {
    throw new Error(`Form with name ${name} not found`)
  }

  return form
}

describe(`TemplateField test`, function () {
  it('All input fields should have an empty value', async () => {
    const {findByTestId} = render(<SimpleFieldApp />)

    for (const inputTestId of allInputTestIds) {
      expect(await findByTestId(inputTestId)).toHaveValue('')
    }
  })

  it('All input fields should have a default value', async () => {
    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          componentStore.props.value = {value: defaultValues[inputKey]}
        })
      }
    }

    const {findByTestId} = render(<SimpleFieldApp modifyForm={modifyForm} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('All input fields should have a model default value', async () => {
    const defaultValue = randomString('defaultValue')
    const model = getModelWithDefaultValue(defaultValue)
    const view = createView([model])

    const {findByTestId} = render(<SimpleFieldApp view={view} />)
    for (const inputTestId of allInputTestIds) {
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValue)
    }
  })

  it('All input fields should override the default model value', async () => {
    const model = getModelWithDefaultValue('a default model value')
    const view = createView([model])

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          componentStore.props.value = {value: defaultValues[inputKey]}
        })
      }
    }

    const {findByTestId} = render(<SimpleFieldApp view={view} modifyForm={modifyForm} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('All input fields should have an initial data value', async () => {
    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId} = render(<SimpleFieldApp initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('The initial data should override the value of the model', async () => {
    const model = getModelWithDefaultValue('a default model value')
    const view = createView([model])

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId} = render(<SimpleFieldApp view={view} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('The initial data should override the value of component', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          componentStore.props.value = {value: inputKey}
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId} = render(<SimpleFieldApp modifyForm={modifyForm} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('The initial data should override the value of the model and the value of the component', async () => {
    const model = getModelWithDefaultValue('a default model value')
    const view = createView([model])

    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          componentStore.props.value = {value: inputKey}
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId} = render(<SimpleFieldApp view={view} modifyForm={modifyForm} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('All input fields should have a function value', async () => {
    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          const fnValue = defaultValues[inputKey]
          componentStore.props.value = {
            value: 'defaultValue',
            computeType: 'function',
            fnSource: `return '${fnValue}'`,
          }
        })
      }
    }

    const {findByTestId} = render(<SimpleFieldApp modifyForm={modifyForm} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('All input fields should have a localization value', async () => {
    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const modifyForm = (persistedForm: PersistedForm) => {
      persistedForm.localization ??= {}
      persistedForm.localization[defaultLanguageCode] ??= {}
      const localization = persistedForm.localization[defaultLanguageCode]

      for (const inputKey of allInputKeys) {
        eachComponentStore(persistedForm.form, inputKey, componentStore => {
          componentStore.props.value = {value: 'defaultValue', computeType: 'localization'}
          localization[inputKey] ??= {component: {value: defaultValues[inputKey]}}
        })
      }
    }

    const {findByTestId} = render(<SimpleFieldApp modifyForm={modifyForm} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('All input fields should have a localized value (de-DE default lang)', async () => {
    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const lang = 'de-DE'
    const modifyForm = (persistedForm: PersistedForm) => {
      persistedForm.defaultLanguage = lang
      persistedForm.languages ??= []
      persistedForm.languages.push(new Language('de', 'DE', 'German', 'German', BiDi.LTR))
      persistedForm.localization ??= {}
      persistedForm.localization[lang] ??= {}
      const localization = persistedForm.localization[lang]

      for (const inputKey of allInputKeys) {
        eachComponentStore(persistedForm.form, inputKey, componentStore => {
          componentStore.props.value = {value: 'defaultValue', computeType: 'localization'}
          localization[inputKey] ??= {component: {value: defaultValues[inputKey]}}
        })
      }
    }

    const {findByTestId} = render(<SimpleFieldApp modifyForm={modifyForm} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }
  })

  it('All input fields should have a function value from initialData', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          const key = `${inputKey}Surname`
          form.children?.push(new ComponentStore(key, testComponentType))
          componentStore.props.value = {
            value: 'defaultValue',
            computeType: 'function',
            fnSource: 'return `last name: ${form.data.' + key + '}`',
          }
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(`${key}Surname`)
    })

    const initialData = {
      grandfatherInputSurname: defaultValues.grandfatherInput,
      templateFather: {
        fatherInputSurname: defaultValues.fatherInput,
        sonInputSurname: defaultValues.sonInput,
        fatherInSlotSurname: defaultValues.fatherInSlot,
      },
      grandfatherInSlotSurname: defaultValues.grandfatherInSlot,
      rootInputSurname: defaultValues.rootInput,
    }

    const {findByTestId} = render(<SimpleFieldApp modifyForm={modifyForm} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(`last name: ${defaultValues[key]}`)
    }
  })

  it('All input fields should have a function value from an updated initialData', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          const key = `${inputKey}Surname`
          form.children?.push(new ComponentStore(key, testComponentType))
          componentStore.props.value = {
            value: 'defaultValue',
            computeType: 'function',
            fnSource: 'return `last name: ${form.data.' + key + '}`',
          }
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(`${key}Surname`)
    })

    const initialData = {
      grandfatherInputSurname: defaultValues.grandfatherInput,
      templateFather: {
        fatherInputSurname: defaultValues.fatherInput,
        sonInputSurname: defaultValues.sonInput,
        fatherInSlotSurname: defaultValues.fatherInSlot,
      },
      grandfatherInSlotSurname: defaultValues.grandfatherInSlot,
      rootInputSurname: defaultValues.rootInput,
    }

    const {findByTestId, findByDisplayValue, rerender} = render(<SimpleFieldApp modifyForm={modifyForm} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(`last name: ${defaultValues[key]}`)
    }

    const updatedValues: Record<string, string> = {...allTestInputs}
    Object.keys(updatedValues).forEach(key => {
      updatedValues[key] = randomString(`${key}UpdatedSurname`)
    })

    const updatedData = {
      grandfatherInputSurname: updatedValues.grandfatherInput,
      templateFather: {
        fatherInputSurname: updatedValues.fatherInput,
        sonInputSurname: updatedValues.sonInput,
        fatherInSlotSurname: updatedValues.fatherInSlot,
      },
      grandfatherInSlotSurname: updatedValues.grandfatherInSlot,
      rootInputSurname: updatedValues.rootInput,
    }

    rerender(<SimpleFieldApp modifyForm={modifyForm} initialData={updatedData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      const expectedValue = `last name: ${updatedValues[key]}`
      expect(await findByDisplayValue(expectedValue)).toBeInTheDocument()
      // check that the required input field contains the value
      expect(await findByTestId(inputTestId)).toHaveValue(expectedValue)
    }
  })

  it('All input fields should have an updated initialData', async () => {
    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId, findByDisplayValue, rerender} = render(<SimpleFieldApp initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }

    const updatedValues: Record<string, string> = {...allTestInputs}
    Object.keys(updatedValues).forEach(key => {
      updatedValues[key] = randomString(`${key}UpdatedData`)
    })

    const updatedData = {
      grandfatherInput: updatedValues.grandfatherInput,
      templateFather: {
        fatherInput: updatedValues.fatherInput,
        sonInput: updatedValues.sonInput,
        fatherInSlot: updatedValues.fatherInSlot,
      },
      grandfatherInSlot: updatedValues.grandfatherInSlot,
      rootInput: updatedValues.rootInput,
    }

    rerender(<SimpleFieldApp initialData={updatedData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByDisplayValue(updatedValues[key])).toBeInTheDocument()
      // check that the required input field contains the value
      expect(await findByTestId(inputTestId)).toHaveValue(updatedValues[key])
    }
  })

  it('All input fields should have a default value after reset', async () => {
    const modifyForm = ({form}: PersistedForm, name?: string) => {
      if (name === 'root') {
        const resetButton = new ComponentStore('reset', 'RsButton')
        resetButton.props.children = {value: 'Reset'}
        resetButton.events = {onClick: [{name: 'reset', type: 'common'}]}
        form.children?.push(resetButton)
      }

      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          componentStore.props.value = {value: inputKey}
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId, findByText} = render(<SimpleFieldApp modifyForm={modifyForm} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }

    const resetButton = await findByText('Reset')
    fireEvent.click(resetButton)

    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(key)
    }
  })

  it('All input fields should have a default value after clear', async () => {
    const defaultModelValue = randomString('model-default-')
    const model = getModelWithDefaultValue(defaultModelValue)
    const view = createView([...componentsMetadata.filter(model => model.typeName !== testComponentType), model])

    const modifyForm = ({form}: PersistedForm, name?: string) => {
      if (name === 'root') {
        const clearButton = new ComponentStore('clear', 'RsButton')
        clearButton.props.children = {value: 'Clear'}
        clearButton.events = {onClick: [{name: 'clear', type: 'common'}]}
        form.children?.push(clearButton)
      }

      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          componentStore.props.value = {value: inputKey}
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(key)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        sonInput: defaultValues.sonInput,
        fatherInSlot: defaultValues.fatherInSlot,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      rootInput: defaultValues.rootInput,
    }

    const {findByTestId, findByText} = render(<SimpleFieldApp view={view} modifyForm={modifyForm} initialData={initialData} />)
    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue(defaultValues[key])
    }

    const clearButton = await findByText('Clear')
    fireEvent.click(clearButton)

    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      expect(await findByTestId(inputTestId)).toHaveValue('')
    }
  })

  it('The value entered should override the default value', async () => {
    const {findByTestId, findByDisplayValue} = render(<SimpleFieldApp />)

    for (const inputTestId of allInputTestIds) {
      const input = await findByTestId(inputTestId)
      expect(input).toHaveValue('')

      const newValue = randomString(`${inputTestId}-new-value`)
      fireEvent.change(input, {target: {value: newValue}})

      expect(await findByDisplayValue(newValue)).toBeInTheDocument()
      expect(await findByTestId(inputTestId)).toHaveValue(newValue)
    }
  })

  it('The value entered should override the computed value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      for (const inputKey of allInputKeys) {
        eachComponentStore(form, inputKey, componentStore => {
          const key = `${inputKey}MiddleName`
          form.children?.push(new ComponentStore(key, testComponentType))
          componentStore.props.value = {
            value: 'defaultValue',
            computeType: 'function',
            fnSource: 'return `ginger-${form.data.' + key + '}`',
          }
        })
      }
    }

    const defaultValues: Record<string, string> = {...allTestInputs}
    Object.keys(defaultValues).forEach(key => {
      defaultValues[key] = randomString(`${key}Surname`)
      defaultValues[`${key}MiddleName`] = randomString(`${key}MiddleName`)
    })

    const initialData = {
      grandfatherInput: defaultValues.grandfatherInput,
      grandfatherInputMiddleName: defaultValues.grandfatherInputMiddleName,
      templateFather: {
        fatherInput: defaultValues.fatherInput,
        fatherInputMiddleName: defaultValues.fatherInputMiddleName,
        sonInput: defaultValues.sonInput,
        sonInputMiddleName: defaultValues.sonInputMiddleName,
        fatherInSlot: defaultValues.fatherInSlot,
        fatherInSlotMiddleName: defaultValues.fatherInSlotMiddleName,
      },
      grandfatherInSlot: defaultValues.grandfatherInSlot,
      grandfatherInSlotMiddleName: defaultValues.grandfatherInSlotMiddleName,
      rootInput: defaultValues.rootInput,
      rootInputMiddleName: defaultValues.rootInputMiddleName,
    }

    const {findByTestId, findByDisplayValue} = render(<SimpleFieldApp modifyForm={modifyForm} initialData={initialData} />)

    for (const key of allInputKeys) {
      const inputTestId = allTestInputs[key]
      const computedValue = 'ginger-' + defaultValues[`${key}MiddleName`]
      const input = await findByTestId(inputTestId)
      expect(await findByTestId(inputTestId)).toHaveValue(computedValue)

      const enteredValue = randomString(`entered-${key}`)
      fireEvent.change(input, {target: {value: enteredValue}})
      expect(await findByDisplayValue(enteredValue)).toBeInTheDocument()
      expect(await findByTestId(inputTestId)).toHaveValue(enteredValue)
    }
  })
})
