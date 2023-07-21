import {ReactNode} from 'react'
import {isUniqueKey} from './utils/isUniqueKey'
import {createAnnotation, createProperty} from './utils'

export const key = createAnnotation('key')
  .typed('string')
  .required
  .hinted('Unique component key')
  .calculable(false)
  .validated(isUniqueKey, {code: 'unique_key', message: 'The key must be unique!'})
  .build('key')

export const stylization = createAnnotation('stylization').build('stylization')

export const htmlAttributes = createAnnotation('htmlAttributes')
export const validation = createAnnotation('validation')

//Primitives
export const string = createProperty('string').typed('string')
export const boolean = createProperty('boolean').typed('boolean')
export const number = createProperty('number').typed('number')
export const size = createProperty('size').typed('string')

//Array
export const array = createProperty('array').array

export const color = createProperty('color').typed('string')

export const tooltipType = createAnnotation('tooltipType').typed('string')
export const errorConfig = createAnnotation('errorConfig')

//TODO rename to func, or action, or to stay event?
//Use for create functions for events
export const event = createAnnotation<Function>('event').setup({annotationType: 'Event'})
//object
//array

//Now is container for another components. TODO? In global things is all that can be rendered: string, numbers, elements, arrays (or fragments) contain these types.
export const node = createAnnotation<ReactNode>('node').setup({annotationType: 'Container'})

//element - react element
//elementType - react element with type
//instanceOf(Message) - prop is instance of class

//Enum
//Without bind this in arrow function case do bad magic
export const oneOf = createProperty('oneOf').oneOf.bind(createProperty('oneOf'))

export const someOf = createProperty('someOf').someOf.bind(createProperty('someOf'))

//oneOfType([string, number, etc.]) - union - one of some types
//arrayOf(string or etc.) - array with some type

/*
Object with differently structure
shape({
     color: string,
     fontSize: number
  })
*/

//TODO in future: color, date

//TIP for potentially customProp or arrayProp - use yup for validate

export const tooltipProps = createAnnotation('tooltipProps')

export const renderWhen = createAnnotation('renderWhen').typed('boolean')

export * from './utils'
