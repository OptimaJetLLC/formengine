import {upperFirst} from 'lodash-es'
import type {ComponentType} from 'react'
import {Table} from 'rsuite'
import {InputCell} from './CustomCells'

const {Column, HeaderCell} = Table

/**
 * The description of the table column.
 */
export interface ColumnDescription {

  /**
   * The column name.
   */
  name: string,

  /**
   * The column title.
   */
  title?: string,

  /**
   * The React component that displays the value of a column.
   */
  input?: ComponentType,

  /**
   * The properties of the React component that displays the value of the column.
   */
  inputProps?: any
}

/**
 * Creates table columns based on their descriptions. **Internal use only.**
 * @param columns the column descriptions.
 * @returns the array with React elements.
 */
export const makeColumns = (columns: ColumnDescription[]) => columns
  .map(({name, input, title, inputProps = {}}: ColumnDescription) => {
    const Input = input ?? InputCell
    return <Column flexGrow={1} key={name}>
      <HeaderCell>{title ?? upperFirst(name)}</HeaderCell>
      <Input dataKey={name} {...inputProps}/>
    </Column>
  })
