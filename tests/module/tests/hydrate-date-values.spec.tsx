import {BuilderView, ComponentStore, createView, date, define, Model, string, type Validators} from '@react-form-builder/core'
import {createViewerStore} from '../common/createMockBuilderStore'

const isoDate = '2025-05-23T21:00:00.000Z'
const isoFrom = '2025-05-09T21:00:00.000Z'
const isoTo = '2025-05-30T21:00:00.000Z'

const customDateComponent = define(() => <div />, 'CustomDateField')
  .name('Custom date')
  .props({
    label: string,
    calendarDefaultDate: date,
    defaultValue: date,
    value: date.valued,
  })
  .build()

const customStringComponent = define(() => <div />, 'CustomStringField')
  .name('Custom string')
  .props({
    value: string.valued,
  })
  .build()

const customValidators: Validators = {
  date: {
    testCustomDate: {
      params: [
        {key: 'value', type: 'date', required: false},
        {key: 'from', type: 'date', required: false},
        {key: 'to', type: 'date', required: false},
        {key: 'number', type: 'number', required: false},
      ],
      validate: () => true,
    },
    testCustomString: {
      params: [
        {key: 'value', type: 'string', required: false},
        {key: 'number', type: 'number', required: false},
      ],
      validate: () => true,
    },
  },
}

const persistedForm = {
  form: {
    key: 'Screen',
    type: 'Screen',
    props: {},
    children: [
      {
        key: 'customDate',
        type: 'CustomDateField',
        props: {
          label: {value: 'Date'},
          calendarDefaultDate: {value: isoFrom},
          defaultValue: {value: isoDate},
          value: {value: isoTo},
        },
        schema: {
          validations: [
            {key: 'min', args: {value: isoFrom}},
            {key: 'max', args: {value: isoTo}},
            {
              key: 'testCustomDate',
              type: 'custom',
              args: {value: isoDate, from: isoFrom, to: isoTo, number: 10},
            },
            {
              key: 'testCustomString',
              type: 'custom',
              args: {value: isoDate, number: 5},
            },
          ],
        },
      },
      {
        key: 'customString',
        type: 'CustomStringField',
        props: {
          value: {value: isoDate},
        },
      },
    ],
  },
}

const expectDate = (value: unknown, expectedIso: string) => {
  expect(value).toBeInstanceOf(Date)
  expect((value as Date).toISOString()).toBe(expectedIso)
}

const createStore = (useBuilderView: boolean) => {
  const components = [customDateComponent, customStringComponent]
  const view = useBuilderView ? new BuilderView(components) : createView(components.map(({model}) => model))
  return createViewerStore({view, validators: customValidators})
}

