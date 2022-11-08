import {ComponentType} from 'react'
import * as yup from 'yup'
import {Section} from '../../form-builder/components/RightPanel/PropertiesEditor/Section'
import {AnnotationType, PropertyEditorProps} from '../types'

export class Options {
  name?: string
  hint?: string
  autoName = true
  section: Section = Section.Main
  type: AnnotationType = 'Module'
  scheme?: yup.AnySchema
  description?: string

  constructor(readonly editor: ComponentType<PropertyEditorProps>) {
  }
}
