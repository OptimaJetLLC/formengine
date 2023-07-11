import {ReactNode} from 'react'
import * as yup from 'yup'
import {EditorType} from '../index'

// todo rename to BuilderComponentPropertyMetadata
/**
 * Basic metadata class for a React component property for the form builder.
 */
export class Annotation {
  readonly key: string
  readonly name: string
  readonly editor!: EditorType
  readonly schema?: yup.AnySchema
  readonly hint?: ReactNode
  readonly valued: boolean = false
  readonly editorProps?: any
  readonly calculable: boolean = true
  readonly bindConditionBuilder?: (props: any) => string

  /**
   * Creates metadata for a React component property.
   * @param key the property name.
   * @param name the human-readable property name.
   */
  constructor(key: string, name: string) {
    this.key = key
    this.name = name
  }
}
