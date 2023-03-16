import {ComponentType} from 'react'

export interface ColumnDescription {
  name: string,
  title?: string,
  input?: ComponentType,
  inputProps?: any
}
