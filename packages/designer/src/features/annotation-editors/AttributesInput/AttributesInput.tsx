import {namedObserver, toLabeledValues} from '@react-form-builder/core'
import {Check} from '@rsuite/icons'
import {useCallback, useMemo, useState} from 'react'
import {IconButton} from 'rsuite'
import {SelectCell} from '../../components/EditableTable/CustomCells'
import {EditableTable} from '../../components/EditableTable/EditableTable'
import {makeColumns} from '../../components/EditableTable/utils'
import LabeledProperty from '../../components/LabeledProperty'
import {useTranslationPart} from '../../localization/hooks'
import type {AnnotationEditorProps} from '../AnnotationEditorProps'
import Attributes from './react-html-attributes.json'

const COLUMNS = makeColumns([
  {
    name: 'name',
    input: SelectCell as any,
    inputProps: {options: toLabeledValues(Attributes, false)},
  },
  {name: 'value'},
])

const confirmButtonIcon = <Check />
const ConfirmButton = ({confirm}: {confirm: () => void}) => {
  const getLabel = useTranslationPart('common')

  return (
    <IconButton icon={confirmButtonIcon} onClick={confirm} color="green" appearance={'primary'} size={'xs'}>
      {getLabel('apply')}
    </IconButton>
  )
}

/**
 * The property editor for the HTML-attributes property type.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
const RawAttributesInput = (props: AnnotationEditorProps) => {
  const {store} = props.componentData
  const calculated = !!props.getComputeType()
  const initialState = useMemo(() => store.htmlAttributes?.map(attribute => ({...attribute})), [store.htmlAttributes])
  const [value, setValue] = useState(initialState)
  const [changed, setChanged] = useState(false)
  const [valueSource, setValueSource] = useState({initialState, store})
  if (valueSource.initialState !== initialState || valueSource.store !== store) {
    setValueSource({initialState, store})
    if (valueSource.store !== store || !changed) {
      setValue(initialState)
      setChanged(false)
    }
  }

  const tableData = value ?? []

  const handleChange = useCallback((value: any) => {
    setValue(value?.map((attribute: object) => ({...attribute})))
    setChanged(true)
  }, [])

  const confirm = useCallback(() => {
    // eslint-disable-next-line react-hooks/immutability
    store.htmlAttributes = value?.map(attribute => ({...attribute}))
    setChanged(false)
  }, [store, value])

  return (
    <>
      <LabeledProperty {...props}>{changed && <ConfirmButton confirm={confirm} />}</LabeledProperty>
      {!calculated && <EditableTable data={tableData} onChange={handleChange} columns={COLUMNS} />}
    </>
  )
}

export const AttributesInput = namedObserver('RawAttributesInput', RawAttributesInput)
