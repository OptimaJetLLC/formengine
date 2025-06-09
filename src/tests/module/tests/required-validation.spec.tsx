import {SchemaTypeMap} from '@react-form-builder/core'
import {createMockStore} from '../common/createMockBuilderStore'

type TypesWithoutEnum = keyof Omit<SchemaTypeMap, 'enum'>

const valuesForTypes: Record<TypesWithoutEnum, any> = {
  string: 'string',
  number: 1,
  array: [],
  boolean: true,
  date: new Date(),
  time: '',
  object: {a: 'a'}
}

const types = Object.keys(valuesForTypes) as (keyof typeof valuesForTypes)[]
const store = createMockStore()
const getRule = (type: keyof SchemaTypeMap) => store.getValidationRules(type).internal.required.validatorFactory({})
const rules = Object.fromEntries(
  types.map((type) => [type, getRule(type)])
)

describe(`The required validation rule function`, function () {
  describe(`with an undefined value should return the Required message`, function () {
    it.each(types)('for type %s', async (type) => {
      const rule = rules[type]
      expect(await rule(undefined, store)).toEqual('Required')
    })
  })

  describe(`with correct non empty value should return true`, function () {
    it.each(types)('for type %s', async (type) => {
      const rule = rules[type]
      const value = valuesForTypes[type]
      expect(await rule(value, store)).toBeTruthy()
    })
  })
})
