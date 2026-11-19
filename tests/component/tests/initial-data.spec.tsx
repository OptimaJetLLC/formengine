import {viewWithCss} from '@react-form-builder/components-rsuite'
import {buildForm, FormViewer} from '@react-form-builder/core'
import {fireEvent, render} from '@testing-library/react'
import {describe, expect, it} from 'vitest'
import {renderForm} from '../util/renderRsuiteForm'
import formManagerEmployeeFieldsForm from './forms/initial-data/form-manager-t-employee-fields-form.json'
import formManagerHeaderForm from './forms/initial-data/form-manager-t-header-form.json'
import formManagerManagerFieldsForm from './forms/initial-data/form-manager-t-manager-fields-form.json'
import formManagerViewForm from './forms/initial-data/form-manager-view-form.json'
import childForm from './forms/initial-data/initial-data-child-form.json'
import initialDataHeaderForm from './forms/initial-data/initial-data-header-form.json'
import parentNotStoreForm from './forms/initial-data/initial-data-parent-not-store-form.json'
import parentStoreForm from './forms/initial-data/initial-data-parent-store-form.json'
import repeaterForm from './forms/initial-data/initial-data-repeater-form.json'
import rootTemplateForm from './forms/initial-data/initial-data-root-form.json'
import twoFieldsForm from './forms/initial-data/two-fields-form.json'

