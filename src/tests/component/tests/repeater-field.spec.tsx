import {rSuiteComponents} from '@react-form-builder/components-rsuite'
import {
  BiDi,
  ComponentData,
  ComponentStore,
  createView,
  define,
  FormViewer,
  FormViewerProps,
  Language,
  PersistedForm,
  PersistedFormVersion,
  string,
  useComponentData,
  View
} from '@react-form-builder/core'
import {testLicense} from '@react-form-builder/tests-common/license/vaild'
import {fireEvent, render, waitFor} from '@testing-library/react'
import {useCallback} from 'react'
import {expect} from 'vitest'
import {selectDropDownOption} from '../util/controls'
import {eachComponentStore} from './eachComponentStore'
import actionsBookingForm from './forms/actions-booking-form.json'
import bookingForm from './forms/booking-form.json'
import '../config/toAllHaveLocaleTextContent'
import '../config/toHaveExactValues'
import '../config/toAllSelectsHaveValues'

const componentsMetadata = rSuiteComponents.map(definer => definer.build().model)
const componentsView = createView(componentsMetadata)

interface RepeaterFieldAppProps {
  view?: View
  initialData?: Record<string, unknown>
  modifyForm?: (form: PersistedForm) => void
  viewerRef?: FormViewerProps['viewerRef']
}

const repeaterForms = [
  ['simpleBookingForm', JSON.stringify(bookingForm)],
  ['actionsBookingForm', JSON.stringify(actionsBookingForm)],
]

