import {ReactNode} from 'react'
import * as yup from 'yup'
import {EventEditor} from '../event'
import {Section} from '../form-builder/components/RightPanel/PropertiesEditor/Section'
import {StyleEditor} from '../style'
import {ValidateEditor} from '../validation/components/ValidateEditor'
import {ArrayInput} from './components/ArrayInput'
import {BooleanInput} from './components/BooleanInput'
import {ChildViewer} from './components/ChildViewer'
import {ColorInput} from './components/ColorInput'
import {KeyInput} from './components/KeyInput'
import {NumberInput} from './components/NumberInput'
import {Picker} from './components/Picker'
import {StringInput} from './components/StringInput'
import {createAnnotation, createProperty} from './utils'

export const key = createAnnotation(KeyInput).schemed(yup.string())
export const style = createAnnotation(StyleEditor).setup({section: Section.Style})
export const validation = createAnnotation(ValidateEditor).setup({section: Section.Rules})

//Primitives
export const string = createProperty(StringInput).schemed(yup.string())
export const boolean = createProperty(BooleanInput).schemed(yup.boolean())
export const number = createProperty(NumberInput).schemed(yup.number())

//Array
export const array = createProperty(ArrayInput).schemed(yup.array())

export const color = createProperty(ColorInput).schemed(yup.string())

//TODO rename to func, or action, or to stay event?
//Use for create functions for events
export const event = createAnnotation(EventEditor).setup({type: 'Event', section: Section.Actions})
//object
//array

//Now is container for another components. TODO? In global things is all that can be rendered: string, numbers, elements, arrays (or fragments) contain these types.
export const node = createAnnotation<ReactNode>(ChildViewer).setup({type: 'Container'})

//element - react element
//elementType - react element with type
//instanceOf(Message) - prop is instance of class

//Enum
//Without bind this in arrow function case do bad magic
export const oneOf = createProperty(Picker).oneOf.bind(createProperty(Picker))

//oneOfType([string, number, etc.]) - union - one of some types
//arrayOf(string or etc) - array with some type

/*
Object with differently structure
shape({
     color: string,
     fontSize: number
  })
*/

//TODO in future: color, date

//TIP for potentially customProp or arrayProp - use yup for validate

export * from './utils'
