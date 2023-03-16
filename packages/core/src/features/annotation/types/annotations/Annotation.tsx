import {ReactNode} from 'react'
import * as yup from 'yup'
import {EditorType} from '../index'

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

  constructor(key: string, name: string) {
    this.key = key
    this.name = name
  }
}
