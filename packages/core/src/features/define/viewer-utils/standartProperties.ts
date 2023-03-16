import {ReactNode} from 'react'
import * as yup from 'yup'
import {createProperty} from './PropertyAnnotationBuilder'

const boolean = createProperty<boolean>().schemed(yup.boolean())

const string = createProperty<string>().schemed(yup.string())

const node = createProperty<ReactNode>().schemed(yup.mixed())

const oneOf = <T>() => createProperty<T>().schemed(yup.mixed())

const object = <T>() => createProperty<T>().schemed(yup.mixed())

export const simplified = {
  boolean, string, node, oneOf, object
}
