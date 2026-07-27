import {SchemaType, ValidationRuleSettings} from '@react-form-builder/core'
import {expect} from 'vitest'
import {asyncAct} from '../../common/lib/asyncAct'
import {renderForm} from '../util/renderForm'
import {generateTestForm, zodValidationView} from '../util/zodValidationHarness'

type ValidatorTestParameters = {
  name: string
  initialData?: Record<string, unknown>
  componentType?: string
  skipInputValueCheck?: boolean
  skipDataCheck?: boolean
  validation: ValidationRuleSettings
  expected: unknown,
}

const stringValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: new Date()},
    componentType: 'FakeInputComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Invalid input: expected string, received Date'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'test1'},
    validation: {key: 'required'},
    expected: {}
  }],

  nonEmpty: [{
    name: 'empty data',
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Too small: expected string to have >=1 characters'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'test2'},
    validation: {key: 'nonEmpty'},
    expected: {}
  }],

  length: [{
    name: 'empty data',
    validation: {key: 'length', args: {length: 3}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'length', args: {length: 3}},
    expected: {zodInput: 'Too small: expected string to have >=3 characters'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 't34'},
    validation: {key: 'length', args: {length: 3}},
    expected: {}
  }, {
    name: 'incorrect filled data',
    initialData: {zodInput: 't344'},
    validation: {key: 'length', args: {length: 3}},
    expected: {zodInput: 'Too big: expected string to have <=3 characters'}
  }],

  min: [{
    name: 'empty data',
    validation: {key: 'min', args: {limit: 3}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'min', args: {limit: 3}},
    expected: {zodInput: 'Too small: expected string to have >=3 characters'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'ttt'},
    validation: {key: 'min', args: {limit: 3}},
    expected: {}
  }],

  max: [{
    name: 'empty data',
    validation: {key: 'max', args: {limit: 3}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'max', args: {limit: 3}},
    expected: {}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'tttt'},
    validation: {key: 'max', args: {limit: 3}},
    expected: {zodInput: 'Too big: expected string to have <=3 characters'}
  }],

  regex: [{
    name: 'empty data',
    validation: {key: 'regex', args: {regex: '1'}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'regex', args: {regex: '1'}},
    expected: {zodInput: 'Invalid string: must match pattern /1/'}
  }, {
    name: 'filled data',
    initialData: {zodInput: '1'},
    validation: {key: 'regex', args: {regex: '1'}},
    expected: {}
  }],

  email: [{
    name: 'empty data',
    validation: {key: 'email'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'email'},
    expected: {zodInput: 'Invalid email address'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'test@email.com'},
    validation: {key: 'email'},
    expected: {}
  }],

  url: [{
    name: 'empty data',
    validation: {key: 'url'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'url'},
    expected: {zodInput: 'Invalid URL'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'http://duck.ai'},
    validation: {key: 'url'},
    expected: {}
  }],

  uuid: [{
    name: 'empty data',
    validation: {key: 'uuid'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'uuid'},
    expected: {zodInput: 'Invalid UUID'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'da6db298-cec9-42a4-beba-002f4c208812'},
    validation: {key: 'uuid'},
    expected: {}
  }],

  ip: [{
    name: 'empty data',
    validation: {key: 'ip'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'ip'},
    expected: {zodInput: 'Invalid ip'}
  }, {
    name: 'filled data ipv4',
    initialData: {zodInput: '165.234.12.232'},
    validation: {key: 'ip'},
    expected: {}
  }, {
    name: 'filled data ipv6',
    initialData: {zodInput: 'd65b:e85f:6b5a:a1f8:1e92:51df:548a:79fe'},
    validation: {key: 'ip'},
    expected: {}
  }],

  datetime: [{
    name: 'empty data',
    validation: {key: 'datetime'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'datetime'},
    expected: {zodInput: 'Invalid ISO datetime'}
  }, {
    name: 'filled data date only',
    initialData: {zodInput: '2023-01-10'},
    validation: {key: 'datetime'},
    expected: {zodInput: 'Invalid ISO datetime'}
  }, {
    name: 'filled data',
    initialData: {zodInput: '2023-01-10T00:00:00.000Z'},
    validation: {key: 'datetime'},
    expected: {}
  }, {
    name: 'filled data with Date object',
    componentType: 'FakeInputComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: new Date()},
    validation: {key: 'datetime'},
    expected: {zodInput: 'Invalid input: expected string, received Date'}
  }],

  includes: [{
    name: 'empty data',
    validation: {key: 'includes', args: {value: 'at'}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'includes', args: {value: 'at'}},
    expected: {zodInput: 'Invalid string: must include \"at\"'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'Cat'},
    validation: {key: 'includes', args: {value: 'at'}},
    expected: {}
  }],

  startsWith: [{
    name: 'empty data',
    validation: {key: 'startsWith', args: {value: 'do'}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'startsWith', args: {value: 'do'}},
    expected: {zodInput: 'Invalid string: must start with \"do\"'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'dog'},
    validation: {key: 'startsWith', args: {value: 'do'}},
    expected: {}
  }],

  endsWith: [{
    name: 'empty data',
    validation: {key: 'endsWith', args: {value: 'er'}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'endsWith', args: {value: 'er'}},
    expected: {zodInput: 'Invalid string: must end with \"er\"'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'summer'},
    validation: {key: 'endsWith', args: {value: 'er'}},
    expected: {}
  }],

  code: [{
    name: 'empty data',
    validation: {key: 'code', args: {code: '  return value === \'ok\''}},
    expected: {zodInput: 'false'}
  }, {
    name: 'with empty string',
    initialData: {zodInput: ''},
    validation: {key: 'code', args: {code: '  return value === \'ok\''}},
    expected: {zodInput: 'false'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 'ok'},
    validation: {key: 'code', args: {code: '  return value === \'ok\''}},
    expected: {}
  }],
}

const numberValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 0},
    componentType: 'RsNumberFormat',
    validation: {key: 'required'},
    expected: {}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: ''},
    componentType: 'RsNumberFormat',
    validation: {key: 'required'},
    expected: {zodInput: 'Invalid input: expected number, received string'}
  }],

  min: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'min', args: {limit: 7}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: 3},
    componentType: 'RsNumberFormat',
    validation: {key: 'min', args: {limit: 7}},
    expected: {zodInput: 'Too small: expected number to be >=7'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 7},
    componentType: 'RsNumberFormat',
    validation: {key: 'min', args: {limit: 7}},
    expected: {}
  }],

  max: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'max', args: {limit: 7}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: 8},
    componentType: 'RsNumberFormat',
    validation: {key: 'max', args: {limit: 7}},
    expected: {zodInput: 'Too big: expected number to be <=7'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 7},
    componentType: 'RsNumberFormat',
    validation: {key: 'max', args: {limit: 7}},
    expected: {}
  }],

  lessThan: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'lessThan', args: {value: 4}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: 4},
    componentType: 'RsNumberFormat',
    validation: {key: 'lessThan', args: {value: 4}},
    expected: {zodInput: 'Too big: expected number to be <4'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 3},
    componentType: 'RsNumberFormat',
    validation: {key: 'lessThan', args: {value: 4}},
    expected: {}
  }],

  moreThan: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'moreThan', args: {value: 2}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: 2},
    componentType: 'RsNumberFormat',
    validation: {key: 'moreThan', args: {value: 2}},
    expected: {zodInput: 'Too small: expected number to be >2'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 3},
    componentType: 'RsNumberFormat',
    validation: {key: 'moreThan', args: {value: 2}},
    expected: {}
  }],

  integer: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'integer'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: 1.2},
    componentType: 'RsNumberFormat',
    validation: {key: 'integer'},
    expected: {zodInput: 'Invalid input: expected int, received number'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 6},
    componentType: 'RsNumberFormat',
    validation: {key: 'integer'},
    expected: {}
  }],

  multipleOf: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'multipleOf', args: {value: 3}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: 8},
    componentType: 'RsNumberFormat',
    validation: {key: 'multipleOf', args: {value: 3}},
    expected: {zodInput: 'Invalid number: must be a multiple of 3'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 3},
    componentType: 'RsNumberFormat',
    validation: {key: 'multipleOf', args: {value: 3}},
    expected: {}
  }],

  code: [{
    name: 'empty data',
    componentType: 'RsNumberFormat',
    validation: {key: 'code', args: {code: '  return value === 24'}},
    expected: {zodInput: 'false'}
  }, {
    name: 'with wrong number',
    initialData: {zodInput: 3},
    componentType: 'RsNumberFormat',
    validation: {key: 'code', args: {code: '  return value === 24'}},
    expected: {zodInput: 'false'}
  }, {
    name: 'filled data',
    initialData: {zodInput: 24},
    componentType: 'RsNumberFormat',
    validation: {key: 'code', args: {code: '  return value === 24'}},
    expected: {}
  }],
}

const booleanValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with false data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: false},
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: true},
    validation: {key: 'required'},
    expected: {}
  }, {
    name: 'filled with incorrect data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: ''},
    validation: {key: 'required'},
    expected: {zodInput: 'Invalid input: expected boolean, received string'}
  }],

  truthy: [{
    name: 'empty data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    validation: {key: 'truthy'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: false},
    validation: {key: 'truthy'},
    expected: {zodInput: 'Invalid input'}
  }, {
    name: 'filled data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: true},
    validation: {key: 'truthy'},
    expected: {}
  }],

  falsy: [{
    name: 'empty data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    validation: {key: 'falsy'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: true},
    validation: {key: 'falsy'},
    expected: {zodInput: 'Invalid input'}
  }, {
    name: 'filled data',
    componentType: 'FakeBooleanComponent',
    skipInputValueCheck: true,
    initialData: {zodInput: false},
    validation: {key: 'falsy'},
    expected: {}
  }],
}

const dateValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled data',
    initialData: {zodInput: new Date()},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: ''},
    componentType: 'FakeDateComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Invalid input: expected date, received string'}
  }],

  min: [{
    name: 'empty data',
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'min', args: {value: '2024-08-29T14:53:27.294Z'}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: new Date(Date.parse('2023-08-29T14:53:27.294Z'))},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'min', args: {value: '2024-08-29T14:53:27.294Z'}},
    expected: {zodInput: `Too small: expected date to be >=${new Date(Date.parse('2024-08-29T14:53:27.294Z'))}`}
  }, {
    name: 'filled data',
    initialData: {zodInput: new Date()},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'min', args: {value: '2024-08-29T14:53:27.294Z'}},
    expected: {}
  }],

  max: [{
    name: 'empty data',
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'max', args: {value: '2054-08-29T14:53:27.294Z'}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled with incorrect data',
    initialData: {zodInput: new Date(Date.parse('2063-08-29T14:53:27.294Z'))},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'max', args: {value: '2054-08-29T14:53:27.294Z'}},
    expected: {zodInput: `Too big: expected date to be <=${new Date(Date.parse('2054-08-29T14:53:27.294Z'))}`}
  }, {
    name: 'filled data',
    initialData: {zodInput: new Date()},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'max', args: {value: '2054-08-29T14:53:27.294Z'}},
    expected: {}
  }],

  code: [{
    name: 'empty data',
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'code', args: {code: '  return value instanceof Date && value.getFullYear() === 2025'}},
    expected: {zodInput: 'false'}
  }, {
    name: 'with wrong date',
    initialData: {zodInput: new Date(Date.parse('2043-08-29T14:53:27.294Z'))},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'code', args: {code: '  return value instanceof Date && value.getFullYear() === 2025'}},
    expected: {zodInput: 'false'}
  }, {
    name: 'filled data',
    initialData: {zodInput: new Date(Date.parse('2025-03-29T14:53:27.294Z'))},
    componentType: 'RsDatePicker',
    skipInputValueCheck: true,
    validation: {key: 'code', args: {code: '  return value instanceof Date && value.getFullYear() === 2025'}},
    expected: {}
  }],
}

const timeValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    componentType: 'RsTimePicker',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled data',
    initialData: {zodInput: '12:34:46'},
    componentType: 'RsTimePicker',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {}
  }, {
    name: 'incorrect data type',
    initialData: {zodInput: new Date()},
    componentType: 'RsTimePicker',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Invalid input: expected string, received Date'}
  }],
}

const objectValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'empty object',
    initialData: {zodInput: {}},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled data',
    initialData: {zodInput: {testData: 1}},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {}
  }, {
    name: 'filled with null',
    initialData: {zodInput: null},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    skipDataCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'incorrect data type Symbol',
    initialData: {zodInput: Symbol('12')},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    skipDataCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }],

  nonEmpty: [{
    name: 'empty data',
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Invalid input'}
  }, {
    name: 'empty object',
    initialData: {zodInput: {}},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {}
  }, {
    name: 'filled data',
    initialData: {zodInput: {testData: 3}},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {}
  }, {
    name: 'filled with null',
    initialData: {zodInput: null},
    componentType: 'FakeObjectComponent',
    skipInputValueCheck: true,
    skipDataCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Invalid input'}
  }],
}

