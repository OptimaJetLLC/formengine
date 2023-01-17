import {ComponentType, ReactNode} from 'react'
import * as yup from 'yup'
import {Section, SubSection} from '../../../form-builder/components/RightPanel/PropertiesEditor/Section'

export class Annotation {
  readonly key: string
  readonly name: string
  readonly editor!: ComponentType
  readonly schema?: yup.AnySchema
  readonly hint?: ReactNode
  readonly section: Section = Section.Main
  readonly subsection?: SubSection
  readonly valued: boolean = false
  readonly editorProps?: any
  readonly calculable: boolean = true

  constructor(key: string, name: string) {
    this.key = key
    this.name = name
  }
}
