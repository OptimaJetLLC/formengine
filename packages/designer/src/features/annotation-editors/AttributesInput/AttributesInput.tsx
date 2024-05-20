import {toLabeledValues} from '@react-form-builder/core'
import {Check} from '@rsuite/icons'
import {useEffect, useMemo, useState} from 'react'
import {IconButton} from 'rsuite'
import {EditableTable, makeColumns, SelectCell} from '../../components/EditableTable'
import LabeledProperty from '../../components/LabeledProperty'
import {useTranslationPart} from '../../localization/hooks'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'
import Attributes from './react-html-attributes.json'

const COLUMNS = makeColumns([
  {
    name: 'name',
    input: SelectCell as any,
    inputProps: {options: toLabeledValues(Attributes, false)}
  },
  {name: 'value'}
])

/**
 * The property editor for the HTML-attributes property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const AttributesInput = (props: AnnotationEditorProps) => {
  const {store} = props.componentData
  const getLabel = useTranslationPart('common')
  const initialState = useMemo(() => store.htmlAttributes ? [...store.htmlAttributes] : store.htmlAttributes,
    [store])
  const [value, setValue] = useState(initialState)
  const [changed, setChanged] = useState(false)

  useEffect(() => {
    setValue(initialState)
    setChanged(false)
  }, [initialState, store])

  const handleChange = (value: any) => {
    setValue(value)
    setChanged(true)
  }

  const confirm = () => {
    store.htmlAttributes = value
    setChanged(false)
  }

  const confirmButton = (
    <IconButton icon={<Check/>} onClick={confirm} color="green" appearance={'primary'} size={'xs'}>
      {getLabel('apply')}
    </IconButton>
  )

  return <>
    <LabeledProperty {...props}>
      {changed && confirmButton}
    </LabeledProperty>
    <EditableTable data={value ?? []} onChange={handleChange} columns={COLUMNS}/>
  </>
}
