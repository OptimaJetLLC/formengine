import {ReactNode} from 'react'
import * as yup from 'yup'
import {createProperty} from './PropertyAnnotationBuilder'

export const boolean = createProperty<boolean>().schemed(yup.boolean())

export const string = createProperty<string>().schemed(yup.string())

export const node = createProperty<ReactNode>().schemed(yup.mixed())

export const oneOf = <T>() => createProperty<T>().schemed(yup.mixed())

export const object = <T>() => createProperty<T>().schemed(yup.mixed())
