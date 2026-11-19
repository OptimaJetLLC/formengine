import {
  createView,
  define,
  getValidationRuleDefinition,
  type Store,
  string,
  type ValidationRuleSettings,
  type ValidatorType,
} from '@react-form-builder/core'
import {afterEach, describe, expect, it, vi} from 'vitest'
import {createViewerStore} from '../common/createMockBuilderStore'

const internalRequired = {
  params: [{key: 'message', type: 'string' as const, required: false}],
  validatorFactory: () => () => true,
}

const customRule = {
  params: [{key: 'message', type: 'string' as const, required: false}],
  validate: () => true,
}

const rules = {
  internal: {
    required: internalRequired,
  },
  custom: {
    customRule,
  },
}

const unsupportedType = 'unsupported' as ValidatorType

const stringField = define(() => <div />, 'StringField')
  .name('String field')
  .props({
    value: string.valued,
  })
  .build()

const createStore = (validations: ValidationRuleSettings[]) => {
  const store = createViewerStore({view: createView([stringField.model])})
  store.applyStringForm(
    JSON.stringify({
      form: {
        key: 'Screen',
        type: 'Screen',
        children: [
          {
            key: 'field',
            type: 'StringField',
            schema: {validations},
          },
        ],
      },
    })
  )
  return store
}

const validateField = async (store: Store) => {
  const field = store.form.componentTree.findByKey('field')
  expect(field?.field).toBeDefined()
  await field!.field!.validate()
  return field!.field!
}

describe('getValidationRuleDefinition', () => {
  it('resolves an internal rule when type is omitted', () => {
    expect(getValidationRuleDefinition(rules, {key: 'required'})).toEqual({
      type: 'internal',
      definition: internalRequired,
    })
  })

  it('resolves an internal rule when type is internal', () => {
    expect(getValidationRuleDefinition(rules, {key: 'required', type: 'internal'})).toEqual({
      type: 'internal',
      definition: internalRequired,
    })
  })

  it('resolves a custom rule', () => {
    expect(getValidationRuleDefinition(rules, {key: 'customRule', type: 'custom'})).toEqual({
      type: 'custom',
      definition: customRule,
    })
  })

  it('returns undefined when an internal rule key is missing', () => {
    expect(getValidationRuleDefinition(rules, {key: 'missing'})).toBeUndefined()
  })

  it('returns undefined when a custom rule key is missing', () => {
    expect(getValidationRuleDefinition(rules, {key: 'missing', type: 'custom'})).toBeUndefined()
  })

  it('returns undefined for an unsupported validator type', () => {
    expect(getValidationRuleDefinition(rules, {key: 'required', type: unsupportedType})).toBeUndefined()
  })
})

describe('Unresolved validation rules are no-ops', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('does not fail validation for an unsupported validator type', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const store = createStore([{key: 'required', type: unsupportedType}])

    expect(store.formLoadError).toBeUndefined()
    const field = await validateField(store)

    expect(field.error).toBeUndefined()
    expect(warn).toHaveBeenCalledWith("Cannot find rule, key: 'required', type: 'unsupported'")
  })

  it('does not fail validation for a missing internal rule', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const field = await validateField(createStore([{key: 'missingInternal'}]))

    expect(field.error).toBeUndefined()
    expect(warn).toHaveBeenCalledWith("Cannot find 'internal' rule, key: 'missingInternal'")
  })

  it('does not fail validation for a missing custom rule', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const field = await validateField(createStore([{key: 'missingCustom', type: 'custom'}]))

    expect(field.error).toBeUndefined()
    expect(warn).toHaveBeenCalledWith("Cannot find rule, key: 'missingCustom', type: 'custom'")
  })

  it('still runs resolved rules when an unsupported type is present', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    const field = await validateField(createStore([{key: 'required', type: unsupportedType}, {key: 'required'}]))

    expect(field.error).toBe('Required')
  })
})