const arrayValidators: Record<string, ValidatorTestParameters[]> = {
  required: [{
    name: 'empty data',
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'empty array',
    initialData: {zodInput: []},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'filled data',
    initialData: {zodInput: [1, 2, 3]},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {}
  }, {
    name: 'filled with null',
    initialData: {zodInput: null},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    skipDataCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'incorrect data type Symbol',
    initialData: {zodInput: Symbol('as')},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'required'},
    expected: {zodInput: 'Invalid input: expected array, received symbol'}
  }],

  nonEmpty: [{
    name: 'empty data',
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'empty array',
    initialData: {zodInput: []},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Too small: expected array to have >=1 items'}
  }, {
    name: 'filled data',
    initialData: {zodInput: [4, 5, 6]},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {}
  }, {
    name: 'filled with null',
    initialData: {zodInput: null},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    skipDataCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Required'}
  }, {
    name: 'incorrect data type Symbol',
    initialData: {zodInput: Symbol('ms')},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'nonEmpty'},
    expected: {zodInput: 'Invalid input: expected array, received symbol'}
  }],

  length: [{
    name: 'empty data',
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'length', args: {length: 2}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'empty array',
    initialData: {zodInput: []},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'length', args: {length: 2}},
    expected: {zodInput: 'Too small: expected array to have >=2 items'}
  }, {
    name: 'filled data',
    initialData: {zodInput: ['a', 'b']},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'length', args: {length: 2}},
    expected: {}
  }],

  min: [{
    name: 'empty data',
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'min', args: {limit: 1}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'empty array',
    initialData: {zodInput: []},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'min', args: {limit: 1}},
    expected: {zodInput: 'Too small: expected array to have >=1 items'}
  }, {
    name: 'filled data',
    initialData: {zodInput: [{}, {}]},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'min', args: {limit: 1}},
    expected: {}
  }],

  max: [{
    name: 'empty data',
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'max', args: {limit: 3}},
    expected: {zodInput: 'Required'}
  }, {
    name: 'empty array',
    initialData: {zodInput: []},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'max', args: {limit: 3}},
    expected: {}
  }, {
    name: 'filled data',
    initialData: {zodInput: [1, 'c', [], {}]},
    componentType: 'FakeArrayComponent',
    skipInputValueCheck: true,
    validation: {key: 'max', args: {limit: 3}},
    expected: {zodInput: 'Too big: expected array to have <=3 items'}
  }],
}

const schemaTypes: Partial<Record<SchemaType, Record<string, ValidatorTestParameters[]>>> = {
  string: stringValidators,
  number: numberValidators,
  boolean: booleanValidators,
  date: dateValidators,
  time: timeValidators,
  object: objectValidators,
  array: arrayValidators,
}

type TestItem = [string, string, string, ValidatorTestParameters]

const generateTestData = () => {
  const result: TestItem[] = []
  Object.entries(schemaTypes).forEach(([schemaType, validators]) => {
    Object.entries(validators).forEach(([validatorKey, validatorTestParameters]) => {
      validatorTestParameters.forEach(testParameter => {
        result.push([schemaType, validatorKey, testParameter.name, testParameter])
      })
    })
  })
  return result
}

describe('Embedded Zod validators test', () => {
  it.each(generateTestData())('Validator \'%s\:\%s\' (%s) should show correct validation message',
    async (_, _1, _2, {validation, initialData, componentType, expected, skipInputValueCheck, skipDataCheck}) => {
      const testForm = generateTestForm(validation, componentType)
      const props = {initialData, view: zodValidationView}
      const {formData, findByTestId} = renderForm(testForm, props)

      const zodInput = await findByTestId('zodInput')
      if (!skipInputValueCheck) {
        const expectedValue = `${initialData?.zodInput ?? ''}`
        expect(zodInput).toHaveValue(expectedValue)
      }

      if (!skipDataCheck) {
        expect(formData.data).toEqual(initialData ?? {})
      }

      const validationResult = await asyncAct(async () => await formData.validate())
      expect(validationResult).toStrictEqual(expected)
    })
})

