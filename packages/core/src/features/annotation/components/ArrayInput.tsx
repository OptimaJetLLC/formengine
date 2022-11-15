import {Table} from 'rsuite'
import {InputCell} from '../../ui/CustomCells'
import {EditableTable} from '../../ui/EditableTable'
import {PropertyEditorProps} from '../types'
import {makeAnnotationProps} from '../utils'

const {Column, HeaderCell} = Table

export const ArrayInput = (props: PropertyEditorProps) => {
  const {value, onChange} = makeAnnotationProps(props)
  const columns = [
    <Column flexGrow={1} key={'value'}>
      <HeaderCell>Value</HeaderCell>
      <InputCell dataKey="value"/>
    </Column>,

    <Column flexGrow={1} key={'label'}>
      <HeaderCell>Label</HeaderCell>
      <InputCell dataKey="label"/>
    </Column>
  ]

  return <EditableTable data={value} onChange={onChange} label={'Items'} columns={columns}/>
}
