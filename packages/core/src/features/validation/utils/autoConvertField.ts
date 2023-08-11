import type {SchemaType} from '../types/SchemaType'

const same = (from: any) => from

const error = (from: any) => {
  throw new Error(`Cannot convert from '${from}'`)
}

const parse = (from: any) => JSON.parse(from)

const stringify = (from: any) => JSON.stringify(from)

const toString = (from: any) => from.toString()

const ifInstanceThenSame = (constructor: any) => {
  return (from: any) => from instanceof constructor ? from : error(from)
}
const toNumber = (from: any) => {
  const result = Number(from)
  if (isNaN(result)) error(from)
  return result
}

const toDate = (from: any) => new Date(from)

const converters: Record<SchemaType, Record<SchemaType, (from: any) => any>> = {
  'string': {
    'string': same,
    'number': toNumber,
    'boolean': (from: string) => from === 'true',
    'object': parse,
    'array': parse,
    'enum': same,
    'date': toDate
  },
  'number': {
    'string': toString,
    'number': same,
    'boolean': (from: number) => from === 1,
    'object': error,
    'array': error,
    'enum': same,
    'date': toDate
  },
  'boolean': {
    'string': toString,
    'number': (from: boolean) => from ? 1 : 0,
    'boolean': same,
    'object': error,
    'array': error,
    'enum': same,
    'date': error
  },
  'object': {
    'string': stringify,
    'number': error,
    'boolean': error,
    'object': same,
    'array': error,
    'enum': same,
    'date': error
  },
  'array': {
    'string': stringify,
    'number': error,
    'boolean': error,
    'object': error,
    'array': same,
    'enum': same,
    'date': error
  },
  'enum': {
    'string': stringify,
    'number': ifInstanceThenSame(Number),
    'boolean': ifInstanceThenSame(Boolean),
    'object': ifInstanceThenSame(Object),
    'array': ifInstanceThenSame(Array),
    'enum': same,
    'date': ifInstanceThenSame(Date)
  },
  'date': {
    'string': toString,
    'number': (from: Date) => from.getTime(),
    'boolean': error,
    'object': error,
    'array': error,
    'enum': same,
    'date': same
  }
}

const getValueType = (value: unknown): SchemaType => {
  if (typeof value === 'string') return 'string'
  if (typeof value === 'number') return 'number'
  if (typeof value === 'boolean') return 'boolean'
  if (value instanceof Date) return 'date'
  if (Array.isArray(value)) return 'array'
  if (typeof value === 'object') return 'object'
  return 'enum'
}

/**
 * Converts a value from one type to another.
 * @param from the value to convert.
 * @param toType the type to convert to.
 * @returns the converted value.
 */
export const autoConvertField = (from: any, toType: SchemaType): unknown => {
  const fromType = getValueType(from)
  const converter = converters[fromType]?.[toType]
  if (!converter) throw new Error(`Cannot convert ${from} from '${fromType}' to '${toType}'`)
  try {
    return converter(from)
  } catch (e) {
    throw new Error(`Cannot convert ${from} from '${fromType}' to '${toType}'. ${e}.`)
  }
}