describe('Zod validation edge cases', () => {
  it('should use a custom message from rule args for string min', async () => {
    const testForm = generateTestForm([{
      key: 'min',
      args: {limit: 5, message: 'Need at least five characters'},
    }])
    const {formData} = renderForm(testForm, {
      initialData: {zodInput: 'abc'},
      view: zodValidationView,
    })

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Need at least five characters'})
  })

  it('should use a custom message from rule args for email validation', async () => {
    const testForm = generateTestForm([{
      key: 'email',
      args: {message: 'Please enter a valid email address'},
    }])
    const {formData} = renderForm(testForm, {
      initialData: {zodInput: 'not-an-email'},
      view: zodValidationView,
    })

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Please enter a valid email address'})
  })

  it('should validate includes position when provided', async () => {
    const testForm = generateTestForm([{
      key: 'includes',
      args: {value: 'at', position: 2},
    }])

    const {formData: failingForm} = renderForm(testForm, {
      initialData: {zodInput: 'Cat'},
      view: zodValidationView,
    })
    const failingResult = await asyncAct(async () => await failingForm.validate())
    expect(failingResult).toStrictEqual({zodInput: 'Invalid string: must include \"at\"'})

    const {formData: passingForm} = renderForm(testForm, {
      initialData: {zodInput: 'xxat'},
      view: zodValidationView,
    })
    const passingResult = await asyncAct(async () => await passingForm.validate())
    expect(passingResult).toStrictEqual({})
  })

  it('should validate datetime precision when provided', async () => {
    const testForm = generateTestForm([{
      key: 'datetime',
      args: {precision: 3},
    }])

    const {formData: invalidForm} = renderForm(testForm, {
      initialData: {zodInput: '2023-01-10T00:00:00.1234Z'},
      view: zodValidationView,
    })
    const invalidResult = await asyncAct(async () => await invalidForm.validate())
    expect(invalidResult).toStrictEqual({zodInput: 'Invalid ISO datetime'})

    const {formData: validForm} = renderForm(testForm, {
      initialData: {zodInput: '2023-01-10T00:00:00.123Z'},
      view: zodValidationView,
    })
    const validResult = await asyncAct(async () => await validForm.validate())
    expect(validResult).toStrictEqual({})
  })

  it('should use custom message for date max when provided in rule args', async () => {
    const boundary = '2054-08-29T14:53:27.294Z'
    const testForm = generateTestForm([{
      key: 'max',
      args: {value: boundary, message: 'Custom max date message'},
    }], 'RsDatePicker')

    const {formData} = renderForm(testForm, {
      initialData: {zodInput: new Date(Date.parse('2063-08-29T14:53:27.294Z'))},
      view: zodValidationView,
    })

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Custom max date message'})
  })

  it('should treat object nonEmpty as truthiness rather than key count', async () => {
    const testForm = generateTestForm([{key: 'nonEmpty'}], 'FakeObjectComponent')
    const {formData: emptyObjectForm} = renderForm(testForm, {
      initialData: {zodInput: {}},
      view: zodValidationView,
    })
    expect(await asyncAct(async () => await emptyObjectForm.validate())).toStrictEqual({})

    const {formData: stringForm} = renderForm(testForm, {
      initialData: {zodInput: 'value'},
      view: zodValidationView,
    })
    expect(await asyncAct(async () => await stringForm.validate())).toStrictEqual({})
  })

  it('should report required before min when both rules fail on empty input', async () => {
    const testForm = generateTestForm([
      {key: 'required'},
      {key: 'min', args: {limit: 3}},
    ])

    const {formData} = renderForm(testForm, {view: zodValidationView})
    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Required'})
  })

  it('should report min after required passes', async () => {
    const testForm = generateTestForm([
      {key: 'required'},
      {key: 'min', args: {limit: 3}},
    ])

    const {formData} = renderForm(testForm, {
      initialData: {zodInput: 'ab'},
      view: zodValidationView,
    })
    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Too small: expected string to have >=3 characters'})
  })

  it('should treat null as required for string fields', async () => {
    const testForm = generateTestForm([{key: 'required'}], 'FakeInputComponent')
    const {formData} = renderForm(testForm, {
      initialData: {zodInput: null},
      view: zodValidationView,
    })

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Required'})
  })

  it('should treat boolean required as must be true', async () => {
    const testForm = generateTestForm([{key: 'required'}], 'FakeBooleanComponent')
    const {formData} = renderForm(testForm, {
      initialData: {zodInput: false},
      view: zodValidationView,
    })

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Required'})
  })

  it('should reject empty arrays for array required via minLength check', async () => {
    const testForm = generateTestForm([{key: 'required'}], 'FakeArrayComponent')
    const {formData} = renderForm(testForm, {
      initialData: {zodInput: []},
      view: zodValidationView,
    })

    const validationResult = await asyncAct(async () => await formData.validate())
    expect(validationResult).toStrictEqual({zodInput: 'Required'})
  })
})
