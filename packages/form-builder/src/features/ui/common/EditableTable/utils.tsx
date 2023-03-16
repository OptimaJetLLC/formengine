import {upperFirst} from 'lodash-es'
import {Table} from 'rsuite'
import {InputCell} from './CustomCells'
import {ColumnDescription} from './types'

const {Column, HeaderCell} = Table

export const makeColumns = (columns: ColumnDescription[]) => columns
  .map(({name, input, title, inputProps = {}}: ColumnDescription) => {
    const Input = input ?? InputCell
    return <Column flexGrow={1} key={name}>
      <HeaderCell>{title ?? upperFirst(name)}</HeaderCell>
      <Input dataKey={name} {...inputProps}/>
    </Column>
  })
