import {upperFirst} from 'lodash-es'
import {ComponentType} from 'react'
import {Table} from 'rsuite'
import {InputCell} from './CustomCells'

const {Column, HeaderCell} = Table

export interface ColumnDescription {
  name: string,
  title?: string,
  input?: ComponentType,
  inputProps?: any
}

export const makeColumns = (columns: ColumnDescription[]) => columns
  .map(({name, input, title, inputProps = {}}: ColumnDescription) => {
    const Input = input ?? InputCell
    return <Column flexGrow={1} key={name}>
      <HeaderCell>{title ?? upperFirst(name)}</HeaderCell>
      <Input dataKey={name} {...inputProps}/>
    </Column>
  })
