import {createView, date, define, type Store, type Validators} from '@react-form-builder/core'
import {createViewerStore} from '../common/createMockBuilderStore'

const defaultDate = '2025-06-12T21:00:00.000Z'
const overrideDate = '2025-07-01T00:00:00.000Z'

const dateField = define(() => <div/>, 'DateField')
  .name('Date field')
  .props({
    value: date.valued
  })
  .build()

const createStore = (validations: object[], validators: Validators) => {
  const store = createViewerStore({
    view: createView([dateField.model]),
    validators
  })
  store.applyStringForm(JSON.stringify({
    form: {
      key: 'Screen',
      type: 'Screen',
      children: [{
        key: 'field',
        type: 'DateField',
        schema: {validations}
      }]
    }
  }))
  return store
}

const validateField = async (store: Store) => {
  const field = store.form.componentTree.findByKey('field')
  expect(field?.field).toBeDefined()
  await field!.field!.validate()
}

describe('Date parameter defaults are coerced when copied into validator args', () => {
  it('passes a Date for a date param default when the form omits the arg', async () => {
    let receivedArgs: Record<string, unknown> | undefined
    const params = [
      {key: 'value', type: 'date' as const, required: false, default: defaultDate}
    ]
    const store = createStore(
      [{key: 'withDateDefault', type: 'custom'}],
      {
        date: {
          withDateDefault: {
            params,
            validate: (_value, _store, args) => {
              receivedArgs = args
              return true
            }
          }
        }
      }
    )

    await validateField(store)

    expect(receivedArgs?.value).toBeInstanceOf(Date)
    expect((receivedArgs?.value as Date).toISOString()).toBe(defaultDate)
    expect(params[0].default).toBe(defaultDate)
  })

  it('lets an explicit arg override the coerced date default', async () => {
    let receivedArgs: Record<string, unknown> | undefined
    const store = createStore(
      [{key: 'withDateDefault', type: 'custom', args: {value: overrideDate}}],
      {
        date: {
          withDateDefault: {
            params: [
              {key: 'value', type: 'date', required: false, default: defaultDate}
            ],
            validate: (_value, _store, args) => {
              receivedArgs = args
              return true
            }
          }
        }
      }
    )

    await validateField(store)

    expect(receivedArgs?.value).toBeInstanceOf(Date)
    expect((receivedArgs?.value as Date).toISOString()).toBe(overrideDate)
  })

  it('leaves a non-date param default unchanged', async () => {
    let receivedArgs: Record<string, unknown> | undefined
    const store = createStore(
      [{key: 'withStringDefault', type: 'custom'}],
      {
        date: {
          withStringDefault: {
            params: [
              {key: 'value', type: 'string', required: false, default: defaultDate}
            ],
            validate: (_value, _store, args) => {
              receivedArgs = args
              return true
            }
          }
        }
      }
    )

    await validateField(store)

    expect(receivedArgs?.value).toBe(defaultDate)
  })
})
