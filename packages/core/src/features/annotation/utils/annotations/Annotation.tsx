import {ComponentType} from 'react'
import * as yup from 'yup'
import {Section} from '../../../form-builder/components/RightPanel/PropertiesEditor/Section'
import {PropertyEditorProps} from '../../types'

export class Annotation {
  constructor(
    readonly key: string,
    readonly name: string,
    readonly editor: ComponentType<PropertyEditorProps>,
    readonly scheme?: yup.AnySchema,
    readonly hint?: string,
    readonly section: Section = Section.Main,
  ) {
  }
}