describe('Initial data test', () => {
  it('The header value is calculated based on the initial data', async () => {
    const initialData = {header: 'Hey', subHeader: 'Test'}

    const {formData, findByTestId} = renderForm(initialDataHeaderForm, {initialData})
    expect(formData.data).toStrictEqual(initialData)

    const header1 = await findByTestId('header1')
    expect(header1.innerHTML).toEqual('Hey | Test')

    const header2 = await findByTestId('header2')
    expect(header2.innerHTML).toEqual('Test')

    // changing initialDataObject has no effect
    initialData.header = 'ChangedHeader'
    expect((await findByTestId('header1')).innerHTML).toEqual('Hey | Test')

    const button = await findByTestId('button1')
    fireEvent.click(button)

    expect((await findByTestId('header1')).innerHTML).toEqual('Hey | new value')
    expect(header2.innerHTML).toEqual('new value')

    expect(formData.data).toStrictEqual({
      andNewVal: [{test: true}],
      counter: 1,
      header: 'Hey',
      subHeader: 'new value',
    })

    fireEvent.click(button)
    expect(formData.data).toStrictEqual({
      andNewVal: [{test: true}],
      counter: 2,
      header: 'Hey',
      subHeader: 'new value',
    })
  })

  it('Template should update initial data when storeDataInParentForm=true', async () => {
    const getForm = (name?: string) => {
      const form = name ? childForm : parentStoreForm
      return JSON.stringify(form)
    }

    const {formData, findByTestId} = renderForm({}, {getForm})

    const input = await findByTestId('firstNameInput')
    fireEvent.change(input, {target: {value: 'Hello'}})

    const appendDataButton = await findByTestId('appendDataButton')
    fireEvent.click(appendDataButton)

    expect(formData.data).toStrictEqual({
      counter: 1,
      firstNameInput: 'Hello',
      lastNameInput: 'last name for: Hello',
    })

    fireEvent.click(appendDataButton)
    expect(formData.data).toStrictEqual({
      counter: 2,
      firstNameInput: 'Hello',
      lastNameInput: 'last name for: Hello',
    })
  })

  it('Template should update initial data when storeDataInParentForm=false', async () => {
    const getForm = (name?: string) => {
      const form = name ? childForm : parentNotStoreForm
      return JSON.stringify(form)
    }

    const {formData, findByTestId} = renderForm({}, {getForm})

    const input = await findByTestId('firstNameInput')
    fireEvent.change(input, {target: {value: 'Hello'}})

    const appendDataButton = await findByTestId('appendDataButton')
    fireEvent.click(appendDataButton)

    expect(formData.data).toStrictEqual({
      template1: {
        counter: 1,
        firstNameInput: 'Hello',
        lastNameInput: 'last name for: Hello',
      },
    })

    fireEvent.click(appendDataButton)
    expect(formData.data).toStrictEqual({
      template1: {
        counter: 2,
        firstNameInput: 'Hello',
        lastNameInput: 'last name for: Hello',
      },
    })
  })

  it('Initial data should be changed at all levels', async () => {
    const initialData = {
      templateInitialDataParentNotStore1: {
        template1: {
          firstNameInput: 'Mark',
        },
      },
      template1: {
        firstNameInput: 'Sylvia',
      },
      templateInitialDataParentStore2: {
        firstNameInput: 'Jack',
      },
      firstNameInput: 'Dolly',
    }

    const getForm = (name?: string) => {
      let form: any = rootTemplateForm
      if (name === 'initial-data-parent-not-store') form = parentNotStoreForm
      if (name === 'initial-data-parent-store') form = parentStoreForm
      if (name === 'child-form') form = childForm
      return JSON.stringify(form)
    }

    const {formData, findAllByTestId} = renderForm({}, {getForm, initialData})

    const buttons = await findAllByTestId('appendDataButton')
    buttons.forEach(button => {
      fireEvent.click(button)
    })

    expect(formData.data).toStrictEqual({
      templateInitialDataParentNotStore1: {
        template1: {
          counter: 1,
          firstNameInput: 'Mark',
          lastNameInput: 'last name for: Mark',
        },
      },
      template1: {
        counter: 1,
        firstNameInput: 'Sylvia',
        lastNameInput: 'last name for: Sylvia',
      },
      templateInitialDataParentStore2: {
        counter: 1,
        firstNameInput: 'Jack',
        lastNameInput: 'last name for: Jack',
      },
      counter: 1,
      firstNameInput: 'Dolly',
      lastNameInput: 'last name for: Dolly',
    })

    const elements = await findAllByTestId('firstNameInput')

    elements.forEach(element => {
      const inputValue = element.getAttribute('value') ?? ''
      fireEvent.change(element, {target: {value: `updated value: "${inputValue}"`}})
    })

    expect(formData.data).toStrictEqual({
      templateInitialDataParentNotStore1: {
        template1: {
          counter: 1,
          firstNameInput: 'updated value: "Mark"',
          lastNameInput: 'last name for: Mark',
        },
      },
      template1: {
        counter: 1,
        firstNameInput: 'updated value: "Sylvia"',
        lastNameInput: 'last name for: Sylvia',
      },
      templateInitialDataParentStore2: {
        counter: 1,
        firstNameInput: 'updated value: "Jack"',
        lastNameInput: 'last name for: Jack',
      },
      counter: 1,
      firstNameInput: 'updated value: "Dolly"',
      lastNameInput: 'last name for: Dolly',
    })

    buttons.forEach(button => {
      fireEvent.click(button)
    })

    expect(formData.data).toStrictEqual({
      templateInitialDataParentNotStore1: {
        template1: {
          counter: 2,
          firstNameInput: 'updated value: "Mark"',
          lastNameInput: 'last name for: updated value: "Mark"',
        },
      },
      template1: {
        counter: 2,
        firstNameInput: 'updated value: "Sylvia"',
        lastNameInput: 'last name for: updated value: "Sylvia"',
      },
      templateInitialDataParentStore2: {
        counter: 2,
        firstNameInput: 'updated value: "Jack"',
        lastNameInput: 'last name for: updated value: "Jack"',
      },
      counter: 2,
      firstNameInput: 'updated value: "Dolly"',
      lastNameInput: 'last name for: updated value: "Dolly"',
    })
  })

  it('Repeater initial data should be changed at all levels', async () => {
    const initialData = {guten: 'Morgen'}

    const {formData, findAllByTestId} = renderForm(repeaterForm, {initialData})

    expect(formData.data).toStrictEqual({
      guten: 'Morgen',
      rootRepeater: [
        {
          parentRepeater: [
            {
              childRepeater: [{testInput: undefined}, {testInput: undefined}],
            },
          ],
        },
      ],
    })

    const testInputs = await findAllByTestId('test-input')
    expect(testInputs.length).toEqual(2)
    const testButtons = await findAllByTestId('test-button')
    expect(testButtons.length).toEqual(2)

    fireEvent.change(testInputs[0], {target: {value: 'Oh'}})
    fireEvent.click(testButtons[0])

    expect(formData.data).toStrictEqual({
      guten: 'Morgen',
      rootCounter: 1,
      rootRepeater: [
        {
          parentRepeater: [
            {
              childRepeater: [{testInput: 'Oh', childKey: 'some data: Oh', childCounter: 1}, {testInput: undefined}],
              parentCounter: 1,
            },
          ],
        },
      ],
    })

    fireEvent.change(testInputs[0], {target: {value: 'Oh ho ho'}})
    fireEvent.change(testInputs[1], {target: {value: 'Whooo!'}})
    fireEvent.click(testButtons[1])

    expect(formData.data).toStrictEqual({
      guten: 'Morgen',
      rootCounter: 2,
      rootRepeater: [
        {
          parentRepeater: [
            {
              childRepeater: [
                {testInput: 'Oh ho ho', childKey: 'some data: Oh', childCounter: 1},
                {testInput: 'Whooo!', childKey: 'some data: Whooo!', childCounter: 1},
              ],
              parentCounter: 2,
            },
          ],
        },
      ],
    })

    fireEvent.click(testButtons[0])
    expect(formData.data).toStrictEqual({
      guten: 'Morgen',
      rootCounter: 3,
      rootRepeater: [
        {
          parentRepeater: [
            {
              childRepeater: [
                {testInput: 'Oh ho ho', childKey: 'some data: Oh ho ho', childCounter: 2},
                {testInput: 'Whooo!', childKey: 'some data: Whooo!', childCounter: 1},
              ],
              parentCounter: 3,
            },
          ],
        },
      ],
    })
  })

  it('Two fields with the same key should be updated at the same time', async () => {
    const testData = 'test data'
    const initialData = {rsInput1: testData}
    const {formData, findByTestId} = renderForm(twoFieldsForm, {initialData})

    const rsInput1 = await findByTestId('rsInput1')
    expect(rsInput1).toHaveValue(testData)
    const rsInput2 = await findByTestId('rsInput2')
    expect(rsInput2).toHaveValue(testData)
    expect(formData.data).toStrictEqual({rsInput1: testData})

    const firstInputValue = 'Many thanks!'
    fireEvent.change(rsInput1, {target: {value: firstInputValue}})
    expect(rsInput1).toHaveValue(firstInputValue)
    expect(rsInput2).toHaveValue(firstInputValue)
    expect(formData.data).toStrictEqual({rsInput1: firstInputValue})

    const secondInputValue = 'Great!'
    fireEvent.change(rsInput1, {target: {value: secondInputValue}})
    expect(rsInput1).toHaveValue(secondInputValue)
    expect(rsInput2).toHaveValue(secondInputValue)
    expect(formData.data).toStrictEqual({rsInput1: secondInputValue})
  })

  it("Form manager's Header template should work without hidden fields", async () => {
    const getForm = () => JSON.stringify(formManagerHeaderForm)
    const {findByTestId, rerender} = render(<FormViewer view={viewWithCss} getForm={getForm} />)

    const header = await findByTestId('rsHeader1')
    expect(header).toHaveTextContent('Weekly Employee Report : unnamed : state?')

    const initialData = {stateName: 'Started', name: 'Henry'}
    rerender(<FormViewer view={viewWithCss} getForm={getForm} initialData={initialData} />)
    expect(header).toHaveTextContent('Weekly Employee Report : Henry : Started')
  })

  it("Form manager's View form should work without hidden fields", async () => {
    const formManagerForms: Record<string, any> = {
      'T:Header': formManagerHeaderForm,
      'T:EmployeeFields': formManagerEmployeeFieldsForm,
      'T:ManagerFields': formManagerManagerFieldsForm,
    }
    const getForm = (name?: string) => {
      const form = name ? formManagerForms[name] : formManagerViewForm
      if (!form) throw new Error(`Form ${name} not found`)
      return JSON.stringify(form)
    }
    const initialData = {stateName: 'Finished', name: 'Jimmy'}
    const {findByTestId} = render(<FormViewer view={viewWithCss} getForm={getForm} initialData={initialData} />)

    const header = await findByTestId('rsHeader1')
    expect(header).toHaveTextContent('Weekly Employee Report : Jimmy : Finished')
  })

  it('Null values should be saved from the initial data', async () => {
    const jsonForm = buildForm().component('id', 'RsInput').component('submittedBy', 'RsInput').component('reviewedBy', 'RsInput').json()
    const form = JSON.parse(jsonForm)
    const initialData = {
      id: 'cfae1452-e523-42e0-8c07-084ffe4ff1ef',
      submittedBy: 'Paula',
      submittedOn: '2025-09-02T14:02:29.557',
      name: 'Week 36, 2025',
      reviewedBy: null,
      testedBy: null,
      version: 0,
      stateName: 'Created',
    }

    const {formData} = renderForm(form, {initialData})
    expect(formData.data).toStrictEqual({
      id: 'cfae1452-e523-42e0-8c07-084ffe4ff1ef',
      submittedBy: 'Paula',
      submittedOn: '2025-09-02T14:02:29.557',
      name: 'Week 36, 2025',
      reviewedBy: undefined,
      testedBy: null,
      version: 0,
      stateName: 'Created',
    })
  })
})
