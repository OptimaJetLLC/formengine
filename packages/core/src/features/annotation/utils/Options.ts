import {Section} from '../../builder/components/Building/components/PropertiesEditor/Section'
import {AnnotationType, PropertyEditorProps} from '../types'
import * as yup from 'yup'
import {ComponentType} from 'react'

export class Options {
  name?: string
  autoName = true
  section: Section = Section.Main
  type: AnnotationType = 'Module'
  scheme?: yup.AnySchema
  description?: string

  constructor(readonly editor: ComponentType<PropertyEditorProps>) {
  }
}