describe('Date values are hydrated from metadata after JSON deserialize', () => {
  it('converts date-typed properties and validation args for a custom date component', () => {
    const store = createStore(true)
    store.applyStringForm(JSON.stringify(persistedForm))

    const dateField = store.form.componentTree.findByKey('customDate')
    expect(dateField).toBeDefined()

    expectDate(dateField?.store.props.value?.value, isoTo)
    expectDate(dateField?.store.props.defaultValue?.value, isoDate)
    expectDate(dateField?.store.props.calendarDefaultDate?.value, isoFrom)
    expect(dateField?.store.props.label?.value).toBe('Date')

    const validations = dateField?.store.schema?.validations ?? []
    expectDate(validations[0]?.args?.value, isoFrom)
    expectDate(validations[1]?.args?.value, isoTo)
    expectDate(validations[2]?.args?.value, isoDate)
    expectDate(validations[2]?.args?.from, isoFrom)
    expectDate(validations[2]?.args?.to, isoTo)
    expect(validations[2]?.args?.number).toBe(10)
    expect(validations[3]?.args?.value).toBe(isoDate)
    expect(validations[3]?.args?.number).toBe(5)

    const stringField = store.form.componentTree.findByKey('customString')
    expect(stringField?.store.props.value?.value).toBe(isoDate)
  })

  it('converts date-typed properties in the form viewer without builder metadata', () => {
    const store = createStore(false)
    store.applyStringForm(JSON.stringify(persistedForm))

    const dateField = store.form.componentTree.findByKey('customDate')
    expectDate(dateField?.store.props.value?.value, isoTo)
    expectDate(dateField?.store.props.defaultValue?.value, isoDate)
    expectDate(dateField?.store.props.calendarDefaultDate?.value, isoFrom)

    const validations = dateField?.store.schema?.validations ?? []
    expectDate(validations[0]?.args?.value, isoFrom)
    expectDate(validations[2]?.args?.from, isoFrom)
    expect(validations[3]?.args?.value).toBe(isoDate)
  })

  it('restores Date instances after ComponentStore.clone', () => {
    const store = createStore(true)
    store.applyStringForm(JSON.stringify(persistedForm))

    const original = store.form.componentTree.findByKey('customDate')
    expect(original).toBeDefined()

    const cloned = ComponentStore.clone(original!.store)
    expect(typeof cloned.props.value?.value).toBe('string')
    expect(typeof cloned.schema?.validations?.[0]?.args?.value).toBe('string')

    const hydrated = store.createComponentData(cloned)
    expectDate(hydrated.store.props.value?.value, isoTo)
    expectDate(hydrated.store.props.defaultValue?.value, isoDate)
    expectDate(hydrated.store.schema?.validations?.[0]?.args?.value, isoFrom)
    expectDate(hydrated.store.schema?.validations?.[2]?.args?.to, isoTo)
  })

  it('unions the valued date property with dateProperties', () => {
    const model = new Model(
      () => <div />,
      'PartialDateField',
      undefined,
      'value',
      'date',
      undefined,
      undefined,
      undefined,
      'PartialDateField',
      'component',
      undefined,
      {},
      undefined,
      undefined,
      'twoWay',
      {}
    ).withDateProperties(['defaultValue'])
    const store = createViewerStore({view: createView([model])})
    store.applyStringForm(
      JSON.stringify({
        form: {
          key: 'Screen',
          type: 'Screen',
          props: {},
          children: [
            {
              key: 'partialDate',
              type: 'PartialDateField',
              props: {
                defaultValue: {value: isoDate},
                value: {value: isoTo},
              },
            },
          ],
        },
      })
    )

    const dateField = store.form.componentTree.findByKey('partialDate')
    expectDate(dateField?.store.props.defaultValue?.value, isoDate)
    expectDate(dateField?.store.props.value?.value, isoTo)
  })

  it('leaves invalid date strings unchanged when hydrating a form', () => {
    const garbage = 'not-a-date'
    const store = createStore(true)
    store.applyStringForm(
      JSON.stringify({
        form: {
          key: 'Screen',
          type: 'Screen',
          props: {},
          children: [
            {
              key: 'customDate',
              type: 'CustomDateField',
              props: {
                calendarDefaultDate: {value: garbage},
                defaultValue: {value: garbage},
                value: {value: isoTo},
              },
              schema: {
                validations: [
                  {key: 'min', args: {value: garbage}},
                  {key: 'max', args: {value: isoTo}},
                ],
              },
            },
          ],
        },
      })
    )

    expect(store.formLoadError).toBeUndefined()
    const dateField = store.form.componentTree.findByKey('customDate')
    expect(dateField?.store.props.calendarDefaultDate?.value).toBe(garbage)
    expect(dateField?.store.props.defaultValue?.value).toBe(garbage)
    expectDate(dateField?.store.props.value?.value, isoTo)

    const validations = dateField?.store.schema?.validations ?? []
    expect(validations[0]?.args?.value).toBe(garbage)
    expectDate(validations[1]?.args?.value, isoTo)
  })

  it('throws when a date field is set to an invalid date', () => {
    const store = createStore(true)
    store.applyStringForm(JSON.stringify(persistedForm))

    const dateField = store.form.componentTree.findByKey('customDate')
    expect(dateField?.field).toBeDefined()
    expect(() => dateField!.field!.setValue('not-a-date')).toThrow(/Cannot convert/)
    expect(() => dateField!.field!.setValue(Number.NaN)).toThrow(/Cannot convert/)
  })
})
