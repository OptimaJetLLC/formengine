import {Table} from 'rsuite'
import {InputCell} from '../../ui/CustomCells'
import {EditableTable} from '../../ui/EditableTable'
import {PropertyEditorProps} from '../types'

const {Column, HeaderCell} = Table

export const ArrayInput = ({componentStore, annotation}: PropertyEditorProps) => {
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

  return (
    <div>
      <EditableTable data={componentStore.props[annotation.key] ?? annotation.scheme?.getDefault()} label={'Items'} columns={columns}
                     onChange={(value: any) => {
                       componentStore.props[annotation.key] = value
                     }}/>
    </div>
  )
}
