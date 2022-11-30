import {ComponentType} from 'react'
import * as yup from 'yup'
import {Section} from '../../../form-builder/components/RightPanel/PropertiesEditor/Section'
import {PropertyEditorProps} from '../../types'

export class Annotation {
  readonly key: string
  readonly name: string
  readonly editor!: ComponentType<PropertyEditorProps>
  readonly schema?: yup.AnySchema
  readonly hint?: string
  readonly section: Section = Section.Main
  readonly valued: boolean = false

  constructor(key: string, name: string) {
    this.key = key
    this.name = name
  }
}
