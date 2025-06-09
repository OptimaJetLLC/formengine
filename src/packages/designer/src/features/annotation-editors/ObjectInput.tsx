import {namedObserver} from '@react-form-builder/core'
import {Close, Code} from '@rsuite/icons'
import {isObject} from 'lodash-es'
import {useCallback, useMemo} from 'react'
import {Input, InputGroup} from 'rsuite'
import {useBuilderStore} from '../../utils/BuilderStoreContext'
import LabeledProperty from '../components/LabeledProperty'
import type {AnnotationEditorProps} from './AnnotationEditorProps'

const stringify = (value: any, space?: number) => {
  try {
    return JSON.stringify(value, null, space)
  } catch (e) {
    return
  }
}

const RawObjectInput = (props: AnnotationEditorProps) => {
  const {value, onChange, onClean, annotation} = props
  const builderStore = useBuilderStore()
  const strVal = useMemo(() => {
    return (isObject(value) ? stringify(value, 2) : value) ?? ''
  }, [value])

  const valuePreview = useMemo(() => {
    return value ? stringify(value)?.substring(0, 50) ?? 'Error' : ''
  }, [value])

  const editJson = useCallback(() => {
    const title = `${props.componentData.key}.${annotation.name}`
    builderStore.editJsonCode(annotation.key, title, strVal, onChange)
  }, [annotation.key, annotation.name, builderStore, onChange, props.componentData.key, strVal])

  return <LabeledProperty {...props}>
    <InputGroup inside size="xs">
      <Input value={valuePreview} onClick={editJson} readOnly color={'var(--rs-btn-ghost-text)'}/>
      <InputGroup.Button onClick={value ? onClean : editJson}>
        {value ? <Close/> : <Code/>}
      </InputGroup.Button>
    </InputGroup>
  </LabeledProperty>
}

/**
 * Plain object editor.
 * @param props the Annotation editor component properties.
 * @returns the React element.
 */
export const ObjectInput = namedObserver('ObjectInput', RawObjectInput)