describe.each(repeaterForms)(`RepeaterField '%s' test`, function (_, testForm) {

  const RepeaterFieldApp = ({view, initialData, modifyForm, viewerRef}: RepeaterFieldAppProps) => {
    const wrappedGetForm = useCallback(() => {
      const form = JSON.parse(testForm)

      modifyForm?.(form)
      return JSON.stringify(form)
    }, [modifyForm])

    return <FormViewer
      initialData={initialData}
      licenseKey={testLicense}
      view={view ?? componentsView}
      getForm={wrappedGetForm}
      viewerRef={viewerRef}
    />
  }

  it('Only the field with the booking date input is available', async () => {
    const {findByTestId, queryByTestId} = render(<RepeaterFieldApp/>)
    expect(await findByTestId('bookingDate')).not.toHaveValue()
    expect(queryByTestId('roomType')).not.toBeInTheDocument()
  })

  it('Repeater should have a default value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{}]}
      })
    }

    const {findByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    expect(await findByTestId('firstName')).toHaveValue('')
    expect(await findByTestId('lastName')).toHaveValue('')
    expect(await findByTestId('adults')).toHaveValue('1')
    expect(await findByTestId('children')).toHaveValue('0')
    expect(await findByTestId('children')).toHaveValue('0')
  })

  it('Repeater should have an initial data value', async () => {
    const initialData = {
      date: new Date(),
      rooms: [{
        roomType: 'standard',
        adults: 2,
        children: 1,
        childrenAges: [{childAge: '3'}],
        names: [
          {firstName: 'James', lastName: 'Stark'},
          {firstName: 'Monica', lastName: 'Cassel'}
        ]
      }, {
        roomType: 'luxe',
        adults: 1,
        children: 2,
        childrenAges: [
          {childAge: '11'},
          {childAge: '1'}
        ],
        names: [{firstName: 'Mark', lastName: 'Ronson'}]
      }]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp initialData={initialData}/>)

    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard', 'luxe'])
    expect(await findAllByTestId('firstName')).toHaveExactValues(['James', 'Monica', 'Mark'])
    expect(await findAllByTestId('lastName')).toHaveExactValues(['Stark', 'Cassel', 'Ronson'])
    expect(await findAllByTestId('adults')).toHaveExactValues(['2', '1'])
    expect(await findAllByTestId('children')).toHaveExactValues(['1', '2'])
    await expect(await findAllByTestId('childAge')).toAllSelectsHaveValues(['3', '11', '1'])
  })

  it('Repeater should have a function value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {
          value: [{}], computeType: 'function', fnSource: 'return [{\n' +
            '      roomType: "luxe",\n' +
            '      adults: 1,\n' +
            '      children: 2,\n' +
            '      childrenAges: [\n' +
            '        {childAge: "11"},\n' +
            '        {childAge: "1"}\n' +
            '      ],\n' +
            '      names: [{firstName: "Mark", lastName: "Ronson"}]\n' +
            '    }]'
        }
      })
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)

    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['luxe'])
    expect(await findAllByTestId('firstName')).toHaveExactValues(['Mark'])
    expect(await findAllByTestId('lastName')).toHaveExactValues(['Ronson'])
    expect(await findAllByTestId('adults')).toHaveExactValues(['1'])
    expect(await findAllByTestId('children')).toHaveExactValues(['2'])
    await expect(await findAllByTestId('childAge')).toAllSelectsHaveValues(['11', '1'])
  })

  it('Repeater should have a localization value', async () => {
    const initialData = {
      rooms: [{roomType: 'standard'}, {}, {roomType: 'luxe'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['Room standard', 'Room ', 'Room luxe'])
  })

  it('Repeater should have a [NOT LOCALIZED] value', async () => {
    const modifyForm = (form: PersistedForm) => {
      delete form.localization['en-US']['rsStaticContent1']
      delete form.localization['de-DE']['rsStaticContent1']
    }
    const initialData = {
      rooms: [{roomType: 'luxe'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['[NOT LOCALIZED]'])
  })

  it('Repeater should have a [NOT LOCALIZED] value (no default localization)', async () => {
    const modifyForm = (form: PersistedForm) => {
      delete form.localization['en-US']['rsStaticContent1']
    }
    const initialData = {
      rooms: [{roomType: 'luxe'}, {roomType: 'standard'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['[NOT LOCALIZED]', '[NOT LOCALIZED]'])
  })

  it('Repeater should have a [NOT LOCALIZED] value (de-DE default lang)', async () => {
    const modifyForm = (form: PersistedForm) => {
      form.languages = []
      delete form.localization['en-US']['rsStaticContent1']
      form.defaultLanguage = 'de-DE'
    }
    const initialData = {
      rooms: [{roomType: 'standard'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['[NOT LOCALIZED]'])
  })

  it('Repeater should have a localized value (de-DE default lang)', async () => {
    const modifyForm = (form: PersistedForm) => {
      form.languages = [new Language('de', 'DE', 'German', 'German', BiDi.LTR)]
      delete form.localization['en-US']['rsStaticContent1']
      form.defaultLanguage = 'de-DE'
    }
    const initialData = {
      rooms: [{roomType: 'standard'}]
    }

    const {findAllByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findAllByTestId('roomLabel')).toAllHaveLocaleTextContent(['Zimmer standard'])
  })

  it('Repeater should have a function value from initialData', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [], computeType: 'function', fnSource: 'return [{}, {}]'}
      })
    }

    const {findByText} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    expect(await findByText('Remove room #2')).toBeInTheDocument()
  })

  it('Repeater should have a function value from an updated initialData', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      const roomsData = new ComponentStore('roomsData', 'RsInput')
      form.children?.push(roomsData)
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {
          value: [],
          computeType: 'function',
          fnSource: 'return JSON.parse(form.data.roomsData ?? "[]")'
        }
      })
    }

    const initialData = {roomsData: '[{"roomType": "standard"}, {"roomType": "luxe"}]', rooms: []}
    const {findAllByTestId, findByText, rerender} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findByText('Remove room #2')).toBeInTheDocument()
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard', 'luxe'])

    const newData = {roomsData: '[{"roomType": "luxe"}, {"roomType": "standard"}, {"roomType": "standard"}]', rooms: []}
    rerender(<RepeaterFieldApp modifyForm={modifyForm} initialData={newData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['luxe', 'standard', 'standard'])
  })

  it('Repeater should have an updated initialData', async () => {
    const initialData = {rooms: [{roomType: 'standard'}]}
    const {findAllByTestId, rerender} = render(<RepeaterFieldApp initialData={initialData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard'])

    const newData = {rooms: [{roomType: 'luxe'}]}
    rerender(<RepeaterFieldApp initialData={newData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['luxe'])
  })

  it('Repeater should have a default value after reset', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      const resetButton = new ComponentStore('reset', 'RsButton')
      resetButton.props.children = {value: 'Reset'}
      resetButton.events = {'onClick': [{'name': 'reset', 'type': 'common'}]}
      form.children?.push(resetButton)
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{'roomType': 'luxe'}]}
      })
    }

    const initialData = {rooms: [{roomType: 'standard'}, {roomType: 'standard'}]}
    const {findAllByTestId, findByText} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues(['standard', 'standard'])

    const resetButton = await findByText('Reset')
    fireEvent.click(resetButton)

    // Repeater resets the values for all of its child components,
    // so that the value set as data for components at the level below is not applied
    await expect(await findAllByTestId('roomType')).toAllSelectsHaveValues([''])
  })

  it('Repeater should have a default value after clear', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      const clearButton = new ComponentStore('clear', 'RsButton')
      clearButton.props.children = {value: 'Clear'}
      clearButton.events = {'onClick': [{'name': 'clear', 'type': 'common'}]}
      form.children?.push(clearButton)

      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{'adults': '2'}, {'adults': '3'}]}
      })
    }

    const initialData = {rooms: [{adults: 5}]}
    const {findByTestId, findByText, queryByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm} initialData={initialData}/>)
    expect(await findByTestId('adults')).toHaveValue('5')

    const clearButton = await findByText('Clear')
    fireEvent.click(clearButton)

    expect(queryByTestId('adults')).not.toBeInTheDocument()
  })

  it('The value entered should override the default value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{}]}
      })
    }

    const {findByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    const adults = await findByTestId('adults')
    expect(adults).toHaveValue('1')

    const addButton = await findByTestId('plusAdultButton')
    fireEvent.click(addButton)
    await waitFor(() => expect(adults).toHaveValue('2'))
  })

  it('The value entered should override the computed value', async () => {
    const modifyForm = ({form}: PersistedForm) => {
      eachComponentStore(form, 'rooms', (componentStore) => {
        componentStore.props.value = {value: [{}], computeType: 'function', fnSource: 'return []'}
      })
    }

    const {queryByTestId, getByTestId} = render(<RepeaterFieldApp modifyForm={modifyForm}/>)
    expect(queryByTestId('adults')).not.toBeInTheDocument()

    const bookButton = getByTestId('bookButton')
    fireEvent.click(bookButton)
    // // the computed value for the repeater works as initial data, so we can add a new room
    expect(queryByTestId('adults')).toBeInTheDocument()
  })

  it('Old ComponentData in the RepeaterField must be disposed', async () => {
    const componentDataSet = new Set<ComponentData>()

    const SimpleComponent = (props: any) => {
      const {value, ...otherProps} = props
      const componentData = useComponentData()
      componentDataSet.add(componentData)
      return <span {...otherProps}>${componentData.id} {value ?? ''}</span>
    }

    const simpleComponent = define(SimpleComponent, 'SimpleComponent')
      .props({
        value: string.valued
      })

    const form: PersistedForm = {
      version: PersistedFormVersion.version1,
      actions: {},
      form: {
        key: 'Screen',
        type: 'Screen',
        props: {},
        children: [
          {
            key: 'testRepeater',
            type: 'Repeater',
            props: {},
            children: [
              {
                key: 'name',
                type: 'SimpleComponent',
                props: {},
                htmlAttributes: [{name: 'data-testid', value: 'test-component'}]
              }
            ]
          }
        ]
      },
      localization: {},
      languages: [],
      defaultLanguage: ''
    }

    const appView = createView([simpleComponent.build().model])
    const getForm = () => JSON.stringify(form)

    const App = ({initialData}: Partial<FormViewerProps>) => {
      return <FormViewer view={appView} initialData={initialData} getForm={getForm}/>
    }

    const initialData = {testRepeater: [{name: 'test-1'}, {name: 'test-2'}]}
    const {rerender, findAllByTestId} = render(<App initialData={initialData}/>)

    // here we check that the current ComponentData fields contain data from initialData
    const componentDataArray = Array.from(componentDataSet)
    const fieldValues = componentDataArray.map(data => data.field?.value)
    expect(componentDataArray.length).toBe(2)
    expect(fieldValues).contains('test-1')
    expect(fieldValues).contains('test-2')

    // check rendered components
    const firstRenderComponents = await findAllByTestId('test-component')
    expect(firstRenderComponents.length).equals(2)
    expect(firstRenderComponents[0].innerHTML).contains('test-1')
    expect(firstRenderComponents[1].innerHTML).contains('test-2')

    const newData = {testRepeater: [{name: 'test-3'}, {name: 'test-4'}, {name: 'test-5'}]}
    rerender(<App initialData={newData}/>)

    // now we check that the current ComponentData fields contain the updated data from initialData,
    // including the new element
    expect(componentDataSet.size).toBe(5)
    const newComponentDataArray = Array.from(componentDataSet)
      .filter(cd => componentDataArray.indexOf(cd) === -1)
    const newFieldValues = newComponentDataArray.map(data => data.field?.value)
    expect(newComponentDataArray.length).toBe(3)
    expect(newFieldValues).contains('test-3')
    expect(newFieldValues).contains('test-4')
    expect(newFieldValues).contains('test-5')
    expect(newFieldValues).not.contains('test-1')
    expect(newFieldValues).not.contains('test-2')

    // check rendered components
    const secondRenderComponents = await findAllByTestId('test-component')
    expect(secondRenderComponents.length).equals(3)
    expect(secondRenderComponents[0].innerHTML).contains('test-3')
    expect(secondRenderComponents[1].innerHTML).contains('test-4')
    expect(secondRenderComponents[2].innerHTML).contains('test-5')

    // and now we check that the values of the old fields have not changed,
    // so we can be sure that the old ComponentData has been disposed of
    const oldFieldValues = componentDataArray.map(data => data.field?.value)
    expect(oldFieldValues).contains('test-1')
    expect(oldFieldValues).contains('test-2')
    expect(oldFieldValues).not.contains('test-3')
    expect(oldFieldValues).not.contains('test-4')
    expect(oldFieldValues).not.contains('test-5')
  })

  it('The test form for Repeater should work correctly', async () => {
    const viewerRef: FormViewerProps['viewerRef'] = {current: null}
    const rendered = render(<RepeaterFieldApp viewerRef={viewerRef}/>)
    const {findByTestId, findAllByTestId, findByRole} = rendered
    const targetChildAge = ['12', '14', '15']

    const bookButton = await findByTestId('bookButton')
    fireEvent.click(bookButton)

    // check that the form in the initial state
    expect(await findByTestId('firstName')).toHaveValue('')
    expect(await findByTestId('lastName')).toHaveValue('')
    expect(await findByTestId('adults')).toHaveValue('1')
    expect(await findByTestId('children')).toHaveValue('0')

    // clicking the button shouldn't change anything.
    fireEvent.click(await findByTestId('minusAdultButton'))
    expect(await findByTestId('adults')).toHaveValue('1')

    // clicking the button shouldn't change anything.
    fireEvent.click(await findByTestId('minusChildrenButton'))
    expect(await findByTestId('children')).toHaveValue('0')

    fireEvent.change(await findByTestId('firstName'), {target: {value: 'Isra'}})
    fireEvent.change(await findByTestId('lastName'), {target: {value: 'Black'}})

    fireEvent.click(await findByTestId('plusAdultButton'))
    expect(await findByTestId('adults')).toHaveValue('2')

    // check that the data in the form is displayed correctly
    expect(await findAllByTestId('firstName')).toHaveLength(2)
    expect(await findAllByTestId('firstName')).toHaveExactValues(['Isra', ''])
    expect(await findAllByTestId('lastName')).toHaveExactValues(['Black', ''])

    const plusChildButton = await findByTestId('plusChildButton')
    fireEvent.click(plusChildButton)
    expect(await findByTestId('children')).toHaveValue('1')

    fireEvent.click(plusChildButton)
    expect(await findByTestId('children')).toHaveValue('2')

    fireEvent.click(plusChildButton)
    expect(await findByTestId('children')).toHaveValue('3')
    expect(await findAllByTestId('childAge')).toHaveExactValues([null, null, null])

    const childAge = await findAllByTestId('childAge')
    for (let i = 0; i < childAge.length; i++) {
      await selectDropDownOption(rendered, childAge[i], `${targetChildAge[i]} years old`)
    }

    expect(viewerRef.current).not.toBeNull()
    const actualFormData = JSON.stringify(viewerRef.current?.formData.data)
    const expectedData = {
      rooms: [{
        adults: 2,
        children: 3,
        childrenAges: [{childAge: targetChildAge[0]}, {childAge: targetChildAge[1]}, {childAge: targetChildAge[2]}],
        names: [{firstName: 'Isra', lastName: 'Black'}, {}]
      }]
    }
    expect(actualFormData).toBe(JSON.stringify(expectedData))

    fireEvent.click(bookButton)

    expect(await findByRole('button', {name: 'Remove room #2'})).toBeInTheDocument()
    expect(await findAllByTestId('firstName')).toHaveExactValues(['Isra', '', ''])
    expect(await findAllByTestId('lastName')).toHaveExactValues(['Black', '', ''])

    // let's add some data
    fireEvent.change((await findAllByTestId('firstName'))[1], {target: {value: 'Vidomina'}})
    fireEvent.change((await findAllByTestId('lastName'))[1], {target: {value: 'White'}})
    fireEvent.change((await findAllByTestId('firstName'))[2], {target: {value: 'Dessa'}})
    fireEvent.change((await findAllByTestId('lastName'))[2], {target: {value: 'Green'}})

    // then remove one child in the first room
    fireEvent.click((await findAllByTestId('minusChildrenButton'))[0])
    // // add one child in the second room
    fireEvent.click((await findAllByTestId('plusChildButton'))[1])
    // and add another room
    fireEvent.click(await findByTestId('bookButton'))

    const actualFormData2 = JSON.stringify(viewerRef.current?.formData.data)
    const expectedData2 = {
      rooms: [{
        adults: 2,
        children: 2,
        childrenAges: [{childAge: targetChildAge[0]}, {childAge: targetChildAge[1]}],
        names: [{firstName: 'Isra', lastName: 'Black'}, {firstName: 'Vidomina', lastName: 'White'}]
      }, {
        adults: 1,
        children: 1,
        childrenAges: [{childAge: 'none'}],
        names: [{firstName: 'Dessa', lastName: 'Green'}]
      }, {
        adults: 1,
        children: 0,
        childrenAges: [],
        names: [{}],
      }]
    }
    expect(actualFormData2).toBe(JSON.stringify(expectedData2))

    // and now we remove the second room
    fireEvent.click(await findByRole('button', {name: 'Remove room #2'}))

    const actualFormData3 = JSON.stringify(viewerRef.current?.formData.data)
    const expectedData3 = {
      rooms: [{
        adults: 2,
        children: 2,
        childrenAges: [{childAge: targetChildAge[0]}, {childAge: targetChildAge[1]}],
        names: [{firstName: 'Isra', lastName: 'Black'}, {firstName: 'Vidomina', lastName: 'White'}]
      }, {
        adults: 1,
        children: 0,
        childrenAges: [],
        names: [{}],
      }]
    }
    expect(actualFormData3).toBe(JSON.stringify(expectedData3))

    // and remove one adult in the first room
    expect(await findAllByTestId('firstName')).toHaveExactValues(['Isra', 'Vidomina', ''])
    fireEvent.click((await findAllByTestId('minusAdultButton'))[0])
    await waitFor(async () => expect(await findAllByTestId('adults')).toHaveLength(2))
    expect(await findAllByTestId('firstName')).toHaveExactValues(['Isra', ''])
    expect(await findAllByTestId('adults')).toHaveExactValues(['1', '1'])
  })
})
