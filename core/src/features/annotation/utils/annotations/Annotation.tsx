import {ComponentType} from 'react'
import {PropertyEditorProps} from '../../types'
import * as yup from 'yup'
import {Section} from '../../../../Builder/components/Building/components/PropertiesEditor/Section'

export class Annotation {
  constructor(
    readonly key: string,
    readonly name: string,
    readonly editor: ComponentType<PropertyEditorProps>,
    readonly scheme?: yup.AnySchema,
    readonly description?: string,
    readonly section: Section = Section.Main,
  ) {
  }
}
