import {Check} from '@rsuite/icons'
import {useState} from 'react'
import {IconButton} from 'rsuite'
import {useTranslationPart} from '../../../localization/hooks'
import {LabeledProperty} from '../../../ui/Containers'
import {EditableTable, makeColumns, SelectCell} from '../../../ui/EditableTable'
import {PropertyEditorProps} from '../../types'
import {toLabeledValues} from '../../utils/LabeledValue'
import Attributes from './react-html-attributes.json'

const COLUMNS = makeColumns([
  {
    name: 'name',
    input: SelectCell as any,
    inputProps: {options: toLabeledValues(Attributes, false)}
  },
  {name: 'value'}
])

export default ({componentStore, annotation}: PropertyEditorProps) => {
  const getLabel = useTranslationPart('common')
  const [value, setValue] = useState(componentStore.htmlAttributes)
  const [changed, setChanged] = useState(false)
  const handleChange = (value: any) => {
    setValue(value)
    setChanged(true)
  }

  const confirm = () => {
    componentStore.htmlAttributes = value
    setChanged(false)
  }

  const confirmButton = (
    <IconButton icon={<Check/>} onClick={confirm} color="green" appearance={'primary'} size={'xs'}>
      {getLabel('apply')}
    </IconButton>
  )

  return <>
    <LabeledProperty annotation={annotation}>
      {changed && confirmButton}
    </LabeledProperty>
    <EditableTable data={value ?? []} onChange={handleChange} columns={COLUMNS}/>
  </>
}
