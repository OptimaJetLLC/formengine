import {namedObserver, toLabeledValues} from '@react-form-builder/core'
import {Check} from '@rsuite/icons'
import {useCallback, useEffect, useMemo, useState} from 'react'
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

const ConfirmButton = ({confirm}: { confirm: () => void }) => {
  const getLabel = useTranslationPart('common')

  return <IconButton icon={<Check/>} onClick={confirm} color="green" appearance={'primary'} size={'xs'}>
    {getLabel('apply')}
  </IconButton>
}

/**
 * The property editor for the HTML-attributes property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawAttributesInput = (props: AnnotationEditorProps) => {
  const {store} = props.componentData
  const calculated = !!props.getComputeType()
  const initialState = useMemo(() => store.htmlAttributes ? [...store.htmlAttributes] : store.htmlAttributes,
    [store])
  const [value, setValue] = useState(initialState)
  const [changed, setChanged] = useState(false)

  const handleChange = useCallback((value: any) => {
    setValue(value)
    setChanged(true)
  }, [])

  const confirm = useCallback(() => {
    store.htmlAttributes = value
    setChanged(false)
  }, [store, value])

  useEffect(() => {
    setValue(initialState)
    setChanged(false)
  }, [initialState, store])

  return <>
    <LabeledProperty {...props}>
      {changed && <ConfirmButton confirm={confirm}/>}
    </LabeledProperty>
    {!calculated && <EditableTable data={value ?? []} onChange={handleChange} columns={COLUMNS}/>}
  </>
}

export const AttributesInput = namedObserver('RawAttributesInput', RawAttributesInput)
