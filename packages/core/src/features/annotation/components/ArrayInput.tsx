import {upperFirst} from 'lodash'
import {ComponentType} from 'react'
import {Table} from 'rsuite'
import {LabeledProperty} from '../../ui/Containers'
import {InputCell} from '../../ui/CustomCells'
import {EditableTable} from '../../ui/EditableTable'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const {Column, HeaderCell} = Table

interface ColumnDescription {
  name: string,
  title?: string,
  input?: ComponentType,
  inputProps?: any
}

const DEFAULT_COLUMNS = [{name: 'value'}, {name: 'label'}]

export const ArrayInput = ({...props}: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps(props)

  const columns = (props.annotation.editorProps?.columns ?? DEFAULT_COLUMNS)
    .map(({name, input, title, inputProps = {}}: ColumnDescription) => {
      const Input = input ?? InputCell
      return <Column flexGrow={1} key={name}>
        <HeaderCell>{title ?? upperFirst(name)}</HeaderCell>
        <Input dataKey={name} {...inputProps}/>
      </Column>
    })

  return <>
    <LabeledProperty annotation={props.annotation}/>
    <EditableTable data={value} onChange={onChange} columns={columns}/>
  </>
}
